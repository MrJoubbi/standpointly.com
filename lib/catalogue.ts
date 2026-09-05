/**
 * The test catalogue — §1.
 *
 * "A multi-test platform... The engine must be generic so that adding test #2
 * is writing a JSON file, not building a feature." The available half of this
 * list is therefore derived from /config/tests rather than hand-maintained:
 * drop a config in and it appears in its respective cluster.
 *
 * Standpointly tests are divided into 5 thematic clusters:
 * Personality, Relationships, Beliefs & Values, Wellbeing, Career & Work.
 */

import { listTestIds, loadTest } from "@/lib/config";

export type TestClusterId =
  | "personality"
  | "relationships"
  | "beliefs"
  | "wellbeing"
  | "career";

export type AvailableTest = {
  status: "available";
  id: string;
  clusterId: TestClusterId;
  titleKey: string;
  summaryKey: string;
  questionCount: number;
  /** Rough, from question count — no config field to drift out of date. */
  minutes: number;
};

export type PlannedTest = {
  status: "planned";
  id: string;
  clusterId: TestClusterId;
  titleKey: string;
  summaryKey: string;
};

export type CatalogueEntry = AvailableTest | PlannedTest;

export type TestCluster = {
  id: TestClusterId;
  code: string;
  name: string;
  taglineKey: string;
  descriptionKey: string;
  tests: CatalogueEntry[];
  availableCount: number;
  plannedCount: number;
};

/** Seconds per statement, for the "about N minutes" estimate. */
const SECONDS_PER_QUESTION = 8;

export type ClusterDefinition = {
  id: TestClusterId;
  code: string;
  name: string;
  taglineKey: string;
  descriptionKey: string;
  testIds: readonly string[];
};

export const CLUSTERS_DEFINITION: readonly ClusterDefinition[] = [
  {
    id: "personality",
    code: "01",
    name: "Personality",
    taglineKey: "cluster.personality.tagline",
    descriptionKey: "cluster.personality.description",
    testIds: [
      "big-five",
      "dark-triad",
      "empathy",
      "emotional-intelligence",
      "human-behavior",
    ],
  },
  {
    id: "relationships",
    code: "02",
    name: "Relationships",
    taglineKey: "cluster.relationships.tagline",
    descriptionKey: "cluster.relationships.description",
    testIds: [
      "attachment",
      "love-language",
      "compatibility",
      "boundaries",
      "communication",
    ],
  },
  {
    id: "beliefs",
    code: "03",
    name: "Beliefs & Values",
    taglineKey: "cluster.beliefs.tagline",
    descriptionKey: "cluster.beliefs.description",
    testIds: [
      "political",
      "feminism",
      "moral-foundations",
      "gender",
      "social-values",
    ],
  },
  {
    id: "wellbeing",
    code: "04",
    name: "Wellbeing",
    taglineKey: "cluster.wellbeing.tagline",
    descriptionKey: "cluster.wellbeing.description",
    testIds: [
      "stress",
      "burnout",
      "self-esteem",
      "resilience",
      "emotional-regulation",
    ],
  },
  {
    id: "career",
    code: "05",
    name: "Career & Work",
    taglineKey: "cluster.career.tagline",
    descriptionKey: "cluster.career.description",
    testIds: [
      "career",
      "leadership",
      "disc",
      "riasec",
      "work-style",
    ],
  },
] as const;

export function clusterForTest(testId: string): TestClusterId {
  for (const c of CLUSTERS_DEFINITION) {
    if (c.testIds.includes(testId)) {
      return c.id;
    }
  }
  return "personality";
}

export function availableTests(): AvailableTest[] {
  return listTestIds().map((id) => {
    const config = loadTest(id);
    return {
      status: "available",
      id: config.id,
      clusterId: clusterForTest(config.id),
      titleKey: config.title_key,
      summaryKey: config.summary_key,
      questionCount: config.questions.length,
      minutes: Math.max(
        1,
        Math.round((config.questions.length * SECONDS_PER_QUESTION) / 60),
      ),
    };
  });
}

export function plannedTests(): PlannedTest[] {
  const available = new Set(listTestIds());
  const list: PlannedTest[] = [];

  for (const def of CLUSTERS_DEFINITION) {
    for (const id of def.testIds) {
      if (!available.has(id)) {
        list.push({
          status: "planned",
          id,
          clusterId: def.id,
          titleKey: `planned.${id}.title`,
          summaryKey: `planned.${id}.summary`,
        });
      }
    }
  }
  return list;
}

export function testClusters(): TestCluster[] {
  const availableMap = new Map<string, AvailableTest>();
  for (const test of availableTests()) {
    availableMap.set(test.id, test);
  }

  return CLUSTERS_DEFINITION.map((def) => {
    const tests: CatalogueEntry[] = def.testIds.map((id) => {
      const avail = availableMap.get(id);
      if (avail) {
        return avail;
      }
      return {
        status: "planned",
        id,
        clusterId: def.id,
        titleKey: `planned.${id}.title`,
        summaryKey: `planned.${id}.summary`,
      };
    });

    const availableCount = tests.filter((t) => t.status === "available").length;
    const plannedCount = tests.filter((t) => t.status === "planned").length;

    return {
      id: def.id,
      code: def.code,
      name: def.name,
      taglineKey: def.taglineKey,
      descriptionKey: def.descriptionKey,
      tests,
      availableCount,
      plannedCount,
    };
  });
}

export function catalogue(): CatalogueEntry[] {
  return testClusters().flatMap((c) => c.tests);
}

