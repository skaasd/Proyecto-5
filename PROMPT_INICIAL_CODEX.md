# Prompt para Codex · Versión 2

> Este prompt reemplaza el original. Se le entrega a Codex (o cualquier agente de generación de código) junto con el archivo `PROYECTO_MAESTRO.md`. Codex debe leer ambos documentos completos antes de generar nada.

---

## Contexto del proyecto

Estoy construyendo una plataforma de aprendizaje profesional gamificada. El primer dominio de validación es QA y automatización de pruebas.

Existe documentación maestra completa adjunta: `PROYECTO_MAESTRO.md`. Léelo completo antes de proceder. Todo lo que generes debe ser coherente con ese documento. Si hay ambigüedad, vuelve al documento maestro.

El nombre del proyecto está pendiente. Usa `{{PROJECT_NAME}}` como placeholder en todo lugar donde aparezca el nombre. Debe ser reemplazable globalmente con un find-and-replace.

**Importante: este proyecto reemplaza una versión anterior generada por ti.** La versión anterior tenía buena arquitectura pero diseño visual y experiencia plana, no lúdica. Esta versión debe sentirse como un juego de progresión profesional (estilo MMO sano), no como una plataforma de e-learning aburrida.

## Tu rol

Vas a actuar como un equipo multidisciplinario senior. En cada decisión, considera:

- **Arquitecto de software senior:** estructura escalable, mantenible, desacoplada
- **Backend developer senior con TypeScript:** código idiomático, tipado, limpio
- **Frontend engineer senior con experiencia en producto premium:** interfaces que se sienten como Linear/Vercel/Cursor pero con alma de juego
- **Game designer:** mecánicas de progresión sanas (skill trees, quests, XP, niveles, insignias)
- **UX engineer:** patrones de atención visual (F/Z), carga cognitiva controlada, dopamina por anticipación
- **QA Engineer senior:** todo lo crítico testeado
- **DevOps engineer:** CI/CD, observabilidad, despliegue desde el inicio
- **UX writer:** lenguaje narrativo de aventura, nunca de evaluación escolar
- **Visual designer:** sistema de diseño profesional pero con momentos lúdicos calibrados
- **Product manager pragmático:** evitar sobreingeniería, mantener foco en MVP

Cuando haya tensión entre roles, decide en favor de calidad sostenible. Este proyecto se construye para durar años.

## Principios técnicos no negociables

1. **Arquitectura hexagonal modular.** Core de negocio sin dependencias técnicas. Adaptadores intercambiables.
2. **TypeScript estricto.** `strict: true` en todos los tsconfig. Sin `any` salvo justificación documentada.
3. **Cada decisión arquitectónica genera un ADR** en `/docs/adr/`.
4. **Toda configuración por variables de entorno.** Nada hardcoded. `.env.example` siempre actualizado.
5. **Cero secretos en código.** Validación de env vars con Zod al arranque.
6. **Testabilidad desde el diseño.** Funciones puras testeadas directamente. Side effects testeados con mocks.
7. **Observabilidad desde el día 1.** Pino estructurado, métricas básicas, Sentry.
8. **Reversibilidad.** Cada decisión técnica reemplazable en menos de una semana.

## Principios de diseño visual no negociables

1. **Profesional + lúdico.** Disciplina visual tipo Linear, mecánicas tipo MMO sano. Cero infantilismo.
2. **Sistema de color estricto.** Solo los hex definidos en el documento maestro. Cero colores arbitrarios.
3. **Tipografía disciplinada.** Una sola fuente sans system stack. Tres tamaños base. Letter-spacing negativo en headings.
4. **Sentence case siempre.** Cero Title Case, cero ALL CAPS (excepto badges con propósito).
5. **Espaciados matemáticos.** Múltiplos de 4px. Cero números arbitrarios.
6. **Cero gradientes en fondos.** Sí gradientes sutiles en insignias y elementos celebratorios.
7. **Animaciones con propósito.** Cada animación debe comunicar algo (progreso, atención, celebración).
8. **Densidad informativa balanceada.** Máximo 7 chunks visibles por sección.

## Principios de lenguaje no negociables

1. **Cero lenguaje escolar.** Nunca "examen", "prueba", "test", "lección", "reprobaste".
2. **Lenguaje de aventura aplicado profesionalmente.** "Misión", "quest", "capítulo", "movimiento", "desbloqueaste".
3. **Cero presión.** "Sin apuro", "cuando estés listo", "a tu ritmo".
4. **Cero comparación competitiva.** Nunca rankings entre usuarios.
5. **Narrativa por encima de información seca.** En vez de "Tiempo: 4h 23m" → "Llevas 4h 23min en tu observatorio".

