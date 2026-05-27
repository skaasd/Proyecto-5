import type { GetNextQuestion } from "@project-name/core";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

const nextQuestionQuerySchema = z.object({
  userId: z.string().min(1),
});

export async function registerQuestionRoutes(
  app: FastifyInstance,
  getNextQuestion: GetNextQuestion,
): Promise<void> {
  app.get("/api/questions/next", async (request) => {
    const query = nextQuestionQuerySchema.parse(request.query);
    return getNextQuestion.execute(query);
  });
}
