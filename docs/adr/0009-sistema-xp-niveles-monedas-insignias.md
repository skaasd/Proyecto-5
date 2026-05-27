# ADR 0009: sistema XP, niveles, monedas e insignias

## Estado

Aceptada.

## Contexto

V2 cambia el eje del producto hacia progresión profesional gamificada. La plataforma necesita un modelo simple que muestre avance sin competir entre personas ni castigar pausas.

## Decisión

El core incorporará primitivas de progresión: XP total, nivel, monedas, constancia acumulativa e insignias. La curva inicial de nivel será determinística y suave, con `xpRequiredForLevel(level) = (level - 1)^2 * 120`.

## Consecuencias

- El avance puede explicarse y testearse sin depender de infraestructura.
- La curva puede ajustarse más adelante con una migración documentada.
- Constancia no es una racha: solo acumula días con actividad y nunca se rompe por ausencia.
