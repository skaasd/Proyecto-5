import type { PrismaClient } from "@prisma/client";
import type { GameActivitySnapshot, GameProfileRepository } from "@project-name/core";

export class PrismaGameProfileRepository implements GameProfileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getActivitySnapshotByUserId(userId: string): Promise<GameActivitySnapshot> {
    const responses = await this.prisma.userResponse.findMany({
      where: { userId },
      include: {
        question: {
          include: {
            concepts: {
              select: { id: true, name: true },
            },
          },
        },
      },
      orderBy: { submittedAt: "asc" },
    });

    const conceptIds = new Set<string>();
    const concepts = new Map<
      string,
      { id: string; name: string; responseCount: number; correctCount: number }
    >();
    const activeDates = new Set<string>();

    for (const response of responses) {
      activeDates.add(toDateKey(response.submittedAt));

      for (const concept of response.question.concepts) {
        conceptIds.add(concept.id);
        const current = concepts.get(concept.id) ?? {
          id: concept.id,
          name: concept.name,
          responseCount: 0,
          correctCount: 0,
        };

        concepts.set(concept.id, {
          ...current,
          responseCount: current.responseCount + 1,
          correctCount: current.correctCount + (response.isCorrect ? 1 : 0),
        });
      }
    }

    return {
      userId,
      totalResponses: responses.length,
      correctResponses: responses.filter((response) => response.isCorrect).length,
      conceptsExplored: conceptIds.size,
      activeDays: activeDates.size,
      concepts: Array.from(concepts.values()),
    };
  }
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}
