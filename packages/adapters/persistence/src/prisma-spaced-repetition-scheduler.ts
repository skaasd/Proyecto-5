import type { PrismaClient } from "@prisma/client";
import {
  type RecordReviewInput,
  type SpacedRepetitionScheduler,
  scheduleNextReview,
} from "@project-name/core";

export class PrismaSpacedRepetitionScheduler implements SpacedRepetitionScheduler {
  constructor(private readonly prisma: PrismaClient) {}

  async recordReview(input: RecordReviewInput): Promise<void> {
    await Promise.all(
      input.conceptIds.map((conceptId) => this.recordConceptReview(input, conceptId)),
    );
  }

  private async recordConceptReview(input: RecordReviewInput, conceptId: string): Promise<void> {
    const previousState = await this.prisma.spacedRepetitionState.findUnique({
      where: {
        userId_conceptId: {
          userId: input.userId,
          conceptId,
        },
      },
    });
    const next = scheduleNextReview({
      reviewedAt: input.reviewedAt,
      isCorrect: input.isCorrect,
      previousState: previousState
        ? {
            stability: previousState.stability,
            difficulty: previousState.difficulty,
            reviewCount: previousState.reviewCount,
          }
        : undefined,
    });

    await this.prisma.spacedRepetitionState.upsert({
      where: {
        userId_conceptId: {
          userId: input.userId,
          conceptId,
        },
      },
      create: {
        userId: input.userId,
        conceptId,
        stability: next.stability,
        difficulty: next.difficulty,
        reviewCount: next.reviewCount,
        lastReviewedAt: input.reviewedAt,
        nextReviewAt: next.nextReviewAt,
      },
      update: {
        stability: next.stability,
        difficulty: next.difficulty,
        reviewCount: next.reviewCount,
        lastReviewedAt: input.reviewedAt,
        nextReviewAt: next.nextReviewAt,
      },
    });
  }
}
