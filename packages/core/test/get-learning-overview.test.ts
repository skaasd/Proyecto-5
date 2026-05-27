import { describe, expect, it } from "vitest";
import type {
  LearningOverview,
  LearningOverviewRepository,
  User,
  UserRepository,
} from "../src/index.js";
import { GetLearningOverview, UseCaseError } from "../src/index.js";

const now = new Date("2026-05-27T12:00:00.000Z");

class InMemoryUsers implements UserRepository {
  constructor(private readonly users: User[]) {}

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
}

class InMemoryOverview implements LearningOverviewRepository {
  constructor(private readonly overview: LearningOverview) {}

  async getByUserId(): Promise<LearningOverview> {
    return this.overview;
  }
}

const user: User = {
  id: "user_1",
  email: "persona@example.com",
  createdAt: now,
  updatedAt: now,
};

describe("GetLearningOverview", () => {
  it("calcula precisión y serializa fechas para la API", async () => {
    const useCase = new GetLearningOverview({
      users: new InMemoryUsers([user]),
      overview: new InMemoryOverview({
        userId: "user_1",
        totalResponses: 4,
        correctResponses: 3,
        conceptsExplored: 2,
        totalTimeMs: 180_000,
        lastActivityAt: now,
        nextReviewAt: new Date("2026-05-28T12:00:00.000Z"),
        recentResponses: [
          {
            id: "response_1",
            questionId: "question_1",
            questionPrompt: "¿Qué aporta una prueba de humo?",
            answerText: "Una señal rápida",
            isCorrect: true,
            submittedAt: now,
          },
        ],
      }),
    });

    const result = await useCase.execute({ userId: "user_1" });

    expect(result.overview.accuracyRate).toBe(0.75);
    expect(result.overview.lastActivityAt).toBe("2026-05-27T12:00:00.000Z");
    expect(result.overview.nextReviewAt).toBe("2026-05-28T12:00:00.000Z");
    expect(result.overview.recentResponses).toEqual([
      {
        id: "response_1",
        questionId: "question_1",
        questionPrompt: "¿Qué aporta una prueba de humo?",
        answerText: "Una señal rápida",
        outcome: "expected",
        submittedAt: "2026-05-27T12:00:00.000Z",
      },
    ]);
  });

  it("rechaza usuarios inexistentes", async () => {
    const useCase = new GetLearningOverview({
      users: new InMemoryUsers([]),
      overview: new InMemoryOverview({
        userId: "user_404",
        totalResponses: 0,
        correctResponses: 0,
        conceptsExplored: 0,
        totalTimeMs: 0,
        recentResponses: [],
      }),
    });

    await expect(useCase.execute({ userId: "user_404" })).rejects.toEqual(
      new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND"),
    );
  });
});
