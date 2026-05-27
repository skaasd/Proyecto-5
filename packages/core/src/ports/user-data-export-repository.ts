export type ExportedUserData = {
  exportedAt: Date;
  user: {
    id: string;
    email: string;
    createdAt: Date;
  };
  preferences: {
    questionsPerWeek: number;
    tipsPerWeek: number;
    isPaused: boolean;
    pausedUntil?: Date;
  };
  responses: Array<{
    id: string;
    questionId: string;
    questionPrompt: string;
    answerId?: string;
    answerText?: string;
    isCorrect: boolean;
    responseTimeMs: number;
    submittedAt: Date;
  }>;
  learningEvents: Array<{
    id: string;
    type: string;
    occurredAt: Date;
    payload: Record<string, unknown>;
  }>;
  spacedRepetitionStates: Array<{
    conceptId: string;
    conceptName: string;
    stability: number;
    difficulty: number;
    reviewCount: number;
    lastReviewedAt?: Date;
    nextReviewAt?: Date;
  }>;
};

export interface UserDataExportRepository {
  exportByUserId(userId: string, exportedAt: Date): Promise<ExportedUserData>;
}
