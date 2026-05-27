# ADR 0007: Schema Prisma único para la fase inicial

## Contexto

El modelo inicial incluye aprendizaje, contenido versionado, eventos, repetición espaciada, tips, sesiones, tracking de tiempo y tablas requeridas por Auth.js. Prisma valida de forma más confiable un único `schema.prisma` en esta fase.

## Decisión

Mantendremos el schema completo en `packages/db/prisma/schema.prisma`, aunque supere levemente las 300 líneas.

## Alternativas consideradas

- Dividir el schema en múltiples archivos: reduce tamaño por archivo, pero depende de soporte y configuración adicional de Prisma.
- Quitar modelos de Auth.js: deja el login configurado pero incompleto.

## Consecuencias

El archivo es más largo que lo ideal, pero preserva consistencia y validación. Si el schema crece mucho más, se revisará la división con soporte oficial de Prisma y se documentará el cambio.
