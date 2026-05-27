import type { UserLearningPreferences } from "../domain/user-learning-preferences.js";
import type { UserPreferencesRepository } from "../ports/user-preferences-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";

export type GetUserPreferencesInput = {
  userId: string;
};

export type GetUserPreferencesResult = {
  preferences: {
    userId: string;
    questionsPerWeek: number;
    tipsPerWeek: number;
    isPaused: boolean;
    pausedUntil?: string;
  };
};

type Dependencies = {
  users: UserRepository;
  preferences: UserPreferencesRepository;
};

export class GetUserPreferences {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: GetUserPreferencesInput): Promise<GetUserPreferencesResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const preferences = await this.dependencies.preferences.getByUserId(input.userId);

    return {
      preferences: serializePreferences(preferences),
    };
  }
}

export function serializePreferences(preferences: UserLearningPreferences) {
  return {
    userId: preferences.userId,
    questionsPerWeek: preferences.questionsPerWeek,
    tipsPerWeek: preferences.tipsPerWeek,
    isPaused: preferences.isPaused,
    pausedUntil: preferences.pausedUntil?.toISOString(),
  };
}
