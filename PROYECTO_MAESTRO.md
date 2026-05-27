# Documento Maestro del Proyecto

> **Nota sobre el nombre:** El proyecto aún no tiene nombre definitivo. En todo el código y la documentación se usará la variable `{{PROJECT_NAME}}` como placeholder hasta que se defina. Internamente, el repositorio puede llamarse `plataforma-aprendizaje` o similar.

---

## 1. Razón de existir del proyecto

### El problema real que existe en el mundo

El mercado profesional actual está roto en varias capas simultáneamente:

- Las universidades enseñan conocimiento genérico que rara vez se usa en el trabajo real.
- Las certificaciones se aprueban estudiando dumps de exámenes, no demostrando habilidad.
- Los CVs están inflados sistemáticamente porque el sistema premia mentir.
- Las entrevistas técnicas miden capacidad de actuar bajo presión y extroversión, no capacidad de trabajar.
- Los tests psicométricos miden cosas que no predicen desempeño real.
- La gente con síndrome del impostor (muchas veces los más competentes) pierde oportunidades frente a quienes saben venderse.
- Las empresas pierden dinero contratando personas que mintieron en sus CVs o entrevistas.
- Los introvertidos brillantes son sistemáticamente subestimados porque el sistema premia performance social, no trabajo real.

### La visión

Construir una plataforma donde el aprendizaje y la evidencia de trabajo real reemplacen al CV inflado y a la certificación memorizada. Una plataforma que:

- Mida trayectoria, no estado actual.
- Premie persistencia y mejora, no perfección inicial.
- Respete el ritmo y el modo de aprender de cada persona.
- Sea honesta sobre lo que puede y no puede medir.
- Devuelva al usuario el control sobre su propia historia profesional.
- Funcione como cartógrafo del talento, no como autoridad evaluadora.

### Lo que NO somos

- No somos una bolsa de trabajo.
- No somos una certificadora.
- No prometemos contratación.
- No garantizamos calidad de candidatos.
- No predecimos éxito laboral.
- No comparamos personas entre sí.
- No usamos rankings competitivos.
- No usamos streaks que generen ansiedad.
- No castigamos la inactividad ni la equivocación.

### Lo que SÍ somos

- Un espacio de aprendizaje continuo respetuoso del ritmo individual.
- Un sistema honesto de construcción de evidencia profesional verificable.
- Una herramienta para que las personas se autoconozcan profesionalmente.
- Una guía estructurada en medio del caos de información actual.
- Un puente entre quienes aprenden de verdad y quienes buscan ese talento.

---

## 2. Principios fundacionales (no negociables)

Estos principios guían toda decisión de producto, diseño y código. Cuando haya duda, se vuelve a estos principios.

### Principio 1: Honestidad radical
Todo lo que la plataforma muestra debe ser verificable y trazable. No prometemos lo que no podemos cumplir. Reconocemos nuestras limitaciones explícitamente.

### Principio 2: Trayectoria sobre estado
Una persona vale por su recorrido y dirección, no por dónde está hoy. El esfuerzo y la mejora son la métrica central.

### Principio 3: Autonomía del usuario
El usuario controla qué aprende, cuánto, cuándo, cómo y qué muestra al mundo. La plataforma se adapta a él, no al revés.

### Principio 4: Cero competencia entre personas
No hay rankings públicos. No hay comparaciones entre usuarios. La única comparación válida es contigo mismo en el pasado.

### Principio 5: Ningún momento se siente como castigo
El lenguaje, el diseño y las mecánicas están construidos para que cada interacción se sienta como ayuda, no como evaluación amenazante.

### Principio 6: La IA es herramienta, no juez
La IA describe y sugiere, no decide. Las decisiones objetivas se toman con lógica determinística verificable.

### Principio 7: Datos del usuario = propiedad del usuario
El usuario puede exportar, ocultar o borrar todos sus datos en cualquier momento, sin fricción.

### Principio 8: Construcción para el largo plazo
Cada decisión técnica debe ser reemplazable cuando llegue su momento. No tomamos atajos que generen deuda imposible de pagar.

