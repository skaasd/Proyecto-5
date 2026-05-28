# Checkpoint: demo compartida, repaso espaciado y skill tree real

Fecha: 2026-05-27 21:34:00 -04:00

## Estado

La experiencia de aprendizaje queda mas cerca del MVP real: la demo usa el mismo banco compartido de daily quests, el dashboard muestra nodos de habilidad derivados de conceptos practicados y el scheduler de repeticion espaciada deja de ser un intervalo fijo simple.

## Avances incluidos

- El banco QA se movio a `packages/shared/src/qa-question-bank.ts`.
- Prisma seed y API demo consumen la misma fuente de contenido.
- La API demo puede entregar las 33 daily quests sin duplicar datos hardcodeados.
- `PrismaQuestionRepository.findNextForUser` prioriza conceptos con `nextReviewAt` vencido antes de entregar contenido nuevo.
- Core agrega `scheduleNextReview` con estabilidad, dificultad, conteo de repasos y proxima fecha.
- `PrismaSpacedRepetitionScheduler` usa el algoritmo de dominio y actualiza estabilidad/dificultad en base al estado previo.
- Demo y exportacion demo usan el mismo calculo de proxima revision.
- El perfil gamificado incluye `skillNodes` derivados de conceptos reales practicados.
- El dashboard renderiza skill tree desde `gameProfile.skillNodes` en vez de `demoSkillNodes`.

## Validacion

```txt
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Resultado: todo verde.

Smoke test en API demo actualizada:

```txt
GET http://127.0.0.1:4004/api/questions/next?userId=user_demo
GET http://127.0.0.1:4004/api/users/user_demo/game-profile
POST http://127.0.0.1:4004/api/responses
```

Despues de responder una quest correcta, el perfil demo subio a 60 XP, 10 monedas y mostro nodos activos para los conceptos practicados.

## Bloqueo local

Se intento realinear la password del contenedor Postgres con `docker-compose.yml` (`postgres/postgres`) y correr `prisma:seed`, pero Prisma siguio rechazando autenticacion desde host. El contenedor esta sano y responde internamente; falta resolver la conexion Prisma-host antes de cargar el banco en Postgres local.

## Corte porcentual

- Fase 1: 65-70%.
- MVP inicial: 70-75%.
- Proyecto completo: 30-35%.

## Proximo frente recomendado

Resolver la conexion Prisma/Postgres local y correr migraciones + seed; despues implementar el primer canal real de entrega programada de quests (worker/email o Telegram minimo).
