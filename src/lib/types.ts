import type { Section } from "./curriculum";
export type Difficulty = "easy" | "medium" | "hard";
export type Status = "critical" | "weak" | "average" | "strong" | "excellent";

export interface Question {
  id: string; section: Section; module: string; topic: string; difficulty: Difficulty;
  question: string; options: string[]; correct_answer: number; explanation: string;
  time_limit: number; tags: string[]; active: boolean;
}
export interface AnswerRecord {
  question_id: string; section: Section; module: string; topic: string; difficulty: Difficulty;
  selected: number | null; is_correct: boolean; time_taken: number;
}
export interface Bucket { key: string; total: number; correct: number; answered: number; score: number; accuracy: number; averageTime: number; }
export interface TopicAnalysis {
  topic: string; module: string; section: Section; score: number; accuracy: number;
  averageTime: number; status: Status; attempted: number; priority: number; slow: boolean;
}
export interface Recommendation {
  module: string; topic: string; section: Section; score: number; status: Status;
  plan: "foundation" | "basic_intermediate" | "intermediate" | "advanced";
  title: string; actions: string[]; practiceCount: number; priority: number;
}
