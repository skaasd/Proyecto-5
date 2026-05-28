# {{PROJECT_NAME}}

Plataforma de aprendizaje y construcción de trayectoria profesional verificable.

El primer dominio de validación es QA y automatización de pruebas. La plataforma busca registrar evidencia real de aprendizaje a lo largo del tiempo, sin rankings, rachas ni lenguaje castigador.

## Stack

- Node.js 20+
- TypeScript estricto
- pnpm workspaces
- Fastify para API HTTP
- Next.js App Router para web
- Prisma y PostgreSQL
- Redis y BullMQ para trabajos
- Vitest para tests
- Biome para lint y formato

## Estructura

```txt
apps/
  api/      API Fastify
  web/      Frontend Next.js
  worker/   Workers BullMQ
packages/
  core/     Dominio, puertos y casos de uso
  db/       Prisma schema y cliente
  adapters/ Adaptadores externos reemplazables
  shared/   Utilidades compartidas
docs/
  adr/      Architecture Decision Records
```

## Desarrollo local

1. Instala dependencias:

```bash
pnpm install
```

2. Copia variables de entorno:

```bash
cp .env.example .env
```

3. Levanta PostgreSQL y Redis:

```bash
docker compose up -d
```

4. Genera el cliente Prisma:

```bash
pnpm db:generate
```

5. Ejecuta migraciones cuando existan:

```bash
pnpm db:migrate
```

6. Carga el contenido inicial:

```bash
pnpm db:seed
```

7. Levanta las apps:

```bash
pnpm dev
```

8. Encola una quest de prueba para el worker:

```bash
pnpm --filter @project-name/worker enqueue:send-question user_demo
```

## Comandos útiles

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:migrate
pnpm db:seed
```

## Principios de producto

- Trayectoria sobre estado.
- Autonomía del usuario.
- Cero competencia entre personas.
- La IA puede sugerir, pero no juzga.
- Los datos del usuario pertenecen al usuario.

## Contribuir

Antes de agregar funcionalidad, revisa `PROYECTO_MAESTRO.md` y los ADRs en `docs/adr/`. Las decisiones arquitectónicas relevantes deben quedar documentadas con contexto, decisión, alternativas y consecuencias.
