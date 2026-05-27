import {
  ExportUserData,
  GetLearningOverview,
  GetNextQuestion,
  GetUserPreferences,
  GetUserProfile,
  SetLearningPause,
  SubmitUserResponse,
  UpdateUserPreferences,
} from "@project-name/core";
import { prisma } from "@project-name/db";
import {
  PrismaLearningEventRepository,
  PrismaLearningOverviewRepository,
  PrismaQuestionRepository,
  PrismaSpacedRepetitionScheduler,
  PrismaUserDataExportRepository,
  PrismaUserPreferencesRepository,
  PrismaUserRepository,
} from "@project-name/persistence";
import { buildApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { buildDemoUseCases } from "./demo/demo-dependencies.js";

const env = loadEnv();

const users = new PrismaUserRepository(prisma);
const questions = new PrismaQuestionRepository(prisma);
const preferences = new PrismaUserPreferencesRepository(prisma);

const useCases = env.DEMO_MODE
  ? buildDemoUseCases()
  : {
      exportUserData: new ExportUserData({
        users,
        exports: new PrismaUserDataExportRepository(prisma),
        now: () => new Date(),
      }),
      getNextQuestion: new GetNextQuestion({
        users,
        questions,
      }),
      getLearningOverview: new GetLearningOverview({
        users,
        overview: new PrismaLearningOverviewRepository(prisma),
      }),
      getUserProfile: new GetUserProfile({
        users,
        preferences,
      }),
      getUserPreferences: new GetUserPreferences({
        users,
        preferences,
      }),
      setLearningPause: new SetLearningPause({
        users,
        preferences,
      }),
      updateUserPreferences: new UpdateUserPreferences({
        users,
        preferences,
      }),
      submitUserResponse: new SubmitUserResponse({
        users,
        questions,
        events: new PrismaLearningEventRepository(prisma),
        scheduler: new PrismaSpacedRepetitionScheduler(prisma),
        now: () => new Date(),
      }),
    };

const app = await buildApp({
  exportUserData: useCases.exportUserData,
  getLearningOverview: useCases.getLearningOverview,
  getNextQuestion: useCases.getNextQuestion,
  getUserProfile: useCases.getUserProfile,
  getUserPreferences: useCases.getUserPreferences,
  setLearningPause: useCases.setLearningPause,
  submitUserResponse: useCases.submitUserResponse,
  updateUserPreferences: useCases.updateUserPreferences,
  logger: {
    level: env.LOG_LEVEL,
  },
});

await app.listen({
  host: env.API_HOST,
  port: env.API_PORT,
});
