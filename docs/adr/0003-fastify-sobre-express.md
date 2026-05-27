# ADR 0003: Fastify sobre Express

## Contexto

La API necesita buen rendimiento, tipado razonable y una estructura clara para crecer.

## Decisión

Usaremos Fastify como framework HTTP.

## Alternativas consideradas

- Express: ecosistema amplio, pero menos alineado con validación y performance modernas.
- Hono: interesante, aunque Fastify tiene un ecosistema más maduro para este caso.

## Consecuencias

La API tiene logging integrado, buen rendimiento y rutas modulares. Requiere cuidar la frontera entre handlers HTTP y casos de uso.
