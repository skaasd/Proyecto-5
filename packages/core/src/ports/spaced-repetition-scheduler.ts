export type RecordReviewInput = {
  userId: string;
  conceptIds: string[];
  isCorrect: boolean;
  reviewedAt: Date;
};

export interface SpacedRepetitionScheduler {
  recordReview(input: RecordReviewInput): Promise<void>;
}
