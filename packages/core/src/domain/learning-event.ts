export type LearningEventKind =
  | "response_submitted"
  | "question_sent"
  | "feedback_viewed"
  | "preferences_updated";

export type LearningEvent = {
  id?: string;
  userId: string;
  questionId?: string;
  kind: LearningEventKind;
  occurredAt: Date;
  payload: Record<string, unknown>;
};
