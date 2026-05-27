import { UseCaseError } from "@project-name/core";
import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler(
    (
      error: FastifyError | ZodError | UseCaseError,
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      request.log.error({ error }, "request failed");

      if (error instanceof ZodError) {
        return reply.status(400).send({
          error: "VALIDATION_ERROR",
          message: "Revisa los datos enviados.",
          details: error.flatten(),
        });
      }

      if (error instanceof UseCaseError) {
        const statusCode = error.code.endsWith("NOT_FOUND") ? 404 : 400;
        return reply.status(statusCode).send({
          error: error.code,
          message: error.message,
        });
      }

      return reply.status(500).send({
        error: "INTERNAL_SERVER_ERROR",
        message: "Algo no salió como esperábamos. Ya quedó registrado para revisarlo.",
      });
    },
  );
}
