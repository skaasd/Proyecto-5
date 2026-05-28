import type {
  ExportUserData,
  GetGameProfile,
  GetLearningOverview,
  GetUserPreferences,
  GetUserProfile,
  SetLearningPause,
  UpdateUserPreferences,
} from "@project-name/core";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { UserAccessGuard } from "../http/user-access.js";

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
  getGameProfile: GetGameProfile,
  getLearningOverview: GetLearningOverview,
  getUserProfile: GetUserProfile,
  getUserPreferences: GetUserPreferences,
  setLearningPause: SetLearningPause,
  updateUserPreferences: UpdateUserPreferences,
  authorizeUserAccess: UserAccessGuard,
): Promise<void> {
  app.get("/api/users/:userId/export", async (request, reply) => {
    const params = overviewParamsSchema.parse(request.params);
    if (!authorizeUserAccess(request, reply, params.userId)) {
      return reply;
    }

    const result = await exportUserData.execute(params);

    return reply
      .header("content-disposition", `attachment; filename="${params.userId}-learning-export.json"`)
      .send(result.data);
  });

  app.get("/api/users/:userId/overview", async (request, reply) => {
    const params = overviewParamsSchema.parse(request.params);
    if (!authorizeUserAccess(request, reply, params.userId)) {
      return reply;
    }

    return getLearningOverview.execute(params);
  });

  app.get("/api/users/:userId/game-profile", async (request, reply) => {
    const params = overviewParamsSchema.parse(request.params);
    if (!authorizeUserAccess(request, reply, params.userId)) {
      return reply;
    }

    return getGameProfile.execute(params);
  });

  app.get("/api/users/:userId/profile", async (request, reply) => {
    const params = overviewParamsSchema.parse(request.params);
    if (!authorizeUserAccess(request, reply, params.userId)) {
      return reply;
    }

    return getUserProfile.execute(params);
  });

  app.get("/api/users/:userId/preferences", async (request, reply) => {
    const params = overviewParamsSchema.parse(request.params);
    if (!authorizeUserAccess(request, reply, params.userId)) {
      return reply;
    }

    return getUserPreferences.execute(params);
  });

  app.post("/api/users/:userId/pause", async (request, reply) => {
    const params = overviewParamsSchema.parse(request.params);
    if (!authorizeUserAccess(request, reply, params.userId)) {
      return reply;
    }

    const body = pauseBodySchema.parse(request.body);

    return setLearningPause.execute({
      userId: params.userId,
      isPaused: body.isPaused,
      pausedUntil: body.pausedUntil,
    });
  });

  app.patch("/api/users/:userId/preferences", async (request, reply) => {
    const params = overviewParamsSchema.parse(request.params);
    if (!authorizeUserAccess(request, reply, params.userId)) {
      return reply;
    }

    const body = updatePreferencesBodySchema.parse(request.body);

    return updateUserPreferences.execute({
      userId: params.userId,
      questionsPerWeek: body.questionsPerWeek,
      tipsPerWeek: body.tipsPerWeek,
    });
  });
}
