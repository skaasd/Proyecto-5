import type { PrismaClient } from "@prisma/client";
import type { LearningOverview, LearningOverviewRepository } from "@project-name/core";

export class PrismaLearningOverviewRepository implements LearningOverviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getByUserId(userId: string): Promise<LearningOverview> {
    const [responses, time, nextReview] = await Promise.all([
      this.prisma.userResponse.findMany({
        where: { userId },
        include: {
          answer: true,
          question: {
            include: {
              concepts: true,
            },
          },
        },
        orderBy: { submittedAt: "desc" },
      }),
      this.prisma.userResponse.aggregate({
        where: { userId },
        _sum: { responseTimeMs: true },
      }),
      this.prisma.spacedRepetitionState.findFirst({
        where: {
          userId,
          nextReviewAt: { not: null },
        },
        orderBy: { nextReviewAt: "asc" },
      }),
    ]);

    const conceptIds = new Set(
      responses.flatMap((response) => response.question.concepts.map((concept) => concept.id)),
    );

    return {
      userId,
      totalResponses: responses.length,
      correctResponses: responses.filter((response) => response.isCorrect).length,
      conceptsExplored: conceptIds.size,
      totalTimeMs: time._sum.responseTimeMs ?? 0,
      lastActivityAt: responses[0]?.submittedAt,
      nextReviewAt: nextReview?.nextReviewAt ?? undefined,
      recentResponses: responses.slice(0, 5).map((response) => ({
        id: response.id,
        questionId: response.questionId,
        questionPrompt: response.question.prompt,
        answerText: response.answer?.text ?? undefined,
        isCorrect: response.isCorrect,
        submittedAt: response.submittedAt,
      })),
    };
  }
}
