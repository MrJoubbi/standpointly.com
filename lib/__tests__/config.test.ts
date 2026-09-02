/**
 * Config invariants (BUILD_SPEC §4) and scoring behaviour (§5).
 *
 * The invariant block runs against *every* file in /config/tests/, so a new
 * test is covered the moment its JSON lands. These assertions are the reason
 * the engine can stay generic: they are what guarantees a new config is
 * scoreable before anyone looks at a result screen.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listTestIds, loadTest } from "@/lib/config";
import { routing } from "@/i18n/routing";
import { cellFor, parseTest, score } from "@/lib/scoring";
import type { Answers, ScaleValue, TestConfig } from "@/lib/types";

const testIds = listTestIds();

function loadMessages(locale: string): unknown {
  return JSON.parse(
    readFileSync(path.join(process.cwd(), "messages", `${locale}.json`), "utf8"),
  );
}

/** Walk a dotted message key, next-intl style. */
function resolve(messages: unknown, key: string): unknown {
  return key
    .split(".")
    .reduce<unknown>(
      (node, part) =>
        typeof node === "object" && node !== null
          ? (node as Record<string, unknown>)[part]
          : undefined,
      messages,
    );
}

it("finds at least one test config", () => {
  expect(testIds.length).toBeGreaterThan(0);
});

