export type ResponseChannel = "web" | "email" | "telegram";

export type UserResponse = {
  id: string;
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
