# API

La API HTTP vive en `apps/api` y expone rutas bajo `/api`.

## Health check

`GET /health`

Respuesta:

```json
{
  "status": "ok"
}
```

## Siguiente pregunta

`GET /api/questions/next?userId=user_123`

Respuesta:

```json
{
  "question": {
    "id": "question_123",
    "prompt": "¿Qué tipo de prueba describe mejor esta intención?",
    "type": "multiple_choice",
    "concepts": [{ "id": "concept_123", "name": "Pruebas de regresión" }],
    "answers": [{ "id": "answer_123", "text": "Prueba de regresión" }]
  }
}
```

La ruta devuelve `question: null` si no hay preguntas activas para el usuario.

## Enviar respuesta de usuario

`POST /api/responses`

Body:

```json
{
  "userId": "user_123",
  "questionId": "question_123",
  "answerId": "answer_123",
  "responseText": "Una respuesta opcional",
  "responseTimeMs": 42000,
  "attemptNumber": 1,
  "channel": "web"
}
```

La ruta valida el input con Zod y delega la lógica en el caso de uso `SubmitUserResponse`.

## Resumen de aprendizaje

`GET /api/users/:userId/overview`

Respuesta:

```json
{
  "overview": {
    "userId": "user_123",
    "totalResponses": 12,
    "correctResponses": 9,
    "accuracyRate": 0.75,
    "conceptsExplored": 5,
    "totalTimeMs": 720000,
    "lastActivityAt": "2026-05-27T12:00:00.000Z",
    "nextReviewAt": "2026-05-30T12:00:00.000Z",
    "recentResponses": []
  }
}
```

## Perfil de usuario

`GET /api/users/:userId/profile`

Respuesta:

```json
{
  "profile": {
    "id": "user_123",
    "email": "persona@example.com",
    "createdAt": "2026-05-27T10:00:00.000Z",
    "updatedAt": "2026-05-27T11:00:00.000Z",
    "preferences": {
      "questionsPerWeek": 5,
      "tipsPerWeek": 2,
      "isPaused": false
    }
  }
}
```

## Preferencias de aprendizaje

`GET /api/users/:userId/preferences`

`PATCH /api/users/:userId/preferences`

Body para actualizar ritmo:

```json
{
  "questionsPerWeek": 7,
  "tipsPerWeek": 3
}
```

`POST /api/users/:userId/pause`

Body para pausar o reanudar:

```json
{
  "isPaused": true,
  "pausedUntil": "2026-06-03T12:00:00.000Z"
}
```

`pausedUntil` es opcional.

## Exportación de datos

`GET /api/users/:userId/export`

Devuelve un JSON descargable con:

- datos básicos del usuario;
- preferencias de aprendizaje;
- respuestas registradas;
- eventos de aprendizaje;
- estados de repetición espaciada.

La respuesta incluye el header `content-disposition` para sugerir un archivo
`{userId}-learning-export.json`.
