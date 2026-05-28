# MVP tecnico 100

## Cerrado

- PostgreSQL del proyecto queda expuesto en `localhost:5433` para evitar conflicto con un Postgres local en `5432`.
- `.env.example` y `.env` local apuntan a `DATABASE_URL=postgresql://postgres:postgres@localhost:5433/project_name?schema=public`.
- `pnpm db:migrate` carga el `.env` raiz mediante wrapper y corre Prisma sin variables manuales.
- `pnpm db:seed` carga el `.env` raiz y deja el usuario demo, 33 quests QA y 18 conceptos.
- La migracion inicial quedo sin BOM invisible.
- El worker puede encolar y consumir `send-question` contra Redis/Postgres reales.
- La entrega usa Resend cuando `RESEND_API_KEY` existe y fallback por log en local.
- API y web quedaron levantadas y probadas contra la base real.

## Verificacion

- `pnpm db:migrate`
- `pnpm db:seed`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- Smoke worker real: `enqueue:send-question user_demo`, evento `QUESTION_SENT` persistido.
- Smoke HTTP:
  - `GET http://127.0.0.1:4004/api/users/user_demo/game-profile` -> 200
  - `GET http://127.0.0.1:3002/dashboard` -> 200
  - `GET http://127.0.0.1:3002/api/learning-export` -> 200

## Siguiente etapa

- Configurar credenciales reales de Resend y dominio remitente.
- Implementar Telegram como segundo canal.
- Preparar deploy/CI.
