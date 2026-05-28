# Checkpoint: proteccion de acceso por usuario en API

Fecha: 2026-05-27 20:28:52 -04:00

## Estado

La API queda protegida contra acceso cruzado entre usuarios reales. La web resuelve el usuario actual con NextAuth y llama a Fastify usando headers internos.

## Avances incluidos

- Se agrego `createUserAccessGuard` para validar `x-current-user-id` y `x-internal-api-secret`.
- Las rutas de usuarios, siguiente pregunta y respuestas verifican que el usuario autenticado coincida con el `userId` solicitado.
- El bypass demo queda limitado a entornos no productivos o a `DEMO_MODE=true`.
- La web centraliza llamadas internas en `lib/api-client.ts`.
- La exportacion desde navegador pasa por `GET /api/learning-export`, evitando exponer la URL directa de Fastify.
- `.env.example` documenta `INTERNAL_API_SECRET`.
- `docs/api.md` documenta la autenticacion interna.

## Validacion

```txt
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Resultado: todo verde.

## Proximo frente recomendado

Avanzar en el nucleo de quests versionadas: definir datos semilla de 30-50 daily quests de QA y conectar el dashboard a contenido menos demo.
