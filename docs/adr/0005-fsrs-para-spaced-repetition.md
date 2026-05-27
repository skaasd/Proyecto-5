# ADR 0005: FSRS para Repetición Espaciada

## Contexto

El aprendizaje debe adaptarse al recuerdo real del usuario sin convertirlo en castigo ni juego competitivo.

## Decisión

Usaremos FSRS como base del planificador de repetición espaciada.

## Alternativas consideradas

- SM-2: simple y conocido, pero menos flexible.
- Reglas manuales propias: rápidas de escribir, difíciles de validar y ajustar.

## Consecuencias

El estado de repetición guardará estabilidad, dificultad, última revisión y próxima revisión. El algoritmo se mantendrá detrás de un puerto para poder ajustar o reemplazar la implementación.
