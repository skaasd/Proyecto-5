# Checkpoint: base de perfil y usuario actual

Fecha: 2026-05-27 17:12:31 -04:00

## Estado

La plataforma queda con dashboard demo funcional, exportación de datos y una primera base de perfil conectada al usuario actual.

## Avances incluidos

- El dashboard usa `getCurrentUser()` y deja de depender directamente de `user_demo`.
- Se mantiene fallback demo local con `DEMO_USER_ID=user_demo`.
- La API expone `GET /api/users/:userId/profile`.
- El core incluye el caso de uso `GetUserProfile`.
- La web incluye la página `/profile` con identidad, contacto, ritmo y exportación.
- La documentación HTTP lista rutas principales de preguntas, respuestas, perfil, preferencias y exportación.

## Validación

```txt
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Resultado: todo verde.

## Próximo frente recomendado

Proteger rutas de API contra acceso cruzado entre usuarios reales. La web ya conoce el usuario actual, pero la API todavía acepta `userId` por parámetro sin verificar identidad autenticada.
