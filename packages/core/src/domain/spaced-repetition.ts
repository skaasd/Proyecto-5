export type ReviewMemoryState = {
  stability: number;
  difficulty: number;
  reviewCount: number;
};

export type ReviewSchedulingInput = {
  reviewedAt: Date;
  isCorrect: boolean;
  previousState?: ReviewMemoryState;
};

export type ReviewSchedulingResult = ReviewMemoryState & {
  nextReviewAt: Date;
};

export function scheduleNextReview(input: ReviewSchedulingInput): ReviewSchedulingResult {
  const previous = input.previousState;
  const reviewCount = (previous?.reviewCount ?? 0) + 1;

  if (!input.isCorrect) {
    const difficulty = clamp((previous?.difficulty ?? 6.2) + 0.8, 1, 10);
    const stability = Math.max(0.5, (previous?.stability ?? 1) * 0.45);

    return {
      difficulty,
      stability,
      reviewCount,
      nextReviewAt: addDays(input.reviewedAt, 1),
    };
  }

  const previousDifficulty = previous?.difficulty ?? 5;
  const difficulty = clamp(previousDifficulty - 0.35, 1, 10);
  const stability = previous ? previous.stability * (1 + 0.12 * (11 - previousDifficulty)) : 2.5;
  const intervalDays = Math.max(1, Math.round(stability));

  return {
    difficulty,
    stability,
    reviewCount,
    nextReviewAt: addDays(input.reviewedAt, intervalDays),
  };
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
