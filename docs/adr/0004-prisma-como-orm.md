# ADR 0004: Prisma como ORM

## Contexto

El modelo de datos es rico y necesita relaciones claras, migraciones y cliente tipado.

## Decisión

Usaremos Prisma sobre PostgreSQL.

## Alternativas consideradas

- SQL crudo: más control, pero más riesgo de duplicar tipos y errores.
- Drizzle: opción sólida, aunque Prisma acelera el modelado inicial y la generación de cliente.

## Consecuencias

El schema Prisma será la fuente principal del modelo persistido. La lógica de negocio no dependerá directamente de Prisma; se accede por adaptadores.
