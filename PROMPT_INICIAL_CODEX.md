# Prompt inicial para Codex

> Este es el prompt que se le entrega a Codex (o cualquier agente de generación de código) para inicializar el proyecto. Está diseñado para producir una base sólida, no un prototipo desechable. Si Codex pide aclaraciones, las respuestas están en `PROYECTO_MAESTRO.md`.

---

## Contexto del proyecto

Estoy construyendo una plataforma de aprendizaje y construcción de trayectoria profesional verificable. El primer dominio de validación es QA y automatización de pruebas. Tengo el documento maestro completo del proyecto adjunto (`PROYECTO_MAESTRO.md`) que define visión, principios, requerimientos y arquitectura. Léelo completo antes de proceder. Todo lo que generes debe ser coherente con ese documento.

El nombre del proyecto está pendiente. Usa `{{PROJECT_NAME}}` como placeholder en todo lugar donde el nombre aparecería (package.json, READMEs, configuración). El placeholder debe ser fácil de reemplazar globalmente después.

## Tu rol

Vas a actuar como un equipo multidisciplinario. En cada decisión, considera las perspectivas de:

- **Arquitecto de software senior:** garantiza que la estructura sea escalable, mantenible y desacoplada.
- **Backend developer senior con experiencia en TypeScript:** escribe código idiomático, tipado y limpio.
- **QA Engineer senior:** asegura que todo lo crítico sea testeable y esté testeado.
- **DevOps engineer:** configura CI/CD, observabilidad y despliegue desde el inicio.
- **UX engineer:** asegura que cada texto y flujo respete la guía de voz del proyecto.
- **Product manager pragmático:** evita sobreingeniería, mantiene foco en el MVP.

Cuando haya tensión entre estos roles (por ejemplo, "más tests" vs "entregar rápido"), decide en favor de la calidad sostenible. Este proyecto se construye para durar años, no semanas.

## Principios técnicos no negociables

1. **Arquitectura hexagonal modular.** El paquete `core` no depende de detalles técnicos. Los adaptadores externos son intercambiables.
2. **TypeScript estricto.** `strict: true` en todos los `tsconfig.json`. Sin `any` salvo justificación documentada.
3. **Cada decisión arquitectónica relevante genera un ADR** (Architecture Decision Record) en `/docs/adr/`.
4. **Toda configuración por variables de entorno.** Nada hardcoded. Hay un `.env.example` siempre actualizado.
5. **Cero secretos en código.** Validación de variables de entorno con Zod al arranque.
6. **Testabilidad desde el diseño.** Las funciones puras se testean directamente. Las que tienen efectos secundarios se testean inyectando mocks de los puertos.
7. **Observabilidad desde el día 1.** Logging estructurado con Pino. Métricas básicas. Errores enviables a Sentry.
8. **Reversibilidad.** Cada decisión técnica debe ser reemplazable en menos de una semana cuando sea necesario.

## Stack obligatorio

- **Runtime:** Node.js 20+ LTS
- **Lenguaje:** TypeScript estricto
- **Backend HTTP:** Fastify
- **Frontend:** Next.js 14+ con App Router
- **ORM:** Prisma
- **DB:** PostgreSQL (configurada para Neon en producción, Postgres local en Docker para desarrollo)
- **Caché y colas:** Redis con BullMQ
- **Validación:** Zod
- **Testing:** Vitest
- **Linting/Formatting:** Biome
- **Estilos frontend:** Tailwind CSS + Shadcn/ui
- **Estado frontend:** TanStack Query (server) + Zustand (client)
- **Auth:** Auth.js (NextAuth) con magic links y Google OAuth
- **Bot Telegram:** Telegraf
- **Email:** Resend
- **Monorepo:** pnpm workspaces
- **CI/CD:** GitHub Actions
- **Logs:** Pino

## Estructura objetivo del repositorio

