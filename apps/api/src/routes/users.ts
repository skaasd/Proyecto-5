import type {
  ExportUserData,
  GetLearningOverview,
  GetUserPreferences,
  GetUserProfile,
  SetLearningPause,
  UpdateUserPreferences,
} from "@project-name/core";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

const overviewParamsSchema = z.object({
  userId: z.string().min(1),
});

const pauseBodySchema = z.object({
  isPaused: z.boolean(),
  pausedUntil: z.coerce.date().optional(),
});

const updatePreferencesBodySchema = z.object({
  questionsPerWeek: z.number().int().min(1).max(21),
  tipsPerWeek: z.number().int().min(0).max(14),
});

export async function registerUserRoutes(
  app: FastifyInstance,
  exportUserData: ExportUserData,
  getLearningOverview: GetLearningOverview,
  getUserProfile: GetUserProfile,
  getUserPreferences: GetUserPreferences,
  setLearningPause: SetLearningPause,
  updateUserPreferences: UpdateUserPreferences,
): Promise<void> {
  app.get("/api/users/:userId/export", async (request, reply) => {
    const params = overviewParamsSchema.parse(request.params);
    const result = await exportUserData.execute(params);

    return reply
      .header("content-disposition", `attachment; filename="${params.userId}-learning-export.json"`)
      .send(result.data);
  });

  app.get("/api/users/:userId/overview", async (request) => {
    const params = overviewParamsSchema.parse(request.params);
    return getLearningOverview.execute(params);
  });

  app.get("/api/users/:userId/profile", async (request) => {
    const params = overviewParamsSchema.parse(request.params);
    return getUserProfile.execute(params);
  });

  app.get("/api/users/:userId/preferences", async (request) => {
    const params = overviewParamsSchema.parse(request.params);
    return getUserPreferences.execute(params);
  });

  app.post("/api/users/:userId/pause", async (request) => {
    const params = overviewParamsSchema.parse(request.params);
    const body = pauseBodySchema.parse(request.body);

    return setLearningPause.execute({
      userId: params.userId,
      isPaused: body.isPaused,
      pausedUntil: body.pausedUntil,
    });
  });

  app.patch("/api/users/:userId/preferences", async (request) => {
    const params = overviewParamsSchema.parse(request.params);
    const body = updatePreferencesBodySchema.parse(request.body);

    return updateUserPreferences.execute({
      userId: params.userId,
      questionsPerWeek: body.questionsPerWeek,
      tipsPerWeek: body.tipsPerWeek,
    });
  });
}
