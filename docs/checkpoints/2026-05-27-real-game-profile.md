# Checkpoint: perfil gamificado derivado de actividad real

Fecha: 2026-05-27 21:06:56 -04:00

## Estado

El dashboard deja de depender de `demoGameProfile` hardcodeado para XP, nivel, monedas, constancia e insignias. La web ahora consume un endpoint de API que deriva la progresion desde respuestas reales.

## Avances incluidos

- Core agrega `GetGameProfile` y calculo de progresion desde `GameActivitySnapshot`.
- La progresion considera movimientos registrados, aciertos, conceptos explorados y dias activos.
- Se derivan nivel, XP, monedas, constancia e insignias iniciales.
- Persistence agrega `PrismaGameProfileRepository` sobre `UserResponse` y conceptos asociados.
- API expone `GET /api/users/:userId/game-profile` con el mismo guard interno de usuario.
- Dashboard consume `game-profile` y usa fallback bloqueado solo si la API no responde.
- Docs HTTP incluyen el nuevo endpoint.

## Validacion

```txt
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Resultado: todo verde.

Smoke test en API actualizada:

```txt
GET http://127.0.0.1:4002/api/users/user_demo/game-profile
GET http://127.0.0.1:4002/api/questions/next?userId=user_demo
```

Ambos respondieron `200`.

## Corte porcentual

- Fase 1: 45-50%.
- MVP inicial: 60-65%.
- Proyecto completo: 25-28%.

## Proximo frente recomendado

Conectar el modo demo en memoria al mismo banco de 33 quests o levantar una base local con `prisma:seed` para que la experiencia demo muestre todo el contenido inicial.
