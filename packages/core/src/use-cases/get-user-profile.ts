import type { UserPreferencesRepository } from "../ports/user-preferences-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";

export type GetUserProfileInput = {
  userId: string;
};

export type GetUserProfileResult = {
  profile: {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    preferences: {
      questionsPerWeek: number;
      tipsPerWeek: number;
      isPaused: boolean;
      pausedUntil?: string;
    };
  };
};

type Dependencies = {
  users: UserRepository;
  preferences: UserPreferencesRepository;
};

export class GetUserProfile {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: GetUserProfileInput): Promise<GetUserProfileResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const preferences = await this.dependencies.preferences.getByUserId(user.id);

    return {
      profile: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        preferences: {
          questionsPerWeek: preferences.questionsPerWeek,
          tipsPerWeek: preferences.tipsPerWeek,
          isPaused: preferences.isPaused,
          pausedUntil: preferences.pausedUntil?.toISOString(),
        },
      },
    };
  }
}
