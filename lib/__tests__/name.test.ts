import { describe, expect, it } from "vitest";
import { cleanName, MAX_NAME_LENGTH } from "@/lib/name";

describe("cleanName", () => {
  it("keeps an ordinary name", () => {
    expect(cleanName("Ada Lovelace")).toBe("Ada Lovelace");
  });

  it("keeps non-Latin scripts intact", () => {
    expect(cleanName("عبد الرحمن")).toBe("عبد الرحمن");
    expect(cleanName("张伟")).toBe("张伟");
    expect(cleanName("Zoë Böhm")).toBe("Zoë Böhm");
  });

  it("collapses and trims whitespace", () => {
    expect(cleanName("  Ada   \t Lovelace \n")).toBe("Ada Lovelace");
  });

  it.each([
    ["", null],
    ["   ", null],
    [undefined, null],
    [null, null],
    [42, null],
    [{ toString: () => "x" }, null],
  ])("rejects %s", (input, expected) => {
    expect(cleanName(input)).toBe(expected);
  });

  it("strips control characters", () => {
    const NUL = String.fromCharCode(0);
    const BELL = String.fromCharCode(7);
    const DEL = String.fromCharCode(0x7f);
    expect(cleanName(`Ada${NUL}${BELL}Lovelace`)).toBe("AdaLovelace");
    expect(cleanName(`Ada${DEL}L`)).toBe("AdaL");
  });

  // A bidi override in a name can reorder the text after it in the rendered
  // certificate, which is not a thing a name field should be able to do.
  it("strips bidi overrides and isolates", () => {
    const RLO = String.fromCodePoint(0x202e);
    const LRI = String.fromCodePoint(0x2066);
    const PDI = String.fromCodePoint(0x2069);
    const LRM = String.fromCodePoint(0x200e);
    const RLM = String.fromCodePoint(0x200f);
    expect(cleanName(`Ada${RLO}Lovelace`)).toBe("AdaLovelace");
    expect(cleanName(`${LRI}Ada${PDI}`)).toBe("Ada");
    expect(cleanName(`Ada${LRM}${RLM}L`)).toBe("AdaL");
  });

  it("truncates without leaving a trailing space", () => {
    const long = `${"a".repeat(MAX_NAME_LENGTH - 1)} bcdef`;
    const result = cleanName(long);
    expect(result).toHaveLength(MAX_NAME_LENGTH - 1);
    expect(result).not.toMatch(/\s$/);
  });

  it("never exceeds the maximum", () => {
    expect(cleanName("x".repeat(500))).toHaveLength(MAX_NAME_LENGTH);
  });
});
