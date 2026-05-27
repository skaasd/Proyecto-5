export type { Answer } from "./domain/answer.js";
export type { Concept } from "./domain/concept.js";
export type { LearningEvent } from "./domain/learning-event.js";
export type { Question, QuestionWithAnswers, QuestionType } from "./domain/question.js";
export type { UserLearningPreferences } from "./domain/user-learning-preferences.js";
export type { User } from "./domain/user.js";
export type { ResponseChannel, UserResponse } from "./domain/user-response.js";
export {
  applyXpAward,
  calculateLevelProgress,
  xpRequiredForLevel,
  type GameProfile,
  type LevelProgress,
  type XPAward,
} from "./domain/game-progression.js";
export type { EmailMessage, EmailService } from "./ports/email-service.js";
export type {
  ExportedUserData,
  UserDataExportRepository,
} from "./ports/user-data-export-repository.js";
export type {
  LearningOverview,
  LearningOverviewRepository,
} from "./ports/learning-overview-repository.js";
export type { LearningEventRepository } from "./ports/learning-event-repository.js";
export type { MessagingChannel, OutboundMessage } from "./ports/messaging-channel.js";
export type { QuestionRepository, SaveUserResponseInput } from "./ports/question-repository.js";
export type {
  RecordReviewInput,
  SpacedRepetitionScheduler,
} from "./ports/spaced-repetition-scheduler.js";
export type {
  SetPauseInput,
  UpdateLearningCadenceInput,
  UserPreferencesRepository,
} from "./ports/user-preferences-repository.js";
export type { UserRepository } from "./ports/user-repository.js";
export { UseCaseError } from "./use-cases/errors.js";
export {
  ExportUserData,
  type ExportUserDataInput,
  type ExportUserDataResult,
} from "./use-cases/export-user-data.js";
export {
  GetLearningOverview,
  type GetLearningOverviewInput,
  type GetLearningOverviewResult,
} from "./use-cases/get-learning-overview.js";
export {
  GetNextQuestion,
  type GetNextQuestionInput,
  type GetNextQuestionResult,
} from "./use-cases/get-next-question.js";
export {
  GetUserProfile,
  type GetUserProfileInput,
  type GetUserProfileResult,
} from "./use-cases/get-user-profile.js";
export {
  GetUserPreferences,
  type GetUserPreferencesInput,
  type GetUserPreferencesResult,
} from "./use-cases/get-user-preferences.js";
export {
  SetLearningPause,
  type SetLearningPauseInput,
  type SetLearningPauseResult,
} from "./use-cases/set-learning-pause.js";
export {
  UpdateUserPreferences,
  type UpdateUserPreferencesInput,
  type UpdateUserPreferencesResult,
} from "./use-cases/update-user-preferences.js";
export {
  SubmitUserResponse,
  type SubmitUserResponseInput,
  type SubmitUserResponseResult,
} from "./use-cases/submit-user-response.js";
