/**
 * Test config format — BUILD_SPEC §4.
 *
 * One JSON file per test in /config/tests/. The engine is generic: adding
 * test #2 is writing a JSON file, not building a feature. Nothing here may
 * name the political test specifically.
 */

/** A point on the answer scale. Likert-5 maps to -2..2. */
export type ScaleValue = -2 | -1 | 0 | 1 | 2;

export type Scale = {
  type: "likert5";
  values: { key: string; value: ScaleValue }[];
};

export type Axis = {
  id: string;
  /** The axis itself, for readouts: "ECONOMIC 9.0". */
  name_key: string;
  negative_label_key: string;
  positive_label_key: string;
  /** sum(abs(weight)) * 2 over every question, for this axis. Invariant 2. */
  max_raw: number;
};

export type Axes = {
  x: Axis;
  y: Axis;
};

export type Scoring = {
  /**
   * Applied after normalising raw to -1..1. Calibrated by simulation: 1.7
   * clamped ~62% of respondents to the edge, 0.9 clamps almost nobody.
   * Retune once real pilot data exists.
   */
  gain: number;
  /** Absolute bound on x and y after gain. */
  clamp: number;
  /**
   * Half-width of the centre band on each axis. Column/row boundaries sit at
   * ±band. Interacts with `gain` — when tuning, change one at a time.
   */
  band: number;
};

/** One of the nine archetypes. Order is row-major from top-left. */
export type Cell = {
  id: string;
  /** Full name for headlines: "The Collectivist". */
  name_key: string;
  /**
   * Short form for the grid tile: "Collectivist". A separate key rather than
   * stripping an article off `name_key` — that only works in English, and §8
   * is explicit that per-locale wording is reviewed, not derived.
   */
  label_key: string;
  /** ~120 words on what this position holds, and its strongest objection. */
  description_key: string;
};

/** Weight of a question on each axis, keyed by `Axis["id"]`. */
export type Weights = Record<string, number>;

export type Question = {
  id: string;
  text_key: string;
  w: Weights;
};

export type TestConfig = {
  id: string;
  version: number;
  title_key: string;
  /** One-line description for the catalogue on the home page. */
  summary_key: string;
  scale: Scale;
  axes: Axes;
  scoring: Scoring;
  /** Exactly 9, row-major from top-left. */
  cells: Cell[];
  questions: Question[];
};

/** Answers keyed by question id. Missing ids score as 0 (unanswered). */
export type Answers = Record<string, ScaleValue>;

export type Score = {
  /** Economic axis, clamped. Negative = axes.x.negative_label_key. */
  x: number;
  /** Social axis, clamped. Negative = axes.y.negative_label_key. */
  y: number;
  /** Pre-normalisation sums, keyed by axis id. Kept for debugging and QA. */
  raw: Record<string, number>;
};

/** A cell plus where it sits in the grid. */
export type PlacedCell = Cell & {
  /** 0 = top (positive y), 2 = bottom. */
  row: 0 | 1 | 2;
  /** 0 = left (negative x), 2 = right. */
  col: 0 | 1 | 2;
};
