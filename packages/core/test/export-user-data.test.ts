import { describe, expect, it } from "vitest";
import type {
  ExportedUserData,
  User,
  UserDataExportRepository,
  UserRepository,
} from "../src/index.js";
import { ExportUserData, UseCaseError } from "../src/index.js";

const now = new Date("2026-05-27T12:00:00.000Z");

class InMemoryUsers implements UserRepository {
  constructor(private readonly users: User[]) {}

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
}

class InMemoryExport implements UserDataExportRepository {
  async exportByUserId(userId: string, exportedAt: Date): Promise<ExportedUserData> {
    return {
      exportedAt,
      user: {
        id: userId,
        email: "persona@example.com",
        createdAt: now,
      },
      preferences: {
        questionsPerWeek: 5,
        tipsPerWeek: 2,
        isPaused: false,
      },
      responses: [
        {
          id: "response_1",
          questionId: "question_1",
          questionPrompt: "¿Qué aporta una prueba de humo?",
          answerId: "answer_1",
          answerText: "Una señal rápida.",
          isCorrect: true,
          responseTimeMs: 60_000,
          submittedAt: now,
        },
      ],
      learningEvents: [
        {
          id: "event_1",
          type: "response_submitted",
          occurredAt: now,
          payload: { isCorrect: true },
        },
      ],
      spacedRepetitionStates: [
        {
          conceptId: "concept_1",
          conceptName: "Pruebas de humo",
          stability: 1.5,
          difficulty: 0.3,
          reviewCount: 1,
          lastReviewedAt: now,
          nextReviewAt: new Date("2026-05-30T12:00:00.000Z"),
        },
      ],
    };
  }
}

const user: User = {
  id: "user_1",
  email: "persona@example.com",
  createdAt: now,
  updatedAt: now,
};

describe("ExportUserData", () => {
  it("serializa los datos exportables del usuario como JSON estable", async () => {
    const useCase = new ExportUserData({
      users: new InMemoryUsers([user]),
      exports: new InMemoryExport(),
      now: () => now,
    });

    const result = await useCase.execute({ userId: "user_1" });

    expect(result.data.exportedAt).toBe("2026-05-27T12:00:00.000Z");
    expect(result.data.user.email).toBe("persona@example.com");
    expect(result.data.responses[0]?.submittedAt).toBe("2026-05-27T12:00:00.000Z");
    expect(result.data.spacedRepetitionStates[0]?.nextReviewAt).toBe("2026-05-30T12:00:00.000Z");
  });

  it("rechaza usuarios inexistentes", async () => {
    const useCase = new ExportUserData({
      users: new InMemoryUsers([]),
      exports: new InMemoryExport(),
      now: () => now,
    });

    await expect(useCase.execute({ userId: "missing" })).rejects.toEqual(
      new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND"),
    );
  });
});
