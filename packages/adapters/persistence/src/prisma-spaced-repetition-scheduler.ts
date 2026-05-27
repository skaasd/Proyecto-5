import type { PrismaClient } from "@prisma/client";
import type { RecordReviewInput, SpacedRepetitionScheduler } from "@project-name/core";

export class PrismaSpacedRepetitionScheduler implements SpacedRepetitionScheduler {
  constructor(private readonly prisma: PrismaClient) {}

  async recordReview(input: RecordReviewInput): Promise<void> {
    await Promise.all(
      input.conceptIds.map((conceptId) =>
        this.prisma.spacedRepetitionState.upsert({
          where: {
            userId_conceptId: {
              userId: input.userId,
              conceptId,
            },
          },
          create: {
            userId: input.userId,
            conceptId,
            stability: input.isCorrect ? 1.5 : 0.5,
            difficulty: input.isCorrect ? 0.3 : 0.7,
            reviewCount: 1,
            lastReviewedAt: input.reviewedAt,
            nextReviewAt: nextReview(input.reviewedAt, input.isCorrect),
          },
          update: {
            stability: { increment: input.isCorrect ? 0.4 : -0.2 },
            difficulty: { increment: input.isCorrect ? -0.05 : 0.1 },
            reviewCount: { increment: 1 },
            lastReviewedAt: input.reviewedAt,
            nextReviewAt: nextReview(input.reviewedAt, input.isCorrect),
          },
        }),
      ),
    );
  }
}

function nextReview(reviewedAt: Date, isCorrect: boolean): Date {
  const delayDays = isCorrect ? 3 : 1;
  return new Date(reviewedAt.getTime() + delayDays * 24 * 60 * 60 * 1000);
}
