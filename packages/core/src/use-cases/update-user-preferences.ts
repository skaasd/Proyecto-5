import type { UserPreferencesRepository } from "../ports/user-preferences-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";
import { serializePreferences } from "./get-user-preferences.js";

export type UpdateUserPreferencesInput = {
  userId: string;
  questionsPerWeek: number;
  tipsPerWeek: number;
};

export type UpdateUserPreferencesResult = {
  preferences: ReturnType<typeof serializePreferences>;
};

type Dependencies = {
  users: UserRepository;
  preferences: UserPreferencesRepository;
};

export class UpdateUserPreferences {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: UpdateUserPreferencesInput): Promise<UpdateUserPreferencesResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    if (input.questionsPerWeek < 1 || input.tipsPerWeek < 0) {
      throw new UseCaseError("Revisa el ritmo elegido.", "INVALID_PREFERENCES");
    }

    const preferences = await this.dependencies.preferences.updateCadence(input);

    return {
      preferences: serializePreferences(preferences),
    };
  }
}
