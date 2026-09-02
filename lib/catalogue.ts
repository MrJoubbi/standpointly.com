/**
 * The test catalogue — §1.
 *
 * "A multi-test platform. v1 ships one test only... The engine must be
 * generic so that adding test #2 is writing a JSON file, not building a
 * feature." The available half of this list is therefore derived from
 * /config/tests rather than hand-maintained: drop a config in and it appears
 * on the home page.
 *
 * The planned half is the roadmap named in §1. These are advertised as not
 * yet available and are never linkable — a catalogue that quietly implies
 * four more tests exist would be lying to the reader.
 */

import { listTestIds, loadTest } from "@/lib/config";

export type AvailableTest = {
  status: "available";
  id: string;
  titleKey: string;
  summaryKey: string;
  questionCount: number;
  /** Rough, from question count — no config field to drift out of date. */
  minutes: number;
};

export type PlannedTest = {
  status: "planned";
  id: string;
  titleKey: string;
  summaryKey: string;
};

export type CatalogueEntry = AvailableTest | PlannedTest;

/** Seconds per statement, for the "about N minutes" estimate. */
const SECONDS_PER_QUESTION = 8;

/** §1: "Planned later: attachment style, moral foundations, interpersonal/social, career." */
const PLANNED = ["attachment", "moral", "interpersonal", "career"] as const;

export function availableTests(): AvailableTest[] {
  return listTestIds().map((id) => {
    const config = loadTest(id);
    return {
      status: "available",
      id: config.id,
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
  return PLANNED.filter((id) => !available.has(id)).map((id) => ({
    status: "planned",
    id,
    titleKey: `planned.${id}.title`,
    summaryKey: `planned.${id}.summary`,
  }));
}

export function catalogue(): CatalogueEntry[] {
  return [...availableTests(), ...plannedTests()];
}
