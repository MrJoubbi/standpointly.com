import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  CLUSTERS_DEFINITION,
  FIELDS_DEFINITION,
  availableTests,
  catalogue,
  clusterForTest,
  findFieldBySlug,
  findInstrument,
  getRelatedInstruments,
  plannedTests,
  testClusters,
} from "@/lib/catalogue";

function loadMessages(): Record<string, unknown> {
  return JSON.parse(
    readFileSync(path.join(process.cwd(), "messages", "en.json"), "utf8"),
  );
}

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

describe("Standpointly Field Architecture & Catalogue Specification", () => {
  it("has exactly 5 specified fields", () => {
    expect(FIELDS_DEFINITION).toHaveLength(5);
    const fieldIds = FIELDS_DEFINITION.map((f) => f.id);
    expect(fieldIds).toEqual([
      "personality",
      "relationships",
      "beliefs",
      "wellbeing",
      "career",
    ]);
  });

  it("each field has exactly 5 initial instruments (25 instruments total)", () => {
    for (const field of FIELDS_DEFINITION) {
      expect(
        field.instruments,
        `Field ${field.id} does not have 5 instruments`,
      ).toHaveLength(5);
    }

    const allInstrumentIds = FIELDS_DEFINITION.flatMap((f) =>
      f.instruments.map((i) => i.id),
    );
    expect(allInstrumentIds).toHaveLength(25);
    expect(new Set(allInstrumentIds).size).toBe(25);
  });

  it("contains all requested instruments in Field 01 — Personality", () => {
    const personality = FIELDS_DEFINITION.find((f) => f.id === "personality")!;
    expect(personality.code).toBe("01");
    expect(personality.name).toBe("Personality");
    expect(personality.instruments.map((i) => i.id)).toEqual([
      "big-five",
      "dark-triad",
      "empathy",
      "emotional-intelligence",
      "self-esteem",
    ]);
    expect(personality.instruments[0].code).toBe("01.01");
  });

  it("contains all requested instruments in Field 02 — Relationships", () => {
    const relationships = FIELDS_DEFINITION.find((f) => f.id === "relationships")!;
    expect(relationships.code).toBe("02");
    expect(relationships.name).toBe("Relationships");
    expect(relationships.instruments.map((i) => i.id)).toEqual([
      "attachment",
      "love-language",
      "compatibility",
      "relationship-anxiety",
      "boundaries",
    ]);
    expect(relationships.instruments[0].code).toBe("02.01");
  });

  it("contains all requested instruments in Field 03 — Beliefs & Values", () => {
    const beliefs = FIELDS_DEFINITION.find((f) => f.id === "beliefs")!;
    expect(beliefs.code).toBe("03");
    expect(beliefs.name).toBe("Beliefs & Values");
    expect(beliefs.instruments.map((i) => i.id)).toEqual([
      "political",
      "feminist-perspectives",
      "moral-foundations",
      "gender-equality",
      "individualism-collectivism",
    ]);
    expect(beliefs.instruments[0].code).toBe("03.01");
  });

  it("contains all requested instruments in Field 04 — Wellbeing", () => {
    const wellbeing = FIELDS_DEFINITION.find((f) => f.id === "wellbeing")!;
    expect(wellbeing.code).toBe("04");
    expect(wellbeing.name).toBe("Wellbeing");
    expect(wellbeing.instruments.map((i) => i.id)).toEqual([
      "stress",
      "burnout",
      "emotional-regulation",
      "resilience",
      "procrastination",
    ]);
    expect(wellbeing.instruments[0].code).toBe("04.01");
  });

  it("contains all requested instruments in Field 05 — Work & Career", () => {
    const career = FIELDS_DEFINITION.find((f) => f.id === "career")!;
    expect(career.code).toBe("05");
    expect(career.name).toBe("Work & Career");
    expect(career.instruments.map((i) => i.id)).toEqual([
      "career-personality",
      "work-style",
      "leadership-style",
      "career-values",
      "decision-making-style",
    ]);
    expect(career.instruments[0].code).toBe("05.01");
  });

  it("maps test IDs to their expected fields", () => {
    expect(clusterForTest("big-five")).toBe("personality");
    expect(clusterForTest("attachment")).toBe("relationships");
    expect(clusterForTest("political")).toBe("beliefs");
    expect(clusterForTest("burnout")).toBe("wellbeing");
    expect(clusterForTest("leadership-style")).toBe("career");
  });

  it("identifies political and attachment as currently available", () => {
    const available = availableTests();
    const availableIds = available.map((t) => t.id);
    expect(availableIds).toContain("political");
    expect(availableIds).toContain("attachment");

    const political = available.find((t) => t.id === "political")!;
    expect(political.clusterId).toBe("beliefs");
    expect(political.code).toBe("03.01");

    const attachment = available.find((t) => t.id === "attachment")!;
    expect(attachment.clusterId).toBe("relationships");
    expect(attachment.code).toBe("02.01");
  });

  it("correctly builds testClusters with available and planned tests", () => {
    const clusters = testClusters();
    expect(clusters).toHaveLength(5);

    const totalTests = clusters.reduce((acc, c) => acc + c.tests.length, 0);
    expect(totalTests).toBe(25);

    const relationships = clusters.find((c) => c.id === "relationships")!;
    expect(relationships.availableCount).toBe(5);
    expect(relationships.plannedCount).toBe(0);

    const beliefs = clusters.find((c) => c.id === "beliefs")!;
    expect(beliefs.availableCount).toBe(5);
    expect(beliefs.plannedCount).toBe(0);

    const personality = clusters.find((c) => c.id === "personality")!;
    expect(personality.availableCount).toBe(5);
    expect(personality.plannedCount).toBe(0);

    const wellbeing = clusters.find((c) => c.id === "wellbeing")!;
    expect(wellbeing.availableCount).toBe(5);
    expect(wellbeing.plannedCount).toBe(0);

    const career = clusters.find((c) => c.id === "career")!;
    expect(career.availableCount).toBe(5);
    expect(career.plannedCount).toBe(0);
  });

  it("supports internal linking lookups for related instruments", () => {
    const result = findInstrument("attachment-style");
    expect(result).toBeDefined();
    expect(result?.instrument.id).toBe("attachment");

    const related = getRelatedInstruments(result!.instrument);
    expect(related.length).toBeGreaterThanOrEqual(3);
    const relatedIds = related.map((r) => r.id);
    expect(relatedIds).toContain("love-language");
  });

  it("has message keys for every field and every instrument", () => {
    const messages = loadMessages();
    const allEntries = catalogue();

    for (const field of FIELDS_DEFINITION) {
      expect(
        typeof resolve(messages, field.taglineKey),
        `missing ${field.taglineKey}`,
      ).toBe("string");
      expect(
        typeof resolve(messages, field.descriptionKey),
        `missing ${field.descriptionKey}`,
      ).toBe("string");
    }

    for (const entry of allEntries) {
      expect(
        typeof resolve(messages, entry.titleKey),
        `missing title key: ${entry.titleKey}`,
      ).toBe("string");
      expect(
        typeof resolve(messages, entry.summaryKey),
        `missing summary key: ${entry.summaryKey}`,
      ).toBe("string");
    }
  });
});