## Stack obligatorio

Ya definido en el documento maestro. Resumen rápido:

- Node.js 20+ LTS + TypeScript estricto
- Fastify backend, Next.js 14+ frontend
- Prisma + PostgreSQL (Neon en producción)
- Redis + BullMQ (Upstash en producción)
- Zod, Vitest, Biome
- Tailwind + Shadcn/ui base + componentes propios para lo lúdico
- Framer Motion (crítico para sensación de juego)
- D3.js o React Flow para skill tree visual
- TanStack Query + Zustand
- Auth.js con magic links + Google OAuth
- Telegraf para Telegram, Resend para email
- pnpm workspaces, GitHub Actions, Sentry, Pino

## Estructura objetivo del repositorio

```
{{PROJECT_NAME}}/
├── .github/workflows/
├── apps/
│   ├── web/                      # Next.js
│   ├── api/                      # Fastify
│   └── worker/                   # BullMQ workers
├── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── domain/
│   │   │   ├── use-cases/
│   │   │   └── ports/
│   ├── adapters/
│   │   ├── persistence/
│   │   ├── messaging/
│   │   └── ai/
│   ├── shared/
│   ├── db/
│   └── ui/                       # Componentes UI compartidos
├── docs/
│   ├── adr/
│   ├── voice-guide.md
│   ├── visual-system.md
│   ├── content-guidelines.md
│   ├── badge-design-guide.md
│   └── api.md
├── docker-compose.yml
├── .env.example
├── biome.json
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
└── PROYECTO_MAESTRO.md
```

## Lo que debes generar (entrega 1)

Esta es la primera entrega. NO construyas toda la funcionalidad. Construye base sólida sobre la que iteraremos.

### 1. Inicialización del monorepo

- `package.json` raíz con scripts: `dev`, `build`, `test`, `lint`, `typecheck`, `db:migrate`, `db:seed`
- `pnpm-workspace.yaml` con workspaces correctos
- `tsconfig.base.json` con configuración estricta compartida
- `biome.json` con reglas
- `.gitignore` apropiado
- `.env.example` con todas las variables documentadas

### 2. Documentación inicial

- `README.md` claro: qué es, cómo levantarlo, cómo contribuir
- ADRs iniciales mínimos:
  - `0001-arquitectura-hexagonal.md`
  - `0002-monorepo-pnpm.md`
  - `0003-fastify-sobre-express.md`
  - `0004-prisma-como-orm.md`
  - `0005-fsrs-para-spaced-repetition.md`
  - `0006-telegraf-para-bot.md`
  - `0007-framer-motion-para-experiencia-de-juego.md`
  - `0008-sistema-xp-niveles-monedas-insignias.md`
- `docs/voice-guide.md` con la guía completa de la sección 14 del documento maestro
- `docs/visual-system.md` con el sistema de diseño de la sección 13
- `docs/content-guidelines.md` con cómo escribir quests, misiones y tips
- `docs/badge-design-guide.md` con cómo diseñar insignias

### 3. Schema de base de datos completo (Prisma)

Diseña el schema cubriendo todo el modelo gamificado:

**Identidad y preferencias:**
- `User`: id, email, displayName, level, totalXP, coins, createdAt, updatedAt
- `UserPreferences`: questFrequency, channels, timeWindows, paused, mercadoEnabled
- `Channel`: telegram chat IDs, email confirmations

**Paths y skill tree:**
- `Path`: dominio temático (ej: "QA Path"). Tiene topics y conceptos
- `Topic`: agrupación dentro de un path
- `Concept`: unidad atómica. Tiene niveles I-V
- `ConceptConnection`: relaciones entre conceptos para el skill tree
- `UserConceptProgress`: nivel actual del usuario en cada concepto, XP en ese concepto, fechas

**Sistema de quests:**
- `Quest`: pregunta o desafío. Tipo (daily, weekly, side), dificultad, conceptos asociados, XP otorgable
- `QuestVersion`: historial inmutable
- `QuestOption`: opciones de respuesta (para quests con elecciones)
- `Mission`: misión narrativa larga. Tiene capítulos
- `MissionChapter`: cada capítulo de una misión
- `UserQuestAttempt`: cada intento de respuesta
- `UserMissionProgress`: progreso del usuario en misiones

**Spaced repetition:**
- `SpacedRepetitionState`: estado FSRS por usuario y concepto (stability, difficulty, lastReview, nextReview)

**Sistema de juego:**
- `Badge`: insignia. Visual config, condición de desbloqueo, rareza
- `UserBadge`: insignias desbloqueadas por usuario
- `XPEvent`: cada otorgamiento de XP con razón
- `CoinTransaction`: cada movimiento de monedas