### Principio 9: Calidad sobre cantidad
Mejor 10 preguntas excelentes que 100 mediocres. Mejor un dominio bien hecho que cinco a medias.

### Principio 10: Sostenibilidad personal
El proyecto se construye a un ritmo humano. No reproducimos la cultura del burnout que estamos criticando.

---

## 3. Objetivos del proyecto

### Objetivo a 3 meses (MVP funcional)
- Sistema funcionando para un solo usuario inicial (el creador).
- Dominio único: QA y automatización de pruebas.
- Bot de Telegram funcional con preguntas espaciadas.
- Plataforma web con perfil y trayectoria visibles.
- Sistema de tips por email funcionando.
- 100-150 preguntas iniciales de calidad sobre QA.
- 30-50 tips iniciales sobre QA.

### Objetivo a 6 meses (validación con usuarios reales)
- 10-20 usuarios beta del rubro QA usando el sistema.
- Mecánicas de respuesta por foto funcionando (procesamiento básico).
- Segundo dominio agregado: SQL.
- Métricas de uso y retención confiables.
- Feedback estructurado de usuarios incorporado al producto.

### Objetivo a 12 meses (preparado para abrirse)
- 100-500 usuarios activos.
- 3-4 dominios cubiertos con calidad.
- Primera versión de perfiles compartibles.
- Empresas piloto explorando uso de perfiles para contratación.
- Modelo de sostenibilidad económica definido y validado.

### Objetivo a largo plazo (3-5 años)
- Plataforma reconocida como espacio confiable de construcción de trayectoria profesional.
- Múltiples dominios técnicos cubiertos.
- Ecosistema vivo donde personas aprenden continuamente y empresas encuentran talento real.
- Sostenibilidad económica clara sin haber traicionado los principios.

---

## 4. Historias de usuario clave (priorizadas)

### Para el primer usuario (validación interna)

**HU-001: Recibir preguntas en mi ritmo**
> Como usuario, quiero configurar cuántas preguntas recibir y cuándo, para que el aprendizaje se acomode a mi vida y no al revés.

**HU-002: Responder desde donde sea**
> Como usuario, quiero responder preguntas desde Telegram, desde la web, o subiendo una foto, para usar el medio que más me acomode en cada momento.

**HU-003: Ver mi trayectoria honesta**
> Como usuario, quiero ver un mapa de cómo voy aprendiendo a lo largo del tiempo, sin notas ni rankings, solo evidencia de mi proceso real.

**HU-004: Recibir feedback útil, no juicioso**
> Como usuario, cuando me equivoco quiero entender por qué y qué explorar a continuación, sin sentir que fracasé.

**HU-005: Pausar cuando lo necesite**
> Como usuario, quiero poder pausar el envío de contenido en cualquier momento sin perder mi progreso ni recibir presión para volver.

**HU-006: Aprender de forma pasiva con tips**
> Como usuario, quiero recibir tips y "sabías que" sobre mi área de interés sin tener que hacer nada activamente, para que el aprendizaje sea parte natural de mi día.

**HU-007: Controlar mis datos**
> Como usuario, quiero poder exportar, ocultar o borrar mis datos en cualquier momento sin tener que pedirle permiso a nadie.

### Para fases posteriores

**HU-008: Compartir mi perfil con quien yo elija**
> Como usuario, quiero generar un enlace de mi perfil para compartirlo con empresas específicas, eligiendo qué mostrar y qué ocultar.

**HU-009: Practicar voluntariamente sesiones largas**
> Como usuario, cuando tengo tiempo libre quiero poder entrar a la plataforma y hacer ejercicios más profundos, no solo las preguntas cortas que me llegan.

**HU-010: Ver tiempo invertido en mi aprendizaje**
> Como usuario, quiero ver cuántas horas reales he dedicado a aprender, no como métrica de presión sino como evidencia de mi compromiso conmigo mismo.

**HU-011: Sugerir contenido a la plataforma**
> Como usuario avanzado, quiero poder sugerir preguntas o casos basados en mi experiencia real para enriquecer el banco de contenido.

**HU-012: Configurar mi perfil de privacidad**
> Como usuario, quiero decidir qué métricas son públicas, cuáles son visibles solo bajo solicitud, y cuáles son completamente privadas.

