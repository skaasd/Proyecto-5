import type { UserLearningPreferences } from "../domain/user-learning-preferences.js";

export type SetPauseInput = {
  userId: string;
  isPaused: boolean;
  pausedUntil?: Date;
};

export type UpdateLearningCadenceInput = {
  userId: string;
  questionsPerWeek: number;
  tipsPerWeek: number;
};

export interface UserPreferencesRepository {
  getByUserId(userId: string): Promise<UserLearningPreferences>;
  setPause(input: SetPauseInput): Promise<UserLearningPreferences>;
  updateCadence(input: UpdateLearningCadenceInput): Promise<UserLearningPreferences>;
}