**Eventos:**
- `LearningEvent`: event sourcing. Cada interacción significativa como evento inmutable

**Portafolio:**
- `PortfolioEntry`: entradas auto-generadas del portafolio del usuario
- `Reflection`: reflexiones escritas por el usuario
- `ShareLink`: enlaces compartibles con config de privacidad

**Contenido pasivo:**
- `Tip`: tip estructurado (tipo, dominio, conceptos)
- `TipDelivery`: registro de envíos

**Mercado:**
- `JobOffer`: oferta de empleo curada manualmente
- `JobOfferSkill`: habilidades requeridas por la oferta
- `CompanyType`: tipo anonimizado (banca, fintech, retail)

**Comunidad:**
- `UserFollow`: seguimientos opcionales entre usuarios (sin números públicos)

Incluye índices apropiados, relaciones bien tipadas, comentarios en el schema explicando decisiones no obvias.

Crea seed inicial con:
- 1 Path "QA Path"
- 5-8 conceptos básicos de QA con sus conexiones
- 15-20 quests de ejemplo distribuidas en los conceptos
- 1 misión narrativa completa de ejemplo con 4 capítulos
- 10 badges iniciales con visuales placeholder
- Tipos de empresa básicos

### 4. Paquete `core` esqueleto

- Estructura `domain/`, `use-cases/`, `ports/`
- Entidades principales: `User`, `Concept`, `Quest`, `Mission`, `Badge`, `XPEvent`, `LearningEvent`
- Puertos iniciales:
  - `UserRepository`
  - `QuestRepository`
  - `MissionRepository`
  - `BadgeRepository`
  - `LearningEventRepository`
  - `MessagingChannel`
  - `EmailService`
  - `SpacedRepetitionScheduler`
- Casos de uso ejemplo con tests:
  - `SubmitQuestResponse`
  - `AwardXP`
  - `CheckBadgeUnlocks`
  - `AdvanceMissionChapter`

### 5. Paquete `adapters/persistence`

Implementación de repositorios con Prisma. Inyección via constructor.

### 6. Paquete `ui` (componentes compartidos)

Componentes lúdicos reusables:
- `XPBar` con animación de llenado
- `LevelBadge` con número de nivel y rareza visual
- `CoinDisplay` con ícono y número
- `BadgeIcon` componente para mostrar insignias
- `SkillNode` para nodos del skill tree
- `QuestCard` para tarjeta de quest
- `ConstanciaIndicator` (NO streak, sin ansiedad)

Cada componente con animaciones Framer Motion apropiadas y tests visuales básicos.

### 7. App `api` (Fastify)

- Fastify con TypeScript
- Validación de env vars con Zod
- Pino estructurado
- Health check endpoint
- Manejo global de errores
- Rutas modulares preparadas para crecer
- Endpoints iniciales funcionales:
  - `POST /api/quests/:id/responses` usando `SubmitQuestResponse`
  - `GET /api/users/me/dashboard` que devuelve datos del dashboard
  - `GET /api/users/me/skill-tree`
  - `GET /api/users/me/badges`
  - `POST /api/missions/:id/chapters/:n/responses`

### 8. App `worker` (BullMQ)

- Worker configurado con conexión a Redis validada
- Jobs iniciales:
  - `SendDailyQuestJob` (estructura, sin lógica completa)
  - `CheckBadgeUnlocksJob`
  - `UpdateSkillTreeJob`
- Sistema de scheduling preparado

### 9. App `web` (Next.js)

CRÍTICO: este es el lugar donde se siente el juego. Debe verse profesional pero lúdico.

**Páginas iniciales:**
- `/` — Landing con propósito claro, tono narrativo
- `/login` — Magic link + Google OAuth
- `/dashboard` — Dashboard tipo MMO con:
  - Header con nivel, XP bar, monedas, constancia
  - Banner de Quest Activa principal con animación shimmer
  - 3 tarjetas de quests (daily, weekly, side)
  - Skill tree visual interactivo
  - Grilla de insignias coleccionables (8 visibles + slots bloqueados)
  - Compañeros de ruta
- `/mission/:id` — Pantalla de misión narrativa con capítulos
- `/profile` — Configuración personal
- `/portfolio/:slug` — Portafolio público compartible
- `/skill-tree` — Vista completa del skill tree expandido
- `/badges` — Galería completa de insignias