---

## 5. Requerimientos funcionales priorizados

### Bloque A: Núcleo de aprendizaje (MVP)

- **RF-A1:** El sistema debe permitir al usuario registrarse vía magic link por email o Google OAuth.
- **RF-A2:** El sistema debe permitir al usuario configurar frecuencia, canal y temas de preguntas que desea recibir.
- **RF-A3:** El sistema debe enviar preguntas al canal configurado (Telegram, email) respetando la frecuencia indicada.
- **RF-A4:** El sistema debe recibir y procesar respuestas del usuario por el mismo canal.
- **RF-A5:** El sistema debe entregar feedback inmediato cálido y educativo tras cada respuesta.
- **RF-A6:** El sistema debe implementar un algoritmo de repetición espaciada (FSRS) que decida qué pregunta enviar y cuándo.
- **RF-A7:** El sistema debe permitir al usuario pausar el envío en cualquier momento sin penalización.
- **RF-A8:** El sistema NO debe usar streaks, rankings entre usuarios ni comparaciones competitivas.

### Bloque B: Trayectoria y perfil

- **RF-B1:** El sistema debe registrar cada interacción del usuario como un evento inmutable.
- **RF-B2:** El sistema debe construir y mostrar al usuario un mapa visual de su progreso por dominio.
- **RF-B3:** El sistema debe calcular y mostrar tiempo total invertido en aprendizaje.
- **RF-B4:** El sistema debe mostrar evolución temporal del usuario (mes a mes) en cada dominio.
- **RF-B5:** El sistema debe permitir al usuario exportar todos sus datos en formato JSON.
- **RF-B6:** El sistema debe permitir al usuario borrar su cuenta y todos sus datos sin fricción.

### Bloque C: Contenido pasivo (tips)

- **RF-C1:** El sistema debe permitir al usuario suscribirse a tips por email con frecuencia configurable.
- **RF-C2:** El sistema debe almacenar tips estructurados por tipo (mito vs realidad, caso real, comparación, consejo corto).
- **RF-C3:** El sistema debe enviar tips evitando repetir contenido reciente.
- **RF-C4:** El sistema debe permitir al usuario consultar tips anteriores en cualquier momento desde la web.

### Bloque D: Plataforma web

- **RF-D1:** El sistema debe ofrecer una interfaz web donde el usuario vea su perfil completo.
- **RF-D2:** El sistema debe permitir al usuario hacer sesiones voluntarias de práctica más extensas.
- **RF-D3:** El sistema debe mostrar configuraciones claras y editables del usuario.
- **RF-D4:** El sistema debe permitir al usuario subir fotos de respuestas escritas a mano (procesamiento se agrega en fase posterior).

### Bloque E: Banco de contenido

- **RF-E1:** El sistema debe soportar preguntas con metadata rica (tema, subtema, nivel, conceptos, tipo).
- **RF-E2:** El sistema debe permitir múltiples tipos de pregunta: opción múltiple, respuesta corta, mini-ejercicio, escenario, código.
- **RF-E3:** El sistema debe versionar las preguntas y nunca borrarlas (soft delete).
- **RF-E4:** El sistema debe permitir al administrador (creador) agregar y editar contenido fácilmente.

### Bloque F: Aspectos transversales

- **RF-F1:** Todo texto del sistema debe seguir el tono definido en la guía de voz: cálido, no juicioso, informativo, respetuoso.
- **RF-F2:** El sistema debe registrar logs detallados de toda interacción para auditoría futura.
- **RF-F3:** El sistema debe ser observable (métricas, errores, performance) desde el día 1.
- **RF-F4:** El sistema debe estar preparado para internacionalización aunque arranque solo en español.

---

## 6. Requerimientos no funcionales

