import type { PrismaClient } from "@prisma/client";
import type { ExportedUserData, UserDataExportRepository } from "@project-name/core";

export class PrismaUserDataExportRepository implements UserDataExportRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async exportByUserId(userId: string, exportedAt: Date): Promise<ExportedUserData> {
    const [user, preferences, responses, learningEvents, spacedRepetitionStates] =
      await Promise.all([
        this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
        }),
        this.prisma.userPreferences.upsert({
          where: { userId },
          update: {},
          create: { userId },
        }),
        this.prisma.userResponse.findMany({
          where: { userId },
          include: {
            answer: true,
            question: true,
          },
          orderBy: { submittedAt: "asc" },
        }),
        this.prisma.learningEvent.findMany({
          where: { userId },
          orderBy: { occurredAt: "asc" },
        }),
        this.prisma.spacedRepetitionState.findMany({
          where: { userId },
          include: {
            concept: true,
          },
          orderBy: { updatedAt: "asc" },
        }),
      ]);

    return {
      exportedAt,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      preferences: {
        questionsPerWeek: preferences.questionsPerWeek,
        tipsPerWeek: preferences.tipsPerWeek,
        isPaused: preferences.isPaused,
        pausedUntil: preferences.pausedUntil ?? undefined,
      },
      responses: responses.map((response) => ({
        id: response.id,
        questionId: response.questionId,
        questionPrompt: response.question.prompt,
        answerId: response.answerId ?? undefined,
        answerText: response.answer?.text ?? undefined,
        isCorrect: response.isCorrect,
        responseTimeMs: response.responseTimeMs,
        submittedAt: response.submittedAt,
      })),
      learningEvents: learningEvents.map((event) => ({
        id: event.id,
        type: event.type,
        occurredAt: event.occurredAt,
        payload: event.payload as Record<string, unknown>,
      })),
      spacedRepetitionStates: spacedRepetitionStates.map((state) => ({
        conceptId: state.conceptId,
        conceptName: state.concept.name,
        stability: state.stability,
        difficulty: state.difficulty,
        reviewCount: state.reviewCount,
        lastReviewedAt: state.lastReviewedAt ?? undefined,
        nextReviewAt: state.nextReviewAt ?? undefined,
      })),
    };
  }
}
