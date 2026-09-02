/**
 * Result URL parsing (§3). These params arrive from a hand-editable query
 * string, so every rejection path matters as much as the happy one.
 */

import { describe, expect, it } from "vitest";
import { loadTest } from "@/lib/config";
import { parseResult } from "@/lib/result";

const config = loadTest("political");
const V = String(config.version);

describe("parseResult", () => {
  it("accepts a well-formed link", () => {
    expect(parseResult({ x: "-0.4231", y: "0.0290", v: V }, config)).toEqual({
      ok: true,
      x: -0.4231,
      y: 0.029,
      version: config.version,
      stale: false,
    });
  });

  it("accepts the exact centre and the exact bounds", () => {
    expect(parseResult({ x: "0", y: "0", v: V }, config)).toMatchObject({
      ok: true,
      x: 0,
      y: 0,
    });
    const limit = String(config.scoring.clamp);
    expect(
      parseResult({ x: limit, y: `-${limit}`, v: V }, config),
    ).toMatchObject({ ok: true });
  });

  it.each(["x", "y", "v"])("rejects a link with no %s", (missing) => {
    const params: Record<string, string> = { x: "0.1", y: "0.1", v: V };
    delete params[missing];
    expect(parseResult(params, config)).toEqual({
      ok: false,
      reason: "missing",
    });
  });

  it.each([
    ["not a number", { x: "left", y: "0.1" }],
    ["a trailing-garbage number", { x: "0.4abc", y: "0.1" }],
    ["an empty string", { x: "", y: "0.1" }],
    ["NaN", { x: "NaN", y: "0.1" }],
    ["Infinity", { x: "Infinity", y: "0.1" }],
  ])("rejects %s", (_label, coords) => {
    expect(parseResult({ ...coords, v: V }, config)).toEqual({
      ok: false,
      reason: "malformed",
    });
  });

  it.each(["0", "-1", "1.5", "abc"])("rejects version '%s'", (v) => {
    expect(parseResult({ x: "0.1", y: "0.1", v }, config)).toEqual({
      ok: false,
      reason: "malformed",
    });
  });

  it("rejects coordinates the engine could never have produced", () => {
    const beyond = config.scoring.clamp + 0.01;
    expect(parseResult({ x: String(beyond), y: "0", v: V }, config)).toEqual({
      ok: false,
      reason: "out_of_range",
    });
    expect(parseResult({ x: "0", y: String(-beyond), v: V }, config)).toEqual({
      ok: false,
      reason: "out_of_range",
    });
  });

  it("renders an older version's link, flagged as stale", () => {
    const older = parseResult(
      { x: "0.1", y: "0.1", v: String(config.version + 1) },
      config,
    );
    expect(older).toMatchObject({ ok: true, stale: true });
  });
});
