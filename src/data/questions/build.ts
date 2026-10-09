import { slugify, type Section } from "@/lib/curriculum";
import type { Difficulty, Question } from "@/lib/types";

/** [difficulty, topic, question, options(4), correctIndex, explanation, tags?] */
export type Raw = ["e" | "m" | "h", string, string, string[], number, string, string[]?];

const DIFF: Record<"e" | "m" | "h", Difficulty> = { e: "easy", m: "medium", h: "hard" };
export const TIME_LIMIT: Record<Difficulty, number> = { easy: 45, medium: 75, hard: 120 };
const PREFIX: Record<Section, string> = { quantitative: "qa", logical: "lr", verbal: "va" };

export function build(section: Section, module: string, raws: Raw[]): Question[] {
  return raws.map(([d, topic, question, options, correct, explanation, tags], i) => {
    const difficulty = DIFF[d];
    return {
      id: `${PREFIX[section]}-${slugify(module)}-${i + 1}`,
      section, module, topic, difficulty, question, options,
      correct_answer: correct, explanation,
      time_limit: TIME_LIMIT[difficulty],
      tags: tags ?? [slugify(module), slugify(topic), difficulty],
      active: true,
    };
  });
}