describe.each(testIds)("config invariants — %s", (testId) => {
  const config = loadTest(testId);
  const axes = [config.axes.x, config.axes.y];

  it("loads and validates", () => {
    expect(() => parseTest(config)).not.toThrow();
    expect(config.id).toBe(testId);
  });

  // Invariant 1 — kills acquiescence bias. Someone who agrees with every
  // statement must land dead centre, not be pushed to one side.
  it.each(axes)("weights sum to exactly 0 on axis $id", (axis) => {
    const sum = config.questions.reduce((acc, q) => acc + (q.w[axis.id] ?? 0), 0);
    expect(sum).toBe(0);
  });

  // Invariant 2 — max_raw must be recomputed on every weight edit, or the
  // normalisation silently rescales every past result.
  it.each(axes)("max_raw on axis $id equals sum(abs(weight)) * 2", (axis) => {
    const expected =
      config.questions.reduce((acc, q) => acc + Math.abs(q.w[axis.id] ?? 0), 0) * 2;
    expect(axis.max_raw).toBe(expected);
  });

  // Invariant 3 — if cross-loaded questions cluster on one diagonal, results
  // pile onto it and half the grid stays empty.
  it("spreads cross-loaded questions across all four sign combinations", () => {
    const xId = config.axes.x.id;
    const yId = config.axes.y.id;

    const crossLoaded = config.questions.filter(
      (q) => (q.w[xId] ?? 0) !== 0 && (q.w[yId] ?? 0) !== 0,
    );
    expect(crossLoaded.length).toBeGreaterThan(0);

    const counts = new Map<string, number>([
      ["++", 0],
      ["+-", 0],
      ["-+", 0],
      ["--", 0],
    ]);
    for (const q of crossLoaded) {
      const key = `${Math.sign(q.w[xId]) > 0 ? "+" : "-"}${
        Math.sign(q.w[yId]) > 0 ? "+" : "-"
      }`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    for (const [combination, n] of counts) {
      expect(n, `no cross-loaded question with signs ${combination}`).toBeGreaterThan(0);
    }
  });

  it("has 9 cells with unique ids", () => {
    expect(config.cells).toHaveLength(9);
    expect(new Set(config.cells.map((c) => c.id)).size).toBe(9);
  });

  // A config references locale strings by key, and nothing at build time
  // checks that they exist — a missing one renders the raw key into the UI.
  it("has every message key it references present in every locale", () => {
    const keys = [
      config.title_key,
      config.summary_key,
      ...[config.axes.x, config.axes.y].flatMap((a) => [
        a.name_key,
        a.negative_label_key,
        a.positive_label_key,
      ]),
      ...config.cells.flatMap((c) => [
        c.name_key,
        c.label_key,
        c.description_key,
      ]),
      ...config.scale.values.map((v) => `scale.${v.key}`),
      ...config.questions.map((q) => q.text_key),
    ];

    for (const locale of routing.locales) {
      const messages = loadMessages(locale);
      const missing = keys.filter((k) => typeof resolve(messages, k) !== "string");
      expect(missing, `missing in '${locale}'`).toEqual([]);
    }
  });
});

/* ------------------------------------------------------------------ */
/*  Scoring                                                            */
/* ------------------------------------------------------------------ */

/** Answer every question with the same value. */
function uniform(config: TestConfig, value: ScaleValue): Answers {
  return Object.fromEntries(config.questions.map((q) => [q.id, value]));
}

/**
 * The strongest possible push along one axis: strongly agree with every
 * statement that loads positively on it, strongly disagree with every
 * statement that loads negatively, ignore the rest. By invariant 2 this
 * produces raw === max_raw exactly.
 */
function maximal(config: TestConfig, axisId: string, direction: 1 | -1): Answers {
  return Object.fromEntries(
    config.questions.map((q) => {
      const w = q.w[axisId] ?? 0;
      return [q.id, (Math.sign(w) * direction * 2) as ScaleValue];
    }),
  );
}

describe.each(testIds)("scoring — %s", (testId) => {
  const config = loadTest(testId);
  const xId = config.axes.x.id;
  const yId = config.axes.y.id;
  const { gain, clamp, band } = config.scoring;

  it("puts all-neutral answers at exactly (0, 0)", () => {
    const result = score(uniform(config, 0), config);
    expect(result).toEqual({ x: 0, y: 0, raw: { [xId]: 0, [yId]: 0 } });
  });

  it("puts no answers at all at exactly (0, 0)", () => {
    const result = score({}, config);
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
  });

  // Acquiescence bias, the behavioural consequence of invariant 1.
  it.each([-2, -1, 1, 2] as ScaleValue[])(
    "puts a respondent who answers %d to everything at exactly (0, 0)",
    (value) => {
      const result = score(uniform(config, value), config);
      expect(result).toEqual({ x: 0, y: 0, raw: { [xId]: 0, [yId]: 0 } });
    },
  );

  it.each([
    { axisId: xId, direction: 1 as const },
    { axisId: xId, direction: -1 as const },
    { axisId: yId, direction: 1 as const },
    { axisId: yId, direction: -1 as const },
  ])(
    "drives $axisId to its bound at direction $direction",
    ({ axisId, direction }) => {
      const axis = axisId === xId ? config.axes.x : config.axes.y;
      const result = score(maximal(config, axisId, direction), config);

      expect(result.raw[axisId]).toBe(direction * axis.max_raw);

      const value = axisId === xId ? result.x : result.y;
      expect(value).toBeCloseTo(direction * Math.min(gain, clamp), 10);
      // The whole point of the gain calibration: a maximal respondent must
      // still be inside the grid, and outside the centre band.
      expect(Math.abs(value)).toBeLessThanOrEqual(clamp);
      expect(Math.abs(value)).toBeGreaterThan(band);
    },
  );

  it("never returns a score outside ±clamp", () => {
    for (const answers of [
      maximal(config, xId, 1),
      maximal(config, xId, -1),
      maximal(config, yId, 1),
      maximal(config, yId, -1),
    ]) {
      const { x, y } = score(answers, config);
      expect(Math.abs(x)).toBeLessThanOrEqual(clamp);
      expect(Math.abs(y)).toBeLessThanOrEqual(clamp);
    }
  });
});

describe("cellFor", () => {
  const config = loadTest("political");
  const { band } = config.scoring;
  const name = (x: number, y: number) => cellFor(x, y, config).id;

  it("places the origin in the centre cell", () => {
    const cell = cellFor(0, 0, config);
    expect(cell).toMatchObject({ id: "moderate", row: 1, col: 1 });
  });

  it("maps the nine regions to the §5 table", () => {
    const lo = -(band + 0.1);
    const hi = band + 0.1;
    expect([
      [name(lo, hi), name(0, hi), name(hi, hi)],
      [name(lo, 0), name(0, 0), name(hi, 0)],
      [name(lo, lo), name(0, lo), name(hi, lo)],
    ]).toEqual([
      ["collectivist", "guardian", "traditionalist"],
      ["egalitarian", "moderate", "marketeer"],
      ["communalist", "individualist", "libertarian"],
    ]);
  });

  it("treats the band edges as centre, exclusively", () => {
    expect(cellFor(band, band, config)).toMatchObject({ row: 1, col: 1 });
    expect(cellFor(-band, -band, config)).toMatchObject({ row: 1, col: 1 });
  });

  it("reads band from the config rather than a call-site constant", () => {
    const narrow: TestConfig = {
      ...config,
      scoring: { ...config.scoring, band: 0.1 },
    };
    expect(cellFor(0.2, 0, config)).toMatchObject({ col: 1 });
    expect(cellFor(0.2, 0, narrow)).toMatchObject({ col: 2 });
  });
});

describe("maximal agreement lands in the expected cell — political", () => {
  const config = loadTest("political");

  it.each([
    { axisId: "econ", direction: 1 as const, expected: "marketeer" },
    { axisId: "econ", direction: -1 as const, expected: "egalitarian" },
    { axisId: "social", direction: 1 as const, expected: "guardian" },
    { axisId: "social", direction: -1 as const, expected: "individualist" },
  ])("$axisId at direction $direction → $expected", ({ axisId, direction, expected }) => {
    const { x, y } = score(maximal(config, axisId, direction), config);
    expect(cellFor(x, y, config).id).toBe(expected);
  });
});

describe("maximal agreement lands in the expected cell — attachment", () => {
  const config = loadTest("attachment");

  it.each([
    { axisId: "avoidance", direction: 1 as const, expected: "guarded" },
    { axisId: "avoidance", direction: -1 as const, expected: "open" },
    { axisId: "anxiety", direction: 1 as const, expected: "vigilant" },
    { axisId: "anxiety", direction: -1 as const, expected: "autonomous" },
  ])("$axisId at direction $direction → $expected", ({ axisId, direction, expected }) => {
    const { x, y } = score(maximal(config, axisId, direction), config);
    expect(cellFor(x, y, config).id).toBe(expected);
  });
});

describe("clamp", () => {
  const config = loadTest("political");

  // gain 0.9 never reaches the bound, by design. Raise it and the clamp must
  // bind at exactly ±clamp rather than letting a score run off the grid.
  it("binds at ±clamp when gain would overshoot", () => {
    const hot: TestConfig = {
      ...config,
      scoring: { ...config.scoring, gain: 1.7 },
    };
    expect(score(maximal(config, "econ", 1), hot).x).toBe(hot.scoring.clamp);
    expect(score(maximal(config, "econ", -1), hot).x).toBe(-hot.scoring.clamp);
    expect(score(maximal(config, "social", 1), hot).y).toBe(hot.scoring.clamp);
    expect(score(maximal(config, "social", -1), hot).y).toBe(-hot.scoring.clamp);
  });
});

describe("loadTest", () => {
  it("rejects an unknown test id", () => {
    expect(() => loadTest("does-not-exist")).toThrow(/no test config/);
  });

  it("rejects a traversing test id", () => {
    expect(() => loadTest("../../package")).toThrow(/invalid test id/);
  });

  it("rejects a config that fails validation", () => {
    expect(() => parseTest({ id: "broken" })).toThrow(/invalid test config/);
  });

  it("rejects a question weighting an unknown axis", () => {
    const config = loadTest("political");
    const broken = {
      ...config,
      questions: [{ id: "z01", text_key: "q.z.z01", w: { econ: 1, social: 1, mystery: 1 } }],
    };
    expect(() => parseTest(broken)).toThrow(/unknown axis 'mystery'/);
  });
});
