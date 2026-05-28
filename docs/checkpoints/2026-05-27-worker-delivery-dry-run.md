# Worker delivery

## Avance

- Se agrego `DeliverNextQuestion` en core para seleccionar la siguiente pregunta del usuario, enviarla por un `MessagingChannel` y registrar un evento `question_sent`.
- El worker dejo de ser placeholder: el job `send-question` ahora valida `scheduledFor`, ejecuta `DeliverNextQuestion` y registra en el log del job si entrego una pregunta o si no habia contenido disponible.
- El worker real quedo cableado a Prisma mediante los repositorios de usuarios, preguntas y eventos.
- Se agrego entrega por email via Resend cuando existe `RESEND_API_KEY`, con fallback local por logs.
- Se agrego un productor CLI para encolar una quest: `pnpm --filter @project-name/worker enqueue:send-question user_demo`.
- Se agregaron pruebas unitarias del caso de uso core, del job del worker y de los adaptadores de mensajeria.

## Verificacion

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- Smoke real con Redis/Postgres: job encolado, worker completo y evento `QUESTION_SENT` persistido.

## Pendiente conocido

- Para produccion falta configurar `RESEND_API_KEY` y dominio remitente real. Telegram sigue pendiente como segundo canal.
