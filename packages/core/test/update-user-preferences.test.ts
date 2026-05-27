import { describe, expect, it } from "vitest";
import type {
  SetPauseInput,
  UpdateLearningCadenceInput,
  User,
  UserLearningPreferences,
  UserPreferencesRepository,
  UserRepository,
} from "../src/index.js";
import { UpdateUserPreferences, UseCaseError } from "../src/index.js";

const now = new Date("2026-05-27T12:00:00.000Z");

class InMemoryUsers implements UserRepository {
  constructor(private readonly users: User[]) {}

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
}

class InMemoryPreferences implements UserPreferencesRepository {
  constructor(private preferences: UserLearningPreferences) {}

  async getByUserId(): Promise<UserLearningPreferences> {
    return this.preferences;
  }

  async setPause(input: SetPauseInput): Promise<UserLearningPreferences> {
    this.preferences = {
      ...this.preferences,
      isPaused: input.isPaused,
      pausedUntil: input.pausedUntil,
    };

    return this.preferences;
  }

  async updateCadence(input: UpdateLearningCadenceInput): Promise<UserLearningPreferences> {
    this.preferences = {
      ...this.preferences,
      questionsPerWeek: input.questionsPerWeek,
      tipsPerWeek: input.tipsPerWeek,
    };

    return this.preferences;
  }
}

const user: User = {
  id: "user_1",
  email: "persona@example.com",
  createdAt: now,
  updatedAt: now,
};

describe("UpdateUserPreferences", () => {
  it("actualiza el ritmo de preguntas y tips", async () => {
    const useCase = new UpdateUserPreferences({
      users: new InMemoryUsers([user]),
      preferences: new InMemoryPreferences({
        userId: "user_1",
        questionsPerWeek: 5,
        tipsPerWeek: 2,
        isPaused: false,
      }),
    });

    const result = await useCase.execute({
      userId: "user_1",
      questionsPerWeek: 7,
      tipsPerWeek: 3,
    });

    expect(result.preferences).toEqual({
      userId: "user_1",
      questionsPerWeek: 7,
      tipsPerWeek: 3,
      isPaused: false,
      pausedUntil: undefined,
    });
  });

  it("rechaza ritmos fuera de rango básico", async () => {
    const useCase = new UpdateUserPreferences({
      users: new InMemoryUsers([user]),
      preferences: new InMemoryPreferences({
        userId: "user_1",
        questionsPerWeek: 5,
        tipsPerWeek: 2,
        isPaused: false,
      }),
    });

    await expect(
      useCase.execute({
        userId: "user_1",
        questionsPerWeek: 0,
        tipsPerWeek: 2,
      }),
    ).rejects.toEqual(new UseCaseError("Revisa el ritmo elegido.", "INVALID_PREFERENCES"));
  });
});
