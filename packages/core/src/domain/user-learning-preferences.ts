export type UserLearningPreferences = {
  userId: string;
  questionsPerWeek: number;
  tipsPerWeek: number;
  isPaused: boolean;
  pausedUntil?: Date;
};
