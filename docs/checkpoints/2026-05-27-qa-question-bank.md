# Checkpoint: banco inicial de daily quests QA

Fecha: 2026-05-27 20:40:32 -04:00

## Estado

La Fase 1 avanza con un banco inicial de contenido dentro del rango definido para el MVP: 33 daily quests de QA y 18 conceptos.

## Avances incluidos

- Se agrego `packages/db/prisma/qa-question-bank.ts` como fuente data-driven de contenido inicial.
- El seed de Prisma ahora consume ese banco, crea conceptos, preguntas, versiones y respuestas de forma idempotente.
- El seed actualiza preguntas existentes y limpia respuestas antiguas de esas preguntas para evitar mezclar opciones viejas con el nuevo banco.
- El banco cubre fundamentos QA, riesgo, criterios de aceptacion, diseno de casos, datos de prueba, bugs, API testing, automatizacion, CI, flaky tests, performance, accesibilidad, seguridad y observabilidad.

## Validacion

```txt
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Resultado: todo verde.

Tambien se valido el banco con un script puntual:

```json
{
  "questions": 33,
  "concepts": 18,
  "uniqueQuestionIds": 33,
  "missingConceptRefs": []
}
```

## Pendiente tecnico

No se pudo ejecutar `pnpm --filter @project-name/db prisma:seed` contra Postgres local porque el workspace no tiene `.env` y la URL de `.env.example` rechazo credenciales. El contenido compila y valida, pero falta cargarlo en una base local con credenciales correctas.

## Corte porcentual

- Fase 0: 90-95%.
- Fase 1: 40-45%.
- MVP inicial: 55-60%.
- Proyecto completo: 23-25%.

## Proximo frente recomendado

Conectar progresion persistida al acto de responder: XP, monedas, nivel y primeras insignias deben salir de eventos reales, no de `demoGameProfile` hardcodeado.
