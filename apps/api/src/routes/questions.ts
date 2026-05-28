import type { GetNextQuestion } from "@project-name/core";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { UserAccessGuard } from "../http/user-access.js";

const nextQuestionQuerySchema = z.object({
  userId: z.string().min(1),
});

export async function registerQuestionRoutes(
  app: FastifyInstance,
  getNextQuestion: GetNextQuestion,
  authorizeUserAccess: UserAccessGuard,
): Promise<void> {
  app.get("/api/questions/next", async (request, reply) => {
    const query = nextQuestionQuerySchema.parse(request.query);
    if (!authorizeUserAccess(request, reply, query.userId)) {
      return reply;
    }

    return getNextQuestion.execute(query);
  });
}
