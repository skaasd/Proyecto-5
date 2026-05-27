import type {
  ExportedUserData,
  UserDataExportRepository,
} from "../ports/user-data-export-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";

export type ExportUserDataInput = {
  userId: string;
};

export type ExportUserDataResult = {
  data: ReturnType<typeof serializeExportedUserData>;
};

type Dependencies = {
  users: UserRepository;
  exports: UserDataExportRepository;
  now: () => Date;
};

export class ExportUserData {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: ExportUserDataInput): Promise<ExportUserDataResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const data = await this.dependencies.exports.exportByUserId(
      input.userId,
      this.dependencies.now(),
    );

    return {
      data: serializeExportedUserData(data),
    };
  }
}

function serializeExportedUserData(data: ExportedUserData) {
  return {
    exportedAt: data.exportedAt.toISOString(),
    user: {
      id: data.user.id,
      email: data.user.email,
      createdAt: data.user.createdAt.toISOString(),
    },
    preferences: {
      questionsPerWeek: data.preferences.questionsPerWeek,
      tipsPerWeek: data.preferences.tipsPerWeek,
      isPaused: data.preferences.isPaused,
      pausedUntil: data.preferences.pausedUntil?.toISOString(),
    },
    responses: data.responses.map((response) => ({
      ...response,
      submittedAt: response.submittedAt.toISOString(),
    })),
    learningEvents: data.learningEvents.map((event) => ({
      ...event,
      occurredAt: event.occurredAt.toISOString(),
    })),
    spacedRepetitionStates: data.spacedRepetitionStates.map((state) => ({
      ...state,
      lastReviewedAt: state.lastReviewedAt?.toISOString(),
      nextReviewAt: state.nextReviewAt?.toISOString(),
    })),
  };
}