```
{{PROJECT_NAME}}/
├── .github/
│   └── workflows/                # CI/CD
├── apps/
│   ├── web/                      # Next.js
│   ├── api/                      # Fastify API
│   └── worker/                   # Workers BullMQ
├── packages/
│   ├── core/                     # Lógica de negocio pura
│   │   ├── src/
│   │   │   ├── domain/
│   │   │   ├── use-cases/
│   │   │   └── ports/
│   │   └── package.json
│   ├── adapters/
│   │   ├── persistence/
│   │   ├── messaging/
│   │   └── ai/
│   ├── shared/                   # Tipos, utilities compartidos
│   └── db/                       # Schema Prisma, migraciones
├── docs/
│   ├── adr/
│   │   ├── 0001-arquitectura-hexagonal.md
│   │   ├── 0002-monorepo-pnpm.md
│   │   ├── 0003-fastify-sobre-express.md
│   │   ├── 0004-prisma-como-orm.md
│   │   ├── 0005-fsrs-para-spaced-repetition.md
│   │   └── 0006-telegraf-para-bot.md
│   ├── voice-guide.md
│   ├── content-guidelines.md
│   └── api.md
├── docker-compose.yml            # Postgres + Redis local
├── .env.example
├── biome.json
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
└── PROYECTO_MAESTRO.md
```

## Lo que debes generar (entrega 1)

Esta es la primera entrega. NO intentes construir toda la funcionalidad. Construye solo la base sólida sobre la que iremos iterando.

### 1. Inicialización del monorepo
- `package.json` raíz con scripts útiles (`dev`, `build`, `test`, `lint`, `typecheck`).
- `pnpm-workspace.yaml` con los workspaces correctos.
- `tsconfig.base.json` con configuración estricta compartida.
- `biome.json` con reglas configuradas.
- `.gitignore` apropiado.
- `.env.example` con todas las variables necesarias documentadas.

### 2. Documentación inicial
- `README.md` que explique el proyecto a alto nivel, cómo levantarlo localmente y cómo contribuir.
- ADRs iniciales (mínimo los 6 listados arriba), cada uno siguiendo el formato estándar: contexto, decisión, alternativas consideradas, consecuencias.
- `docs/voice-guide.md` con la guía completa de tono y lenguaje, basada en la sección 9 del documento maestro.
- `docs/content-guidelines.md` con cómo se estructura el contenido (preguntas, tips).

### 3. Esquema de base de datos completo (Prisma)
Diseña el schema completo cubriendo:
- **Users:** id, email, configuración de preferencias, fechas de creación y actualización.
- **UserPreferences:** frecuencia de envío, canales activos, ventanas horarias preferidas, pausa.
- **Channels:** Telegram chat IDs, email confirmations, etc., relacionados al usuario.
- **Domains:** categorías de aprendizaje (ej: "QA", "Automatización", "SQL").
- **Topics y Subtopics:** jerarquía dentro de cada dominio.
- **Concepts:** unidades atómicas de conocimiento dentro de un subtopic.
- **Questions:** con metadata rica (tipo, nivel, conceptos involucrados, tiempo estimado, versión, autor).
- **QuestionVersions:** historial de versiones (nunca borramos contenido).
- **Answers:** respuestas correctas, distractores, explicaciones.
- **UserResponses:** respuestas del usuario, con tiempo, intentos, canal de respuesta.
- **LearningEvents:** event sourcing parcial. Cada interacción significativa es un evento inmutable.
- **SpacedRepetitionStates:** estado FSRS por usuario y concepto (stability, difficulty, last review, next review).
- **Tips:** estructura para tips por email con tipo, dominio, conceptos relacionados.
- **TipDeliveries:** registro de qué tip se envió a quién y cuándo.
- **Studysessions:** sesiones voluntarias de práctica en la plataforma web.
- **TimeTracking:** tiempo real invertido (calculado, no auto-reportado).

Incluye índices apropiados, relaciones bien tipadas, y comentarios en el schema explicando decisiones no obvias.

### 4. Paquete `core` esqueleto
- Estructura de carpetas (`domain/`, `use-cases/`, `ports/`).
- Entidades principales como clases o tipos: `User`, `Question`, `Answer`, `LearningEvent`, `Concept`.
- Puertos (interfaces) iniciales:
  - `UserRepository`
  - `QuestionRepository`
  - `LearningEventRepository`
  - `MessagingChannel`
  - `EmailService`
  - `SpacedRepetitionScheduler`
