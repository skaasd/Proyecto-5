# ADR 0006: Telegraf para Bot de Telegram

## Contexto

Telegram será el primer canal activo para preguntas y respuestas fuera de la web.

## Decisión

Usaremos Telegraf como SDK para Telegram.

## Alternativas consideradas

- Llamadas directas a Telegram Bot API: menos dependencia, más código repetido.
- Otros SDKs: viables, pero Telegraf tiene adopción amplia y una API clara.

## Consecuencias

La mensajería se implementará como adaptador del puerto `MessagingChannel`. El core no conocerá Telegram ni sus tipos.
