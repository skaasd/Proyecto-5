# ADR 0001: Arquitectura Hexagonal Modular

## Contexto

El proyecto necesita durar años y permitir cambios en base de datos, mensajería, email, bot e IA sin reescribir la lógica de negocio.

## Decisión

Usaremos arquitectura hexagonal modular. `packages/core` contiene dominio, puertos y casos de uso. Las aplicaciones y adaptadores dependen del core; el core no depende de detalles externos.

## Alternativas consideradas

- Monolito por capas clásico: simple al inicio, pero tiende a mezclar HTTP, persistencia y negocio.
- Arquitectura orientada a microservicios: innecesaria para el MVP y demasiado costosa operativamente.

## Consecuencias

La lógica queda testeable con mocks de puertos. Hay algo más de estructura inicial, pero evita acoplamientos caros.
