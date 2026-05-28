# Checkpoint 2026-05-28 - MVP conectado a backend real

## Estado

El MVP quedo conectado end-to-end contra PostgreSQL local via Docker, dejando atras el modo demo en memoria para la validacion principal.

## Alcance completado

- Dashboard carga datos reales desde la API:
  - perfil de usuario
  - overview de aprendizaje
  - perfil gamificado
  - siguiente pregunta pendiente
- Mision carga la siguiente pregunta real desde `GET /api/questions/next`.
- Seleccionar un movimiento registra respuesta mediante la ruta interna web `POST /api/mission-response`, que delega en `POST /api/responses`.
- El boton de pausa del dashboard ahora persiste el estado mediante `POST /api/learning-pause`, que delega en `POST /api/users/:userId/pause`.
- Portafolio mantiene consumo de datos reales con fallback.
- Login fue redisenado con la estetica de juego/progresion del resto del MVP.
- `apps/web` y `apps/api` pueden levantarse como workspaces aislados y cargar el `.env` raiz.
- `@project-name/db` carga variables de entorno antes de instanciar `PrismaClient`, evitando fallos de `DATABASE_URL` en runtime.
- El scheduler SRS limita intervalos futuros a 365 dias para evitar fechas fuera de rango en Prisma/PostgreSQL.

## Infraestructura local validada

- Docker Compose levanta:
  - PostgreSQL en `localhost:5433`
  - Redis en `localhost:6379`
- Prisma:
  - `db:generate` ejecutado correctamente
  - `db:migrate` sincronizado
  - `db:seed` cargo `user_demo`, 33 quests QA y 18 conceptos

## URLs de validacion

- Web: `http://127.0.0.1:3009/dashboard`
- API: `http://127.0.0.1:4004/health`

## Validacion ejecutada

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm --filter @project-name/web build`

Tambien se verifico manualmente:

- `GET /dashboard` responde 200
- `GET /mission/demo` responde 200
- `POST /api/mission-response` registra respuesta en PostgreSQL
- `POST /api/learning-pause` persiste pausa/reanudacion
- `GET /api/users/user_demo/overview` refleja respuestas registradas

## Notas

- El MVP local queda usable con Docker activo y `.env` raiz presente.
- Para produccion se deben reemplazar los secretos de desarrollo y configurar proveedores reales de Auth/Email.
