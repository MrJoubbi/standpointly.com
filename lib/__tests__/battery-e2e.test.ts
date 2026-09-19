import { describe, expect, it } from "vitest";
import { listTestIds, loadTest } from "@/lib/config";
import { cellFor, score } from "@/lib/scoring";
import { parseResult } from "@/lib/result";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { ScaleValue, TestConfig } from "@/lib/types";

const testIds = listTestIds();
const messages = JSON.parse(
  readFileSync(path.join(process.cwd(), "messages", "en.json"), "utf8"),
);

function resolve(obj: unknown, key: string): string | undefined {
  return key
    .split(".")
    .reduce<unknown>(
      (node, part) =>
        typeof node === "object" && node !== null
          ? (node as Record<string, unknown>)[part]
          : undefined,
      obj,
    ) as string | undefined;
}

describe("Complete 25-Instrument Battery End-to-End Verification", () => {
  it("has exactly 25 test configurations registered", () => {
    expect(testIds).toHaveLength(25);
  });

  describe.each(testIds)("Instrument: %s", (testId) => {
    const config = loadTest(testId);
    const xId = config.axes.x.id;
    const yId = config.axes.y.id;

    it("has valid metadata and localization keys", () => {
      expect(resolve(messages, config.title_key)).toBeTruthy();
      expect(resolve(messages, config.summary_key)).toBeTruthy();
      expect(resolve(messages, config.axes.x.name_key)).toBeTruthy();
      expect(resolve(messages, config.axes.y.name_key)).toBeTruthy();
    });

    it("has valid questions with localization", () => {
      expect(config.questions.length).toBeGreaterThanOrEqual(30);
      for (const q of config.questions) {
        expect(resolve(messages, q.text_key)).toBeTruthy();
      }
    });

    it("has 9 cells matching the 3x3 coordinate grid with localization", () => {
      expect(config.cells).toHaveLength(9);
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const cell = config.cells[r * 3 + c];
          expect(cell.id).toBeTruthy();
          expect(resolve(messages, cell.name_key)).toBeTruthy();
          expect(resolve(messages, cell.label_key)).toBeTruthy();
          expect(resolve(messages, cell.description_key)).toBeTruthy();
        }
      }
    });

    it("correctly maps origin (0, 0) to center cell (row 1, col 1)", () => {
      const neutralAnswers = Object.fromEntries(
        config.questions.map((q) => [q.id, 0 as ScaleValue]),
      );
      const res = score(neutralAnswers, config);
      expect(res.x).toBe(0);
      expect(res.y).toBe(0);
      const placed = cellFor(res.x, res.y, config);
      expect(placed.row).toBe(1);
      expect(placed.col).toBe(1);
      expect(placed.id).toBe(config.cells[4].id);
    });

    it("correctly maps all 9 grid zones via direct coordinates", () => {
      const b = config.scoring.band;
      const step = 0.5; // outside band

      // row 0: y > band (+y)
      expect(cellFor(-step, step, config).id).toBe(config.cells[0].id); // top-left
      expect(cellFor(0, step, config).id).toBe(config.cells[1].id);     // top-center
      expect(cellFor(step, step, config).id).toBe(config.cells[2].id);  // top-right

      // row 1: -band <= y <= band (y neutral)
      expect(cellFor(-step, 0, config).id).toBe(config.cells[3].id);    // mid-left
      expect(cellFor(0, 0, config).id).toBe(config.cells[4].id);        // center
      expect(cellFor(step, 0, config).id).toBe(config.cells[5].id);     // mid-right

      // row 2: y < -band (-y)
      expect(cellFor(-step, -step, config).id).toBe(config.cells[6].id); // bot-left
      expect(cellFor(0, -step, config).id).toBe(config.cells[7].id);     // bot-center
      expect(cellFor(step, -step, config).id).toBe(config.cells[8].id);  // bot-right
    });

    it("correctly validates and parses result parameters", () => {
      const parsed = parseResult(
        { x: "0.42", y: "-0.38", v: String(config.version) },
        config,
      );
      expect(parsed.ok).toBe(true);
      if (parsed.ok) {
        expect(parsed.x).toBe(0.42);
        expect(parsed.y).toBe(-0.38);
        expect(parsed.stale).toBe(false);
      }
    });
  });
});
