/** All tunable thresholds live here. */
export const STATUS_BANDS = [
  { min: 90, status: "excellent" },
  { min: 75, status: "strong" },
  { min: 60, status: "average" },
  { min: 40, status: "weak" },
  { min: 0, status: "critical" },
] as const;

export const MASTERY = { minScore: 80, minAccuracy: 80, minQuestions: 15 };
export const SECONDS_PER_QUESTION = 60;
/** Topics slower than this (seconds) get a speed flag. */
export const SLOW_SECONDS = 60;
export const WEAK_TOPIC_LIMIT = 5;
/** Topics need at least this many answered questions to be ranked reliably. */
export const MIN_TOPIC_SAMPLE = 1;
