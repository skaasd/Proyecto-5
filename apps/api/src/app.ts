import type {
  ExportUserData,
  GetLearningOverview,
  GetNextQuestion,
  GetUserPreferences,
  GetUserProfile,
  SetLearningPause,
  SubmitUserResponse,
  UpdateUserPreferences,
} from "@project-name/core";
import Fastify from "fastify";
import { registerErrorHandler } from "./http/errors.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerQuestionRoutes } from "./routes/questions.js";
import { registerResponseRoutes } from "./routes/responses.js";
import { registerUserRoutes } from "./routes/users.js";

type AppDependencies = {
  exportUserData: ExportUserData;
  getLearningOverview: GetLearningOverview;
  getNextQuestion: GetNextQuestion;
  getUserProfile: GetUserProfile;
  getUserPreferences: GetUserPreferences;
  setLearningPause: SetLearningPause;
  submitUserResponse: SubmitUserResponse;
  updateUserPreferences: UpdateUserPreferences;
  logger?: boolean | Record<string, unknown>;
};

export async function buildApp(dependencies: AppDependencies) {
  const app = Fastify({
    logger: dependencies.logger ?? true,
  });

  registerErrorHandler(app);
  await registerHealthRoutes(app);
  await registerUserRoutes(
    app,
    dependencies.exportUserData,
    dependencies.getLearningOverview,
    dependencies.getUserProfile,
    dependencies.getUserPreferences,
    dependencies.setLearningPause,
    dependencies.updateUserPreferences,
  );
  await registerQuestionRoutes(app, dependencies.getNextQuestion);
  await registerResponseRoutes(app, dependencies.submitUserResponse);

  return app;
}
