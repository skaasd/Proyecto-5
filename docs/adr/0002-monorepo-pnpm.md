# ADR 0002: Monorepo con pnpm Workspaces

## Contexto

El sistema tendrá frontend, API, worker, core, adaptadores y base de datos compartida.

## Decisión

Usaremos un monorepo con pnpm workspaces.

## Alternativas consideradas

- Repos separados: agregan coordinación prematura.
- npm workspaces: viable, pero pnpm ofrece instalaciones más rápidas y manejo sólido de workspaces.

## Consecuencias

Los paquetes pueden compartir tipos y casos de uso sin publicar artefactos. La CI puede ejecutar checks consistentes para todo el repo.
