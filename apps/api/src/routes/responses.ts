import type { SubmitUserResponse } from "@project-name/core";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

const submitResponseSchema = z.object({
  userId: z.string().min(1),
  questionId: z.string().min(1),
  answerId: z.string().min(1).optional(),
  responseText: z.string().optional(),
  responseTimeMs: z.number().int().nonnegative(),
  attemptNumber: z.number().int().positive().default(1),
  channel: z.enum(["web", "email", "telegram"]),
});

export async function registerResponseRoutes(
  app: FastifyInstance,
  submitUserResponse: SubmitUserResponse,
): Promise<void> {
  app.post("/api/responses", async (request, reply) => {
    const input = submitResponseSchema.parse(request.body);
    const result = await submitUserResponse.execute(input);

    return reply.status(201).send(result);
  });
}
