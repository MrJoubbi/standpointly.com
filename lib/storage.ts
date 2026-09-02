/**
 * sessionStorage persistence for an in-progress test — §6.
 *
 * Fifty answers is a lot to lose to a stray refresh. The key carries the
 * config `version`: when questions are reworded the weights they map to move,
 * so a half-finished session from the previous version must not be resumed
 * against the new one. It is dropped rather than migrated.
 *
 * sessionStorage, not localStorage: this is scratch state for one sitting,
 * and there is no database and no consent banner yet (§9).
 */

import type { Answers, ScaleValue, TestConfig } from "@/lib/types";

export type Progress = {
  answers: Answers;
  /** Index of the statement the taker was last looking at. */
  index: number;
};

const VALID_VALUES: ReadonlySet<number> = new Set([-2, -1, 0, 1, 2]);

export function storageKey(testId: string, version: number): string {
  return `standpointly:${testId}:v${version}`;
}

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    // Private-mode Safari and locked-down browsers throw on access.
    return null;
  }
}

/**
 * Read saved progress, discarding anything that no longer matches the config
 * — a question that has since been removed, or a value outside the scale.
 */
export function loadProgress(config: TestConfig): Progress {
  const empty: Progress = { answers: {}, index: 0 };
  const store = storage();
  if (!store) return empty;

  let parsed: unknown;
  try {
    const raw = store.getItem(storageKey(config.id, config.version));
    if (!raw) return empty;
    parsed = JSON.parse(raw);
  } catch {
    return empty;
  }

  if (typeof parsed !== "object" || parsed === null) return empty;
  const candidate = parsed as Partial<Progress>;

  const known = new Set(config.questions.map((q) => q.id));
  const answers: Answers = {};
  for (const [id, value] of Object.entries(candidate.answers ?? {})) {
    if (known.has(id) && typeof value === "number" && VALID_VALUES.has(value)) {
      answers[id] = value as ScaleValue;
    }
  }

  const index =
    typeof candidate.index === "number" &&
    Number.isInteger(candidate.index) &&
    candidate.index >= 0 &&
    candidate.index < config.questions.length
      ? candidate.index
      : 0;

  return { answers, index };
}

export function saveProgress(config: TestConfig, progress: Progress): void {
  const store = storage();
  if (!store) return;
  try {
    store.setItem(
      storageKey(config.id, config.version),
      JSON.stringify(progress),
    );
  } catch {
    // Quota or private mode — persistence is a convenience, not a requirement.
  }
}

export function clearProgress(config: TestConfig): void {
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(storageKey(config.id, config.version));
  } catch {
    /* ignore */
  }
}
