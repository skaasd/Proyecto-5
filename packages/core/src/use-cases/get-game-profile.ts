import { type GameProgression, calculateGameProgression } from "../domain/game-progression.js";
import type { GameProfileRepository } from "../ports/game-profile-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";

export type GetGameProfileInput = {
  userId: string;
};

export type GetGameProfileResult = {
  gameProfile: GameProgression;
};

type Dependencies = {
  users: UserRepository;
  gameProfiles: GameProfileRepository;
};

export class GetGameProfile {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: GetGameProfileInput): Promise<GetGameProfileResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const snapshot = await this.dependencies.gameProfiles.getActivitySnapshotByUserId(input.userId);

    return {
      gameProfile: calculateGameProgression(snapshot),
    };
  }
}
