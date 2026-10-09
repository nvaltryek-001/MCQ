import { ALL_QUESTIONS } from "../src/data/questions";
import { ALL_MODULES, CURRICULUM, moduleSection } from "../src/lib/curriculum";

const SECTIONS = Object.keys(CURRICULUM);
const DIFFS = ["easy", "medium", "hard"];
const errors: string[] = [];
const warnings: string[] = [];
const err = (id: string, msg: string) => errors.push(`[${id}] ${msg}`);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const ids = new Set<string>();
const texts = new Map<string, string>();

for (const q of ALL_QUESTIONS) {
  const id = q.id ?? "(no id)";
  if (!q.id) err(id, "missing id");
  else if (ids.has(q.id)) err(id, "duplicate ID");
  ids.add(q.id);

  const key = norm(q.question);
  if (texts.has(key)) err(id, `duplicate question text (also ${texts.get(key)})`);
  texts.set(key, id);

  if (!SECTIONS.includes(q.section)) err(id, `invalid section "${q.section}"`);
  if (!ALL_MODULES.some((m) => m.module === q.module)) err(id, `invalid module "${q.module}"`);
  else if (moduleSection(q.module) !== q.section) err(id, `module "${q.module}" does not belong to section "${q.section}"`);
  if (!DIFFS.includes(q.difficulty)) err(id, `invalid difficulty "${q.difficulty}"`);

  if (!q.topic?.trim()) err(id, "missing topic");
  if (!q.question?.trim()) err(id, "missing question text");

  if (!Array.isArray(q.options) || q.options.length !== 4) err(id, `needs exactly 4 options (has ${q.options?.length ?? 0})`);
  else {
    if (q.options.some((o) => !o || !String(o).trim())) err(id, "empty option");
    if (new Set(q.options.map(norm)).size !== q.options.length) err(id, "duplicate options");
  }
  if (!Number.isInteger(q.correct_answer) || q.correct_answer < 0 || q.correct_answer > 3) err(id, `missing/invalid correct answer index (${q.correct_answer})`);
  if (!q.explanation || q.explanation.trim().length < 15) err(id, "missing or too-short explanation");
  if (!Number.isInteger(q.time_limit) || q.time_limit < 20 || q.time_limit > 300) err(id, `invalid time_limit (${q.time_limit})`);
  if (!Array.isArray(q.tags) || q.tags.length === 0) err(id, "missing tags");
}

// Coverage: 5 per module, 210 total
for (const { module } of ALL_MODULES) {
  const n = ALL_QUESTIONS.filter((q) => q.module === module).length;
  if (n !== 5) errors.push(`[${module}] expected 5 questions, found ${n}`);
}
if (ALL_QUESTIONS.length !== 210) errors.push(`expected 210 questions, found ${ALL_QUESTIONS.length}`);

// Informational stats
const total = ALL_QUESTIONS.length;
const pct = (n: number) => `${((n / total) * 100).toFixed(1)}%`;
const diff = Object.fromEntries(DIFFS.map((d) => [d, ALL_QUESTIONS.filter((q) => q.difficulty === d).length]));
const pos = [0, 1, 2, 3].map((i) => ALL_QUESTIONS.filter((q) => q.correct_answer === i).length);
const perSection = SECTIONS.map((s) => `${s}: ${ALL_QUESTIONS.filter((q) => q.section === s).length}`);

if (Math.abs(diff.easy / total - 0.3) > 0.03 || Math.abs(diff.medium / total - 0.5) > 0.03 || Math.abs(diff.hard / total - 0.2) > 0.03)
  warnings.push("difficulty mix deviates from 30/50/20 by more than 3 points");
if (Math.max(...pos) / total > 0.32) warnings.push(`answer positions are skewed: ${pos.join("/")}`);

console.log(`Questions: ${total}  (${perSection.join(", ")})`);
console.log(`Difficulty: easy ${diff.easy} (${pct(diff.easy)}), medium ${diff.medium} (${pct(diff.medium)}), hard ${diff.hard} (${pct(diff.hard)})`);
console.log(`Correct-answer position A/B/C/D: ${pos.join(" / ")}`);
warnings.forEach((w) => console.warn("WARN:", w));
if (errors.length) {
  console.error(`\n${errors.length} validation error(s):`);
  errors.forEach((e) => console.error(" ✗", e));
  process.exit(1);
}
console.log("\n✓ All question validations passed");
