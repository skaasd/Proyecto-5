export type LearningOverview = {
  userId: string;
  totalResponses: number;
  correctResponses: number;
  conceptsExplored: number;
  totalTimeMs: number;
  lastActivityAt?: Date;
  nextReviewAt?: Date;
  recentResponses: Array<{
    id: string;
    questionId: string;
    questionPrompt: string;
    answerText?: string;
    isCorrect: boolean;
    submittedAt: Date;
  }>;
};

export interface LearningOverviewRepository {
  getByUserId(userId: string): Promise<LearningOverview>;
}
