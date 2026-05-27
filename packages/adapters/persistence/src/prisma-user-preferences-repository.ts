import type { PrismaClient } from "@prisma/client";
import type {
  SetPauseInput,
  UpdateLearningCadenceInput,
  UserLearningPreferences,
  UserPreferencesRepository,
} from "@project-name/core";

export class PrismaUserPreferencesRepository implements UserPreferencesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getByUserId(userId: string): Promise<UserLearningPreferences> {
    const preferences = await this.prisma.userPreferences.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    return {
      userId: preferences.userId,
      questionsPerWeek: preferences.questionsPerWeek,
      tipsPerWeek: preferences.tipsPerWeek,
      isPaused: preferences.isPaused,
      pausedUntil: preferences.pausedUntil ?? undefined,
    };
  }

  async setPause(input: SetPauseInput): Promise<UserLearningPreferences> {
    const preferences = await this.prisma.userPreferences.upsert({
      where: { userId: input.userId },
      update: {
        isPaused: input.isPaused,
        pausedUntil: input.pausedUntil,
      },
      create: {
        userId: input.userId,
        isPaused: input.isPaused,
        pausedUntil: input.pausedUntil,
      },
    });

    return {
      userId: preferences.userId,
      questionsPerWeek: preferences.questionsPerWeek,
      tipsPerWeek: preferences.tipsPerWeek,
      isPaused: preferences.isPaused,
      pausedUntil: preferences.pausedUntil ?? undefined,
    };
  }

  async updateCadence(input: UpdateLearningCadenceInput): Promise<UserLearningPreferences> {
    const preferences = await this.prisma.userPreferences.upsert({
      where: { userId: input.userId },
      update: {
        questionsPerWeek: input.questionsPerWeek,
        tipsPerWeek: input.tipsPerWeek,
      },
      create: {
        userId: input.userId,
        questionsPerWeek: input.questionsPerWeek,
        tipsPerWeek: input.tipsPerWeek,
      },
    });

    return {
      userId: preferences.userId,
      questionsPerWeek: preferences.questionsPerWeek,
      tipsPerWeek: preferences.tipsPerWeek,
      isPaused: preferences.isPaused,
      pausedUntil: preferences.pausedUntil ?? undefined,
    };
  }
}