- **RNF-1 Privacidad:** Cumplimiento estricto con principios de privacidad. Los datos del usuario son del usuario.
- **RNF-2 Performance:** Tiempo de respuesta del bot menor a 2 segundos en el 95% de los casos.
- **RNF-3 Disponibilidad:** Objetivo de 99% de uptime una vez en producción.
- **RNF-4 Seguridad:** Autenticación robusta, secretos nunca en código, dependencias auditadas.
- **RNF-5 Escalabilidad:** Arquitectura preparada para crecer sin reescritura mayor hasta 10.000 usuarios activos.
- **RNF-6 Mantenibilidad:** Cualquier desarrollador competente debe poder entender la estructura en menos de 1 día.
- **RNF-7 Testabilidad:** Cobertura mínima de tests del 70% en lógica de negocio.
- **RNF-8 Documentación:** Cada decisión arquitectónica relevante queda registrada en un ADR.

---

## 7. Stack tecnológico definitivo

### Backend
- **Lenguaje:** TypeScript
- **Runtime:** Node.js 20+ LTS
- **Framework HTTP:** Fastify
- **ORM:** Prisma
- **Validación:** Zod
- **Testing:** Vitest
- **Linting:** Biome

### Base de datos y persistencia
- **DB principal:** PostgreSQL (vía Neon serverless)
- **Caché y colas:** Redis (vía Upstash serverless)
- **Sistema de jobs:** BullMQ sobre Redis

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** Shadcn/ui (componentes copiables, no librería atada)
- **Estado:** TanStack Query para server state, Zustand para client state

### Integraciones externas
- **Bot:** Telegram Bot API (Telegraf como SDK)
- **Email:** Resend
- **Auth:** Auth.js (NextAuth) con magic links y Google OAuth

### Despliegue
- **Frontend:** Vercel
- **Backend:** Railway (o Fly.io como alternativa)
- **Base de datos:** Neon
- **Redis:** Upstash

### Observabilidad
- **Errores:** Sentry
- **Logs:** Pino
- **Analytics:** Plausible (privacy-friendly, no Google Analytics)

### Desarrollo
- **Repositorio:** Monorepo con pnpm workspaces
- **CI/CD:** GitHub Actions
- **Versionado:** Conventional Commits + Changesets
- **Documentación:** Markdown en el repo + diagramas con Mermaid

---

## 8. Arquitectura: principios y estructura

### Filosofía arquitectónica

Arquitectura hexagonal modular. El núcleo de negocio NO depende de detalles técnicos. Los adaptadores externos (DB, Telegram, email, IA) son intercambiables.

### Estructura del monorepo

```
{{PROJECT_NAME}}/
├── apps/
│   ├── web/                    # Next.js frontend
│   ├── api/                    # Fastify backend
│   └── worker/                 # Workers de jobs (BullMQ)
├── packages/
│   ├── core/                   # Lógica de negocio pura
│   │   ├── domain/             # Entidades, value objects
│   │   ├── use-cases/          # Casos de uso
│   │   └── ports/              # Interfaces (puertos)
│   ├── adapters/               # Implementaciones concretas
│   │   ├── persistence/        # Prisma adapters
│   │   ├── messaging/          # Telegram, email
│   │   └── ai/                 # Reservado para fase 2
│   ├── shared/                 # Tipos compartidos, utilities
│   └── db/                     # Schema Prisma, migraciones
├── docs/
│   ├── adr/                    # Architecture Decision Records
│   ├── voice-guide.md          # Guía de tono y lenguaje
│   ├── content-guidelines.md   # Cómo escribir preguntas y tips
│   └── api.md                  # Documentación de API
└── PROYECTO_MAESTRO.md         # Este documento
```

### Reglas de oro arquitectónicas

1. El paquete `core` NUNCA importa de `adapters` o `apps`.
2. Toda dependencia externa (DB, HTTP, email, etc.) se accede vía interface en `ports`.
3. Toda configuración va por variables de entorno, nunca hardcoded.
4. Toda decisión arquitectónica significativa genera un ADR.
5. Ningún archivo supera las 300 líneas sin justificación documentada.

---

## 9. Guía de voz y experiencia de usuario

### Principios de UX

- **Respiración:** la plataforma debe sentirse calmada, con espacios en blanco, sin urgencia visual.
- **Calidez:** colores cálidos, tipografía amable, ilustraciones humanas.
- **Claridad:** cada pantalla tiene un foco claro, no hay sobrecarga informativa.
- **Reversibilidad:** toda acción importante se puede deshacer.
- **Transparencia:** el usuario siempre sabe qué se está midiendo y cómo.

