/**
 * Config validation, scoring and cell assignment — BUILD_SPEC §4 and §5.
 *
 * Every tunable (`gain`, `clamp`, `band`, `max_raw`) is read from the test
 * config. Nothing here may be hardcoded at a call site: retuning a test is
 * editing its JSON file, and old shared links must keep resolving to the
 * score they were generated with (hence `version` in the result URL).
 *
 * This module stays free of Node builtins so client components can import it
 * — §2 scores 100% in the browser. Disk loading lives in `lib/config.ts`.
 */

import { z } from "zod";
import type {
  Answers,
  Cell,
  PlacedCell,
  Score,
  TestConfig,
} from "@/lib/types";

const scaleValueSchema = z.union([
  z.literal(-2),
  z.literal(-1),
  z.literal(0),
  z.literal(1),
  z.literal(2),
]);

const axisSchema = z.object({
  id: z.string().min(1),
  name_key: z.string().min(1),
  negative_label_key: z.string().min(1),
  positive_label_key: z.string().min(1),
  max_raw: z.number().positive(),
});

const testConfigSchema = z
  .object({
    id: z.string().min(1),
    version: z.number().int().positive(),
    title_key: z.string().min(1),
    summary_key: z.string().min(1),
    scale: z.object({
      type: z.literal("likert5"),
      values: z
        .array(z.object({ key: z.string().min(1), value: scaleValueSchema }))
        .length(5),
    }),
    axes: z.object({ x: axisSchema, y: axisSchema }),
    scoring: z.object({
      gain: z.number().positive(),
      clamp: z.number().positive(),
      band: z.number().gt(0).lt(1),
    }),
    // 9, row-major from top-left.
    cells: z
      .array(
        z.object({
          id: z.string().min(1),
          name_key: z.string().min(1),
          label_key: z.string().min(1),
          description_key: z.string().min(1),
        }),
      )
      .length(9),
    questions: z
      .array(
        z.object({
          id: z.string().min(1),
          text_key: z.string().min(1),
          w: z.record(z.string(), z.number()),
        }),
      )
      .min(1),
  })
  .superRefine((cfg, ctx) => {
    const axisIds = [cfg.axes.x.id, cfg.axes.y.id];
    if (axisIds[0] === axisIds[1]) {
      ctx.addIssue({ code: "custom", message: "axes x and y share an id" });
    }

    const seenQuestions = new Set<string>();
    for (const q of cfg.questions) {
      if (seenQuestions.has(q.id)) {
        ctx.addIssue({ code: "custom", message: `duplicate question id '${q.id}'` });
      }
      seenQuestions.add(q.id);

      for (const axisId of axisIds) {
        if (!(axisId in q.w)) {
          ctx.addIssue({
            code: "custom",
            message: `question '${q.id}' has no weight for axis '${axisId}'`,
          });
        }
      }
      for (const key of Object.keys(q.w)) {
        if (!axisIds.includes(key)) {
          ctx.addIssue({
            code: "custom",
            message: `question '${q.id}' weights unknown axis '${key}'`,
          });
        }
      }
    }

    const seenCells = new Set<string>();
    for (const c of cfg.cells) {
      if (seenCells.has(c.id)) {
        ctx.addIssue({ code: "custom", message: `duplicate cell id '${c.id}'` });
      }
      seenCells.add(c.id);
    }
  });

/** Validate an already-parsed config object. Throws on a bad config. */
export function parseTest(raw: unknown): TestConfig {
  const result = testConfigSchema.safeParse(raw);
  if (!result.success) {
    const detail = result.error.issues
      .map((i) => `${i.path.join(".") || "<root>"}: ${i.message}`)
      .join("; ");
    throw new Error(`invalid test config: ${detail}`);
  }
  return result.data as TestConfig;
}

function clamp(value: number, limit: number): number {
  return Math.min(limit, Math.max(-limit, value));
}

/** Sum of `answer * weight` over every question, for one axis. */
function rawFor(answers: Answers, config: TestConfig, axisId: string): number {
  let total = 0;
  for (const q of config.questions) {
    // An unanswered question contributes nothing, same as neutral.
    const answer = answers[q.id] ?? 0;
    total += answer * (q.w[axisId] ?? 0);
  }
  return total;
}

/**
 * Score a set of answers — §5.
 *
 *   raw = Σ answer[i] * w[i][axis]        answer ∈ -2..2
 *   x   = clamp(raw / max_raw * gain, -clamp, clamp)
 *
 * Because weights sum to 0 on each axis (invariant 1), a respondent who
 * agrees with every statement lands at exactly (0, 0) rather than being
 * pushed to one side.
 */
export function score(answers: Answers, config: TestConfig): Score {
  const { gain, clamp: limit } = config.scoring;
  const { x: xAxis, y: yAxis } = config.axes;

  const rawX = rawFor(answers, config, xAxis.id);
  const rawY = rawFor(answers, config, yAxis.id);

  return {
    x: clamp((rawX / xAxis.max_raw) * gain, limit),
    y: clamp((rawY / yAxis.max_raw) * gain, limit),
    raw: { [xAxis.id]: rawX, [yAxis.id]: rawY },
  };
}

/**
 * Place a score in the 3×3 grid — §5.
 *
 * Column: x < -band ? 0 : x > band ? 2 : 1
 * Row:    y >  band ? 0 : y < -band ? 2 : 1   (row 0 is the top of the grid)
 */
export function cellFor(x: number, y: number, config: TestConfig): PlacedCell {
  const band = config.scoring.band;
  const col: 0 | 1 | 2 = x < -band ? 0 : x > band ? 2 : 1;
  const row: 0 | 1 | 2 = y > band ? 0 : y < -band ? 2 : 1;

  const cell: Cell = config.cells[row * 3 + col];
  return { ...cell, row, col };
}