- Un caso de uso ejemplo completo (con tests): `SubmitUserResponse`. Que demuestre cómo se conectan domain, ports y use-cases sin tocar nada externo.

### 5. Paquete `adapters/persistence`
- Implementación de los repositorios usando Prisma.
- Inyección via constructor para que sean reemplazables.

### 6. App `api`
- Fastify configurado con TypeScript.
- Validación de variables de entorno con Zod al arranque.
- Logging con Pino estructurado.
- Health check endpoint.
- Manejo global de errores.
- Estructura de rutas modular preparada para crecer.
- Un endpoint ejemplo funcional: `POST /api/responses` que use el caso de uso `SubmitUserResponse`.

### 7. App `worker`
- Worker de BullMQ configurado.
- Conexión a Redis con validación.
- Un job ejemplo: `SendQuestionJob` (que aún no hace nada útil, solo demuestra estructura).
- Sistema de scheduling preparado para que un día agreguemos "enviar pregunta a usuario X a las Y horas".

### 8. App `web` esqueleto
- Next.js 14 con App Router configurado.
- Tailwind y Shadcn/ui instalados.
- Layout base con tipografía cálida y paleta calmada (sugerencia: tonos crema, verde oliva suave, marrón cálido).
- Página de inicio con explicación honesta del proyecto.
- Página de login con magic link (Auth.js configurado).
- Página de dashboard placeholder con estructura preparada.

### 9. Docker para desarrollo local
- `docker-compose.yml` que levante PostgreSQL y Redis localmente.
- Documentación clara en README sobre cómo arrancar todo.

### 10. CI/CD básico
- Workflow de GitHub Actions que en cada push corra: typecheck, lint, tests, build.
- Separación clara entre PR checks y deploys.

### 11. Tests
- Vitest configurado en todos los paquetes.
- Mínimo: tests del caso de uso `SubmitUserResponse` con mocks de los puertos.
- Mínimo: un test de integración del endpoint `POST /api/responses`.

## Cómo entregar

Genera todo el código y la estructura. Para cada archivo creado, asegúrate de que:

- Tenga TypeScript estricto.
- Pase el linter (Biome).
- Tenga comentarios solo donde aporten valor (no comentes lo obvio).
- Siga la guía de voz cuando contenga texto visible al usuario.
- Sea coherente con el resto del proyecto.

Al final, entrega un resumen de:
1. Qué archivos generaste.
2. Qué decisiones tomaste que no estaban explícitas en este prompt (con justificación).
3. Cómo levantar el proyecto localmente paso a paso.
4. Qué falta para considerar la fase 0 completa.
5. Qué deberíamos hacer en la siguiente iteración.

## Restricciones importantes

- **No agregues features fuera del scope.** Si te tienta hacer algo más, no lo hagas. Lista la idea en el resumen final.
- **No uses bibliotecas no listadas** sin justificación documentada en un ADR.
- **No copies código de tutoriales genéricos.** Este proyecto tiene identidad propia.
- **No agregues complejidad innecesaria.** Si algo puede ser simple, que sea simple.
- **No instales dependencias deprecated o sin mantenimiento activo.**
- **No uses Express, Mongoose, Sequelize, ESLint+Prettier o Jest.** Tenemos alternativas modernas mejores ya elegidas.

## Lo que NO quiero ver

- Sistema de autenticación con contraseñas.
- Lógica de negocio en controllers HTTP.
- SQL crudo (todo vía Prisma).
- Tipos `any` sin justificación.
- Strings hardcoded de configuración.
- Archivos de más de 300 líneas sin razón.
- Documentación faltante para decisiones no obvias.
- Tests que solo testean implementación, no comportamiento.

## Cierre

Procede con la generación. Si encuentras ambigüedad genuina, opta por la decisión más conservadora y documéntala en un ADR para revisarla después. Recuerda: esto es el cimiento del proyecto, no el edificio completo. Hazlo sólido, simple y honesto.
