import { quantitative } from "./quantitative";
import { logical } from "./logical";
import { verbal } from "./verbal";
import type { Question } from "@/lib/types";

/** Options whose order carries meaning must never be reshuffled. */
const ORDER_SENSITIVE = /^(statement|only |either|neither|both|even both|no error|none of)/i;

/**
 * Deterministically spreads the correct answer evenly over positions A–D.
 * Moves the correct option into the least-used position by swapping two options.
 * Order-sensitive option sets (syllogisms, data sufficiency, "No error") are untouched.
 */
function balanceAnswerPositions(qs: Question[]): Question[] {
  const counts = [0, 0, 0, 0];
  const fixed = (q: Question) => q.options.some((o) => ORDER_SENSITIVE.test(o.trim()));
  qs.forEach((q) => fixed(q) && counts[q.correct_answer]++);
  return qs.map((q) => {
    if (fixed(q)) return q;
    const target = counts.indexOf(Math.min(...counts));
    counts[target]++;
    if (target === q.correct_answer) return q;
    const options = [...q.options];
    [options[target], options[q.correct_answer]] = [options[q.correct_answer], options[target]];
    return { ...q, options, correct_answer: target };
  });
}

export const ALL_QUESTIONS: Question[] = balanceAnswerPositions([...quantitative, ...logical, ...verbal]);
