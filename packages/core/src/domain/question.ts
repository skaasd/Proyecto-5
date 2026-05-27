import type { Answer } from "./answer.js";
import type { Concept } from "./concept.js";

export type QuestionType =
  | "multiple_choice"
  | "short_answer"
  | "mini_exercise"
  | "scenario"
  | "code";

export type Question = {
  id: string;
  prompt: string;
  type: QuestionType;
  conceptIds: string[];
};

export type QuestionWithAnswers = Question & {
  answers: Answer[];
  concepts: Concept[];
};
