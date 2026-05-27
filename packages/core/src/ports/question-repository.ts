import type { QuestionWithAnswers } from "../domain/question.js";
import type { ResponseChannel, UserResponse } from "../domain/user-response.js";

export type SaveUserResponseInput = {
  userId: string;
  questionId: string;
  answerId?: string;
  responseText?: string;
  isCorrect: boolean;
  responseTimeMs: number;
  attemptNumber: number;
  channel: ResponseChannel;
  submittedAt: Date;
};

export interface QuestionRepository {
  findByIdWithAnswers(id: string): Promise<QuestionWithAnswers | null>;
  findNextForUser(userId: string): Promise<QuestionWithAnswers | null>;
  saveUserResponse(input: SaveUserResponseInput): Promise<UserResponse>;
}