### Principios del lenguaje

**Lo que NUNCA decimos:**
- "Reprobaste"
- "Incorrecto" (en rojo grande)
- "Has perdido tu racha"
- "Has fallado"
- "Tu nivel es..." (categórico)
- "Ranking", "puesto", "compite"
- "Apúrate", "tiempo limitado", "no te lo pierdas"

**Lo que SÍ decimos:**
- "Estás explorando..."
- "Aquí hay algo que vale la pena revisar..."
- "Tu trayectoria muestra..."
- "Cuando estés listo..."
- "Una posible mirada..."
- "Sin apuro, a tu ritmo"

### Tono general
Conversacional pero respetuoso. Cercano sin ser informal en exceso. Honesto incluso cuando es incómodo. Nunca condescendiente. Nunca infantilizante.

---

## 10. Lo que NO está en el MVP (anti-scope)

Para evitar dispersión, estas cosas NO se construyen al inicio aunque sean tentadoras:

- Sistema de pagos o suscripciones
- Dashboard para empresas
- App móvil nativa
- Integración con WhatsApp
- IA generativa (feedback con LLM)
- Matching automático con empresas
- Defensa oral por audio o video
- OCR de fotos (la subida sí, el procesamiento viene después)
- Sistema de comentarios o redes sociales
- Gamificación con badges visuales o trofeos
- Múltiples dominios al inicio (solo QA)

Estas cosas pueden venir, pero solo después de validar lo esencial.

---

## 11. Hoja de ruta de fases

### Fase 0: Setup y fundaciones (semanas 1-2)
- Repositorio inicializado con estructura definida.
- Stack técnico funcionando localmente.
- CI/CD básico configurado.
- Documentación base creada.
- ADRs iniciales redactados.

### Fase 1: Núcleo de aprendizaje (semanas 3-6)
- Modelo de datos completo en Prisma.
- API básica con Fastify funcionando.
- Algoritmo FSRS implementado y testeado.
- Bot de Telegram con onboarding y preguntas.
- Banco inicial de 30-50 preguntas de QA.

### Fase 2: Plataforma web (semanas 7-10)
- Frontend Next.js con autenticación.
- Dashboard de trayectoria visible.
- Configuración de preferencias.
- Vista de práctica voluntaria.

### Fase 3: Tips y contenido pasivo (semanas 11-13)
- Sistema de tips por email funcionando.
- Banco inicial de 30 tips.
- Newsletter configurable.

### Fase 4: Refinamiento e iteración (semanas 14-16)
- Mejoras basadas en uso propio.
- Métricas y observabilidad completas.
- Preparación para usuarios beta.

---

## 12. Cómo recuperar el proyecto si se pierde todo

Si en algún momento se pierde el contexto del proyecto (computador roto, repositorio borrado, conversaciones perdidas):

1. Este documento (PROYECTO_MAESTRO.md) tiene toda la visión y dirección.
2. Los ADRs en `/docs/adr/` tienen el porqué de cada decisión técnica.
3. El schema de Prisma en `/packages/db/schema.prisma` tiene el modelo completo de datos.
4. Los tests en cada paquete describen el comportamiento esperado.
5. El README de cada app explica cómo levantarla.

Con cualquiera de estas piezas, el proyecto se puede reconstruir.

---

## 13. Compromiso con el proyecto

Este es un proyecto personal del creador, construido a ritmo humano. No es una startup con presión de inversionistas. No es un side project para ganar dinero rápido. Es una construcción de largo plazo con propósito.

Si funciona comercialmente, excelente. Si no, sirve como portafolio profesional y como sistema personal de aprendizaje. En ambos casos, el creador gana.

La métrica de éxito principal NO es usuarios, ingresos ni crecimiento. Es: **¿esto está siendo útil de verdad para alguien?** Si la respuesta es sí, vamos por buen camino.

---

*Documento vivo. Se actualiza cuando hay cambios sustantivos en la visión o el alcance.*
*Última actualización: inicio del proyecto.*
