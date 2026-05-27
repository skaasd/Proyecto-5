import { describe, expect, it } from "vitest";
import type {
  SetPauseInput,
  UpdateLearningCadenceInput,
  User,
  UserLearningPreferences,
  UserPreferencesRepository,
  UserRepository,
} from "../src/index.js";
import { GetUserPreferences, SetLearningPause, UseCaseError } from "../src/index.js";

const now = new Date("2026-05-27T12:00:00.000Z");

class InMemoryUsers implements UserRepository {
  constructor(private readonly users: User[]) {}

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
}

class InMemoryPreferences implements UserPreferencesRepository {
  private preferences: UserLearningPreferences;

  constructor(preferences: UserLearningPreferences) {
    this.preferences = preferences;
  }

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

const initialPreferences: UserLearningPreferences = {
  userId: "user_1",
  questionsPerWeek: 5,
  tipsPerWeek: 2,
  isPaused: false,
};

describe("learning pause preferences", () => {
  it("pausa y serializa las preferencias del usuario", async () => {
    const preferences = new InMemoryPreferences(initialPreferences);
    const setPause = new SetLearningPause({
      users: new InMemoryUsers([user]),
      preferences,
    });
    const getPreferences = new GetUserPreferences({
      users: new InMemoryUsers([user]),
      preferences,
    });

    const pausedUntil = new Date("2026-05-30T12:00:00.000Z");
    const result = await setPause.execute({
      userId: "user_1",
      isPaused: true,
      pausedUntil,
    });

    expect(result.preferences.isPaused).toBe(true);
    expect(result.preferences.pausedUntil).toBe("2026-05-30T12:00:00.000Z");
    await expect(getPreferences.execute({ userId: "user_1" })).resolves.toEqual(result);
  });

  it("rechaza usuarios inexistentes", async () => {
    const setPause = new SetLearningPause({
      users: new InMemoryUsers([]),
      preferences: new InMemoryPreferences(initialPreferences),
    });

    await expect(setPause.execute({ userId: "missing", isPaused: true })).rejects.toEqual(
      new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND"),
    );
  });
});
