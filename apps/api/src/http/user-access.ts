import type { FastifyReply, FastifyRequest } from "fastify";

export type UserAccessOptions =
  | {
      mode: "disabled";
    }
  | {
      demoUserId?: string;
      internalApiSecret?: string;
      mode: "internal";
    };

export type UserAccessGuard = (
  request: FastifyRequest,
  reply: FastifyReply,
  requestedUserId: string,
) => boolean;

const currentUserHeader = "x-current-user-id";
const internalSecretHeader = "x-internal-api-secret";

export function createUserAccessGuard(options: UserAccessOptions): UserAccessGuard {
  if (options.mode === "disabled") {
    return () => true;
  }

  return (request, reply, requestedUserId) => {
    if (options.demoUserId && requestedUserId === options.demoUserId) {
      return true;
    }

    if (!options.internalApiSecret) {
      reply.status(401).send({
        error: "API_AUTH_REQUIRED",
        message: "Esta ruta requiere autenticacion interna de la web.",
      });
      return false;
    }

    const receivedSecret = readHeader(request, internalSecretHeader);
    const currentUserId = readHeader(request, currentUserHeader);

    if (receivedSecret !== options.internalApiSecret || !currentUserId) {
      reply.status(401).send({
        error: "API_AUTH_REQUIRED",
        message: "Esta ruta requiere autenticacion interna de la web.",
      });
      return false;
    }

    if (currentUserId !== requestedUserId) {
      reply.status(403).send({
        error: "USER_ACCESS_DENIED",
        message: "No puedes acceder a la trayectoria de otro usuario.",
      });
      return false;
    }

    return true;
  };
}

function readHeader(request: FastifyRequest, name: string): string | undefined {
  const value = request.headers[name];

  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