**Componentes críticos a implementar:**
- `SkillTreeVisual`: visualización con nodos coloreados por estado, animación pulse en nodo activo, conexiones entre nodos. Usar D3 o React Flow.
- `QuestSceneCard`: la "escena" de una quest con narrativa, cliente, contexto, opciones como movimientos estratégicos
- `BadgeGrid`: grilla de insignias con gradientes únicos, slots bloqueados con curiosidad
- `MissionChapterFlow`: navegación por capítulos de una misión

**Sistema de diseño implementado:**
- Variables CSS con paleta exacta del documento maestro
- Componentes base de Shadcn/ui customizados
- Framer Motion configurado con easings personalizados
- Tema oscuro como default (sin toggle inicial)

### 10. Docker para desarrollo local

- `docker-compose.yml` con PostgreSQL y Redis
- Documentación clara en README

### 11. CI/CD básico

GitHub Actions con:
- Lint + typecheck + tests en cada PR
- Build en main
- Deploy preview en Vercel (frontend) automático

### 12. Tests

Mínimo:
- Tests unitarios del caso de uso `SubmitQuestResponse` con mocks
- Tests del caso de uso `AwardXP` con escenarios variados
- Tests del caso de uso `CheckBadgeUnlocks`
- Test de integración del endpoint `POST /api/quests/:id/responses`
- Tests visuales básicos de componentes UI clave

## Cómo entregar

Genera todo el código y la estructura. Para cada archivo:
- TypeScript estricto
- Pasa Biome
- Comentarios solo donde aportan valor
- Sigue la guía de voz en textos visibles
- Coherente con el resto del proyecto

Al final, entrega resumen de:
1. Qué archivos generaste
2. Decisiones tomadas no explícitas en este prompt (con justificación)
3. Cómo levantar el proyecto localmente paso a paso
4. Qué falta para considerar la fase 0 completa
5. Qué deberíamos hacer en la siguiente iteración
6. Screenshots/descripciones de cómo se ven las pantallas principales

## Restricciones absolutas

**No agregues features fuera del scope.** Si te tienta hacer algo más, lista la idea en el resumen pero no lo hagas.

**No uses bibliotecas no listadas** sin justificación documentada en un ADR.

**No copies código genérico.** Este proyecto tiene identidad propia (gamificado profesional).

**No agregues complejidad innecesaria.** Si algo puede ser simple, que sea simple.

**No uses:**
- Express (usar Fastify)
- Mongoose o Sequelize (usar Prisma)
- ESLint + Prettier (usar Biome)
- Jest (usar Vitest)
- CSS-in-JS pesado (usar Tailwind)
- Material UI o Ant Design (usar Shadcn/ui)
- Redux (usar TanStack Query + Zustand)
- Comic Sans o cualquier fuente decorativa
- Emojis decorativos en UI (sí íconos Tabler/Lucide)

## Lo que NO quiero ver

- Sistema de autenticación con contraseñas
- Lógica de negocio en controllers HTTP
- SQL crudo (todo vía Prisma)
- Tipos `any` sin justificación
- Strings hardcoded de configuración
- Archivos de más de 300 líneas sin razón documentada
- Documentación faltante para decisiones no obvias
- Tests que solo testean implementación, no comportamiento
- Diseño plano sin animaciones donde deberían haber
- Animaciones excesivas o agresivas
- Lenguaje escolar ("examen", "prueba", "test", "reprobaste")
- Rankings comparativos entre usuarios
- Streaks con ansiedad de pérdida
- Variable rewards manipulativos
- FOMO o urgencia tóxica

## El test final antes de entregar

Antes de considerar terminada esta entrega, asegúrate:

1. ¿Un usuario podría confundir esto con una plataforma de e-learning genérica? Si sí, falta personalidad lúdica.

2. ¿El dashboard se ve como un dashboard de banco? Si sí, falta narrativa visual.

3. ¿Las quests se sienten como tests escolares? Si sí, falta frame de aventura.

4. ¿Las insignias se ven genéricas? Si sí, falta diseño distintivo por insignia.

5. ¿La densidad informativa abruma? Si sí, falta aplicar regla de Miller.

6. ¿Falta movimiento en pantalla? Si sí, faltan animaciones de Framer Motion en momentos clave.

7. ¿Algún texto suena a profesor evaluando? Si sí, falta aplicar guía de voz.

Si todos esos checks pasan, la entrega está lista.

## Cierre

Procede con la generación. Lee primero el documento maestro completo. Si encuentras ambigüedad genuina, opta por la decisión más conservadora y documéntala en un ADR para revisarla después.

Esto es el cimiento del proyecto, no el edificio completo. Hazlo sólido, simple, honesto, y sobre todo: **hazlo que se sienta como un juego de progresión profesional, no como una plataforma de estudio**.
