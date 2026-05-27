import type { UserPreferencesRepository } from "../ports/user-preferences-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";
import { serializePreferences } from "./get-user-preferences.js";

export type SetLearningPauseInput = {
  userId: string;
  isPaused: boolean;
  pausedUntil?: Date;
};

export type SetLearningPauseResult = {
  preferences: ReturnType<typeof serializePreferences>;
};

type Dependencies = {
  users: UserRepository;
  preferences: UserPreferencesRepository;
};

export class SetLearningPause {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: SetLearningPauseInput): Promise<SetLearningPauseResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const preferences = await this.dependencies.preferences.setPause(input);

    return {
      preferences: serializePreferences(preferences),
    };
  }
}
