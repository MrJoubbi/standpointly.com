import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import {
  CLUSTERS_DEFINITION,
  availableTests,
  catalogue,
  clusterForTest,
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

describe("catalogue clusters specification", () => {
  it("has exactly 5 specified clusters", () => {
    expect(CLUSTERS_DEFINITION).toHaveLength(5);
    const clusterIds = CLUSTERS_DEFINITION.map((c) => c.id);
    expect(clusterIds).toEqual([
      "personality",
      "relationships",
      "beliefs",
      "wellbeing",
      "career",
    ]);
  });

  it("each cluster has exactly 5 tests (25 tests total)", () => {
    for (const cluster of CLUSTERS_DEFINITION) {
      expect(
        cluster.testIds,
        `Cluster ${cluster.id} does not have 5 tests`,
      ).toHaveLength(5);
    }

    const allTestIds = CLUSTERS_DEFINITION.flatMap((c) => c.testIds);
    expect(allTestIds).toHaveLength(25);
    expect(new Set(allTestIds).size).toBe(25);
  });

  it("contains all requested tests in Personality", () => {
    const personality = CLUSTERS_DEFINITION.find((c) => c.id === "personality")!;
    expect(personality.testIds).toEqual([
      "big-five",
      "dark-triad",
      "empathy",
      "emotional-intelligence",
      "human-behavior",
    ]);
  });

  it("contains all requested tests in Relationships", () => {
    const relationships = CLUSTERS_DEFINITION.find((c) => c.id === "relationships")!;
    expect(relationships.testIds).toEqual([
      "attachment",
      "love-language",
      "compatibility",
      "boundaries",
      "communication",
    ]);
  });

  it("contains all requested tests in Beliefs & Values", () => {
    const beliefs = CLUSTERS_DEFINITION.find((c) => c.id === "beliefs")!;
    expect(beliefs.testIds).toEqual([
      "political",
      "feminism",
      "moral-foundations",
      "gender",
      "social-values",
    ]);
  });

  it("contains all requested tests in Wellbeing", () => {
    const wellbeing = CLUSTERS_DEFINITION.find((c) => c.id === "wellbeing")!;
    expect(wellbeing.testIds).toEqual([
      "stress",
      "burnout",
      "self-esteem",
      "resilience",
      "emotional-regulation",
    ]);
  });

  it("contains all requested tests in Career & Work", () => {
    const career = CLUSTERS_DEFINITION.find((c) => c.id === "career")!;
    expect(career.testIds).toEqual([
      "career",
      "leadership",
      "disc",
      "riasec",
      "work-style",
    ]);
  });

  it("maps test IDs to their expected clusters", () => {
    expect(clusterForTest("big-five")).toBe("personality");
    expect(clusterForTest("attachment")).toBe("relationships");
    expect(clusterForTest("political")).toBe("beliefs");
    expect(clusterForTest("burnout")).toBe("wellbeing");
    expect(clusterForTest("leadership")).toBe("career");
  });

  it("identifies political and attachment as currently available", () => {
    const available = availableTests();
    const availableIds = available.map((t) => t.id);
    expect(availableIds).toContain("political");
    expect(availableIds).toContain("attachment");

    const political = available.find((t) => t.id === "political")!;
    expect(political.clusterId).toBe("beliefs");

    const attachment = available.find((t) => t.id === "attachment")!;
    expect(attachment.clusterId).toBe("relationships");
  });

  it("correctly builds testClusters with available and planned tests", () => {
    const clusters = testClusters();
    expect(clusters).toHaveLength(5);

    const totalTests = clusters.reduce((acc, c) => acc + c.tests.length, 0);
    expect(totalTests).toBe(25);

    const relationships = clusters.find((c) => c.id === "relationships")!;
    expect(relationships.availableCount).toBe(1);
    expect(relationships.plannedCount).toBe(4);

    const beliefs = clusters.find((c) => c.id === "beliefs")!;
    expect(beliefs.availableCount).toBe(1);
    expect(beliefs.plannedCount).toBe(4);

    const personality = clusters.find((c) => c.id === "personality")!;
    expect(personality.availableCount).toBe(0);
    expect(personality.plannedCount).toBe(5);
  });

  it("has message keys for every cluster and every test", () => {
    const messages = loadMessages();
    const allEntries = catalogue();

    for (const cluster of CLUSTERS_DEFINITION) {
      expect(
        typeof resolve(messages, cluster.taglineKey),
        `missing ${cluster.taglineKey}`,
      ).toBe("string");
      expect(
        typeof resolve(messages, cluster.descriptionKey),
        `missing ${cluster.descriptionKey}`,
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
