import type {
  ExportUserData,
  GetGameProfile,
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
import { type UserAccessOptions, createUserAccessGuard } from "./http/user-access.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerQuestionRoutes } from "./routes/questions.js";
import { registerResponseRoutes } from "./routes/responses.js";
import { registerUserRoutes } from "./routes/users.js";

type AppDependencies = {
  exportUserData: ExportUserData;
  getGameProfile: GetGameProfile;
  getLearningOverview: GetLearningOverview;
  getNextQuestion: GetNextQuestion;
  getUserProfile: GetUserProfile;
  getUserPreferences: GetUserPreferences;
  setLearningPause: SetLearningPause;
  submitUserResponse: SubmitUserResponse;
  updateUserPreferences: UpdateUserPreferences;
  userAccess?: UserAccessOptions;
  logger?: boolean | Record<string, unknown>;
};

export async function buildApp(dependencies: AppDependencies) {
  const app = Fastify({
    logger: dependencies.logger ?? true,
  });

  registerErrorHandler(app);
  const authorizeUserAccess = createUserAccessGuard(
    dependencies.userAccess ?? {
      mode: "disabled",
    },
  );
  await registerHealthRoutes(app);
  await registerUserRoutes(
    app,
    dependencies.exportUserData,
    dependencies.getGameProfile,
    dependencies.getLearningOverview,
    dependencies.getUserProfile,
    dependencies.getUserPreferences,
    dependencies.setLearningPause,
    dependencies.updateUserPreferences,
    authorizeUserAccess,
  );
  await registerQuestionRoutes(app, dependencies.getNextQuestion, authorizeUserAccess);
  await registerResponseRoutes(app, dependencies.submitUserResponse, authorizeUserAccess);

  return app;
}
