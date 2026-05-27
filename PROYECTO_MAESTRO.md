# Documento Maestro del Proyecto · Versión 2

> **Nota sobre el nombre:** El proyecto aún no tiene nombre definitivo. En todo el código y la documentación se usa la variable `{{PROJECT_NAME}}` como placeholder. Toda decisión sobre nombre se posterga hasta validar el producto con uso real.

> **Esta versión 2 reemplaza la v1.** Mantiene la filosofía pero amplía radicalmente el alcance del producto: ahora es una plataforma de aprendizaje gamificada profesionalmente diseñada, con portafolio verificable y conexión al mercado laboral real.

---

## 1. La visión en una línea

Una plataforma donde aprender se siente como jugar un MMO de progresión profesional, construye evidencia real de habilidades, y conecta honestamente con la demanda del mercado, todo respetando radicalmente la autonomía y el ritmo de cada persona.

## 2. El problema que existe en el mundo

El mercado profesional está roto en varias capas:

- Las universidades enseñan conocimiento genérico que rara vez se usa en el trabajo real.
- Las certificaciones se aprueban memorizando dumps, no demostrando habilidad.
- Los CVs están inflados sistemáticamente porque el sistema premia mentir.
- Las entrevistas técnicas miden actuar bajo presión y extroversión, no capacidad de trabajar.
- Los tests psicométricos miden cosas que no predicen desempeño real.
- La gente con síndrome del impostor (muchas veces los más competentes) pierde frente a quienes saben venderse.
- Las empresas pierden dinero contratando personas que mintieron en CVs o entrevistas.
- Los introvertidos brillantes son sistemáticamente subestimados porque el sistema premia performance social, no trabajo real.
- El aprendizaje profesional actual es aburrido, descontextualizado, y desconectado de lo que realmente buscan las empresas.

## 3. La solución

Una plataforma que combina cuatro pilares conectados:

**Pilar 1: Aprendizaje gamificado profesionalmente**
Mecánicas tomadas de MMOs y juegos de progresión (skill trees, quests, XP, niveles, insignias, compañeros de ruta) aplicadas a habilidades profesionales reales, sin caer en gamificación tóxica (sin leaderboards comparativos, sin streaks ansiosos, sin variable rewards manipulativos).

**Pilar 2: Portafolio verificable construido orgánicamente**
Reemplaza al CV con evidencia real generada durante el uso de la plataforma: trayectoria de aprendizaje, casos resueltos, reflexiones escritas, todo con timestamp y trazabilidad. La persona controla qué mostrar y qué ocultar.

**Pilar 3: Conexión honesta con el mercado**
Información transparente sobre qué empresas valoran cada habilidad, sin presión, sin promesas de contratación. Solo evidencia de que lo que aprendes tiene demanda real.

**Pilar 4: Experiencia respetuosa del usuario**
Tú controlas cuánto, cuándo, cómo y dónde. La plataforma se adapta a tu vida, no al revés. Cero penalizaciones, cero ansiedad, cero competencia tóxica.

## 4. Principios fundacionales (no negociables)

### Principio 1: Honestidad radical
Todo lo que la plataforma muestra es verificable y trazable. No prometemos lo que no podemos cumplir. Las limitaciones se reconocen explícitamente.

### Principio 2: Trayectoria sobre estado
Una persona vale por su recorrido y dirección, no por dónde está hoy. El esfuerzo y la mejora son la métrica central.

### Principio 3: Autonomía total del usuario
El usuario controla qué aprende, cuánto, cuándo, cómo y qué muestra al mundo. La plataforma se adapta a él.

### Principio 4: Cero competencia entre personas
No hay rankings públicos. No hay comparaciones entre usuarios. La única comparación válida es contigo mismo en el pasado.

### Principio 5: Aprender se siente como jugar
El lenguaje, los visuales, las mecánicas evocan aventura y progresión, no estudio ni evaluación.

### Principio 6: Ningún momento se siente como castigo
Cada interacción se siente como ayuda, no como evaluación amenazante. Equivocarse es información, no fracaso.

### Principio 7: La IA es herramienta, no juez
La IA describe y sugiere, no decide. Las decisiones objetivas se toman con lógica determinística verificable.

### Principio 8: Datos del usuario = propiedad del usuario
El usuario puede exportar, ocultar o borrar todos sus datos en cualquier momento, sin fricción.

### Principio 9: Construcción para el largo plazo
Cada decisión técnica debe ser reemplazable cuando llegue su momento. Arquitectura desacoplada por puertos y adaptadores donde haya variabilidad esperada.

### Principio 10: Calidad sobre cantidad
Mejor 10 quests excelentes que 100 mediocres. Mejor un dominio bien hecho que cinco a medias.

### Principio 11: Diseño profesional con alma de juego
El diseño visual es premium (tipografía disciplinada, espaciados matemáticos, paleta reducida), pero la experiencia central es lúdica (narrativa, decisiones, recompensas visibles, comunidad).

### Principio 12: Anticipación sobre nostalgia
La dopamina se libera por lo que viene, no por lo que ya pasó. Cada pantalla debe mostrar qué sigue, no solo qué fue.

## 5. Base científica del diseño

Estas decisiones están respaldadas por investigación, no son intuiciones. Cualquier cambio significativo de diseño debe respetar estos hallazgos:

**Patrones de lectura visual (Nielsen Norman Group, eye-tracking):**
- En pantallas densas, los usuarios siguen patrón F: top, segunda fila horizontal, columna izquierda.
- En pantallas con menos densidad, siguen patrón Z.
- Lo más importante va arriba-izquierda.
- Los CTAs deben estar en zonas calientes.

**Dopamina y motivación (neurociencia del aprendizaje):**
- La dopamina se libera en anticipación, no en recompensa.
- Pequeñas victorias frecuentes superan grandes victorias raras.
- Recompensas variables (no fijas) mantienen el loop activo.
- Mostrar lo que viene es más motivador que mostrar lo que pasó.

**Carga cognitiva (Miller, 1956; Cowan, 2001):**
- Máximo 4-7 elementos visibles por sección.
- Información debe agruparse en chunks visuales claros.
- Una pantalla = una decisión principal.

**Flow (Csikszentmihalyi):**
- Balance entre habilidad y desafío genera engagement óptimo.
- Si el desafío excede la habilidad: ansiedad.
- Si la habilidad excede el desafío: aburrimiento.
- El sistema debe adaptar dificultad dinámicamente.

**Diseño de progresión (estudios de MMOs):**
- Metas claras y alcanzables son críticas.
- Progresión horizontal (ramas) + vertical (niveles) cubre distintos perfiles de jugador.
- Quests diarias incrementan engagement 40%.
- Sistemas sociales incrementan retención 50%.

**Gamificación sana (vs Skinner box):**
- Las mecánicas de retención deben mejorar el bienestar, no explotarlo.
- Evitar: leaderboards comparativos, streaks ansiosos, FOMO con timers, variable rewards manipulativos.
- Buscar: insignias coleccionables, narrativa, comunidad de viaje, progresión visible.

## 6. Objetivos del proyecto

### Objetivo a 3 meses (MVP funcional)
- Sistema funcionando para 1-5 usuarios iniciales (el creador y allegados).
- Dominio único: QA y automatización de pruebas.
- Bot de Telegram funcional con quests cortas.
- Plataforma web con dashboard tipo MMO funcional.
- Sistema de tips por email funcionando.
- 100-150 preguntas iniciales (quests cortas) de calidad sobre QA.
- 5-10 casos completos (misiones largas) de QA.
- 30-50 tips iniciales sobre QA.
- 20-30 insignias diseñadas con visuales distintivos.

### Objetivo a 6 meses (validación con usuarios reales)
- 10-50 usuarios beta del rubro QA usando el sistema.
- Mecánica de respuesta por foto funcionando.
- Sistema de niveles, XP, monedas estable.
- Portafolio público compartible funcionando.
- Sección "conexión con el mercado" con datos curados manualmente.
- Segundo dominio agregado: SQL.

### Objetivo a 12 meses (preparado para escalar)
- 100-500 usuarios activos.
- 3-4 dominios cubiertos con calidad (QA, SQL, APIs REST, Selenium/automation).
- Empresas piloto explorando uso de perfiles para contratación.
- Modelo de sostenibilidad económica definido y validado.

### Objetivo a largo plazo (3-5 años)
- Plataforma reconocida como espacio confiable de construcción de trayectoria profesional gamificada.
- Múltiples dominios técnicos cubiertos.
- Ecosistema vivo donde aprendices y empresas se encuentran orgánicamente.
- Sostenibilidad económica clara sin haber traicionado los principios.

## 7. Historias de usuario clave

### Bloque A: Experiencia de juego central

**HU-A1: Sentirme como un personaje progresando**
> Como usuario quiero ver mi perfil como un personaje de juego (nivel, XP, monedas, rama elegida) para sentirme protagonista de mi propio camino profesional.

**HU-A2: Recorrer un mapa de habilidades**
> Como usuario quiero ver un skill tree visual donde mis conceptos dominados se iluminan, los próximos se sugieren y los lejanos despiertan curiosidad.

**HU-A3: Vivir misiones, no responder tests**
> Como usuario quiero que cada práctica sea una "misión" con contexto narrativo, decisiones de estrategia y consecuencias visibles, no un test académico.

**HU-A4: Coleccionar insignias visuales**
> Como usuario quiero coleccionar insignias visualmente distintivas que pueda compartir en redes sociales con orgullo.

**HU-A5: Compartir mis logros sin presión**
> Como usuario quiero poder compartir mis avances con quien yo elija, generando contenido visual atractivo, manteniendo siempre el control.

### Bloque B: Aprendizaje respetuoso

**HU-B1: Recibir quests a mi ritmo**
> Como usuario quiero configurar cuántas quests recibir y cuándo, para que el aprendizaje se acomode a mi vida.

**HU-B2: Responder desde donde sea**
> Como usuario quiero responder quests desde Telegram, web, o subiendo una foto, para usar el medio que más me acomode.

**HU-B3: Recibir feedback útil, no juicioso**
> Como usuario cuando me equivoco quiero entender por qué y qué explorar a continuación, sin sentir que fracasé.

**HU-B4: Pausar cuando lo necesite**
> Como usuario quiero pausar el envío de contenido en cualquier momento sin perder mi progreso ni recibir presión para volver.

**HU-B5: Aprender pasivamente con tips**
> Como usuario quiero recibir tips e insights sobre mi área sin tener que hacer nada activamente.

### Bloque C: Portafolio verificable

**HU-C1: Construir mi portafolio orgánicamente**
> Como usuario quiero que mi portafolio se construya solo a medida que uso la plataforma, sin tener que escribir un CV.

**HU-C2: Documentar casos resueltos**
> Como usuario quiero que cada misión completa quede en mi portafolio como evidencia trazable de mi capacidad de resolver problemas reales.

**HU-C3: Escribir reflexiones personales**
> Como usuario quiero registrar mis aprendizajes y cambios de perspectiva como parte de mi portafolio, demostrando metacognición.

**HU-C4: Compartir mi perfil con quien yo elija**
> Como usuario quiero generar enlaces de mi perfil configurables (público completo, restringido, anónimo) para compartir según contexto.

**HU-C5: Controlar mi privacidad granularmente**
> Como usuario quiero decidir qué métricas son públicas, cuáles visibles bajo solicitud, y cuáles completamente privadas.

### Bloque D: Conexión con el mercado

**HU-D1: Ver demanda real de lo que aprendo**
> Como usuario quiero ver cuántas empresas valoran las habilidades que estoy construyendo, sin presión de postular.

**HU-D2: Descubrir qué me abriría más puertas**
> Como usuario quiero saber qué habilidades adyacentes a las mías son más demandadas, para tomar decisiones informadas.

**HU-D3: Acceder a información laboral honesta**
> Como usuario quiero rangos salariales referenciales y datos reales del mercado, sin que la plataforma me prometa contratación.

### Bloque E: Comunidad sana

**HU-E1: Ver compañeros de ruta**
> Como usuario quiero saber que otros están en mi mismo camino, sin compararme competitivamente con ellos.

**HU-E2: Inspirarme con quienes van más adelante**
> Como usuario quiero ver ejemplos de personas que ya dominaron lo que estoy aprendiendo, sin que me hagan sentir atrás.

## 8. Modelo de dominio gamificado

### Conceptos centrales del juego

**Path (Ruta):** Una rama temática completa. Ej: "QA Path", "Automation Path", "SQL Path". Cada path tiene su propio skill tree y su propio orden de niveles.

**Skill Tree:** El mapa visual de conceptos dentro de un path. Nodos conectados, algunos dominados, otros en progreso, otros bloqueados.

**Concept (Concepto):** Unidad atómica de conocimiento dentro de un path. Ej: "Casos de prueba", "Pruebas de regresión", "Selenium". Cada concepto tiene niveles I-V.

**Quest (Misión):** Una unidad de práctica. Tres tipos:
- **Daily Quest:** Pregunta corta diaria. 3-5 min. +30 XP.
- **Weekly Mission:** Caso completo semanal con narrativa. 30-60 min. +180 XP + entrada al portafolio.
- **Side Quest:** Tip o insight exploratorio. 2 min. +15 XP.

**Boss Fight (Caso Final):** Misión larga al final de una rama del skill tree que requiere aplicar todos los conceptos dominados. Genera evidencia destacada en el portafolio.

**XP (Puntos de Experiencia):** Acumulables. Determinan el nivel general de la cuenta.

**Level (Nivel):** Va de 1 a 50+. No es comparativo con otros usuarios. Solo desbloquea contenido y refleja inversión.

**Coins (Monedas):** Microeconomía interna. Se ganan completando quests. Se gastan en desbloqueos opcionales (más profundidad en un tema, feedback personalizado).

**Badge (Insignia):** Logro coleccionable con visual distintivo. Algunas son por hitos, otras por estilo de juego, otras por persistencia. Compartibles a redes sociales.

**Constancia (no es streak):** Días con actividad acumulados. No se rompe por no aparecer. Solo crece. Cero ansiedad.

**Compañero de Ruta:** Otro usuario en el mismo path. Visible para inspiración y acompañamiento, jamás para competencia.

### Mecánicas de juego sanas (sí implementar)

- Progresión vertical (niveles dentro de concepto) + horizontal (elegir rama)
- Quests con narrativa y contexto real
- Decisiones con consecuencias (en lugar de "respuesta correcta única")
- Insignias coleccionables visualmente atractivas
- Visualización de progreso en skill tree
- Anticipación visible (próximo nodo, recompensa, desbloqueo)
- Comunidad como acompañamiento, no competencia
- Microeconomía interna (XP, monedas)
- Boss fights como hitos memorables
- Cinemáticas o reveals visuales al completar hitos

### Mecánicas tóxicas (NO implementar)

- Leaderboards comparativos públicos
- Streaks con ansiedad de pérdida (la racha NO se rompe nunca)
- Loot boxes con azar manipulativo
- Pay-to-win o ventajas pagadas
- Energy systems que impiden seguir jugando
- FOMO con timers de "termina en X horas"
- Variable rewards estilo casino
- Notificaciones intrusivas o agresivas
- Métricas que generen culpa por no usar la plataforma
- Comparación pública del progreso entre usuarios

## 9. Requerimientos funcionales

### Bloque A: Sistema de quests y progresión (MVP)

- **RF-A1:** Usuarios pueden registrarse vía magic link por email o Google OAuth.
- **RF-A2:** Usuarios configuran frecuencia, canal y temas de quests deseadas.
- **RF-A3:** El sistema envía daily quests al canal configurado respetando la frecuencia.
- **RF-A4:** El sistema recibe respuestas y entrega feedback inmediato narrativo.
- **RF-A5:** Algoritmo FSRS decide qué quest enviar y cuándo.
- **RF-A6:** Usuarios pausan envíos en cualquier momento sin penalización.
- **RF-A7:** El sistema otorga XP, monedas, e insignias según logros.
- **RF-A8:** El sistema NO usa streaks ansiosos, rankings comparativos, ni FOMO.

### Bloque B: Skill tree y dashboard

- **RF-B1:** El dashboard muestra el skill tree del path actual con estados visuales claros (dominado, en progreso, bloqueado).
- **RF-B2:** Usuarios alternan entre paths disponibles (al menos uno al MVP).
- **RF-B3:** Cada concepto muestra su nivel actual (I-V) y XP hacia siguiente nivel.
- **RF-B4:** Quest activa principal siempre visible con progreso y recompensa.
- **RF-B5:** Daily/Weekly/Side quests accesibles desde el dashboard.

### Bloque C: Misiones narrativas

- **RF-C1:** Misiones semanales tienen estructura narrativa de capítulos (contexto, decisión, ejecución, recomendación, post-mortem).
- **RF-C2:** Cada misión tiene "cliente" con identidad visual, problema concreto, contexto realista.
- **RF-C3:** Opciones de respuesta están enmarcadas como movimientos estratégicos con estilo (analítica, metódica, humana, creativa).
- **RF-C4:** Cuarta opción siempre disponible: "Escribir mi propio enfoque".
- **RF-C5:** Al completar una misión, se genera entrada en el portafolio del usuario.

### Bloque D: Portafolio verificable

- **RF-D1:** El sistema construye el portafolio público automáticamente a partir de la actividad del usuario.
- **RF-D2:** El portafolio muestra: identidad, mapa de habilidades, casos resueltos, reflexiones.
- **RF-D3:** Usuarios eligen qué partes son públicas, restringidas, o privadas.
- **RF-D4:** Usuarios generan enlaces compartibles configurables.
- **RF-D5:** Cada elemento del portafolio tiene timestamp y trazabilidad.

### Bloque E: Insignias coleccionables

- **RF-E1:** Sistema de 20-30 insignias iniciales con visuales únicos.
- **RF-E2:** Insignias se desbloquean por hitos diversos (no solo cantidad).
- **RF-E3:** Cada insignia es compartible a redes sociales con imagen generada.
- **RF-E4:** Hay slots de insignias bloqueadas visibles (curiosidad por completar colección).

### Bloque F: Conexión con mercado

- **RF-F1:** Sección que muestra demanda real de las habilidades que la persona está construyendo.
- **RF-F2:** Datos vienen de curaduría manual al inicio (administrador agrega ofertas semanalmente).
- **RF-F3:** Mostrar empresas anonimizadas por tipo (banca, fintech, retail, etc.) hasta tener acuerdos directos.
- **RF-F4:** Mostrar rangos salariales referenciales y nivel de match con habilidades del usuario.
- **RF-F5:** Sección es opcional (toggle ON/OFF en preferencias).
- **RF-F6:** Cero lenguaje de urgencia o presión de postular.

### Bloque G: Comunidad sana

- **RF-G1:** Mostrar "compañeros de ruta" del mismo path del usuario.
- **RF-G2:** NO mostrar rankings comparativos entre usuarios.
- **RF-G3:** Mostrar actividad reciente de la comunidad de forma narrativa ("María acaba de desbloquear Selenium").
- **RF-G4:** Posibilidad de seguir a otros usuarios de forma opcional.

### Bloque H: Aprendizaje pasivo (tips)

- **RF-H1:** Usuarios se suscriben a tips por email con frecuencia configurable.
- **RF-H2:** Tips estructurados por tipo (mito vs realidad, caso real, comparación, consejo corto).
- **RF-H3:** El sistema evita repetir contenido reciente.
- **RF-H4:** Tips consultables en cualquier momento desde la web.

### Bloque I: Aspectos transversales

- **RF-I1:** Todo texto sigue la guía de voz: cálido, narrativo, no juicioso, lúdico profesional.
- **RF-I2:** Cada interacción significativa se registra como evento inmutable.
- **RF-I3:** Usuarios exportan todos sus datos en JSON.
- **RF-I4:** Usuarios borran su cuenta sin fricción.
- **RF-I5:** Sistema preparado para internacionalización aunque arranque en español.

## 10. Requerimientos no funcionales

- **RNF-1 Privacidad:** Datos del usuario son del usuario. Exportar y borrar sin fricción.
- **RNF-2 Performance:** Respuestas del bot menores a 2 segundos en 95% de casos.
- **RNF-3 Disponibilidad:** Objetivo 99% uptime en producción.
- **RNF-4 Seguridad:** Auth robusta, secretos nunca en código, deps auditadas.
- **RNF-5 Escalabilidad:** Arquitectura preparada hasta 10.000 usuarios sin reescritura.
- **RNF-6 Mantenibilidad:** Estructura entendible en menos de 1 día por dev competente.
- **RNF-7 Testabilidad:** Cobertura mínima 70% en lógica de negocio.
- **RNF-8 Documentación:** Cada decisión arquitectónica relevante en un ADR.
- **RNF-9 Reversibilidad:** Cada decisión técnica reemplazable en menos de una semana.
- **RNF-10 Accesibilidad:** Cumplir WCAG 2.1 AA mínimo.

## 11. Stack tecnológico

### Backend
- **Lenguaje:** TypeScript estricto
- **Runtime:** Node.js 20+ LTS
- **Framework HTTP:** Fastify
- **ORM:** Prisma
- **Validación:** Zod
- **Testing:** Vitest
- **Linting:** Biome

### Base de datos y persistencia
- **DB principal:** PostgreSQL vía Neon serverless
- **Caché y colas:** Redis vía Upstash
- **Sistema de jobs:** BullMQ sobre Redis

### Frontend
- **Framework:** Next.js 14+ con App Router
- **Lenguaje:** TypeScript estricto
- **Estilos:** Tailwind CSS
- **Componentes UI:** Shadcn/ui como base, componentes propios para todo lo lúdico
- **Estado:** TanStack Query (server) + Zustand (client)
- **Animaciones:** Framer Motion (crítico para que se sienta como juego)
- **Visualizaciones:** D3.js o React Flow para el skill tree

### Integraciones externas
- **Bot:** Telegram Bot API con Telegraf
- **Email:** Resend
- **Auth:** Auth.js con magic links y Google OAuth
- **Generación de imágenes compartibles:** Satori o html-to-image

### Despliegue
- **Frontend:** Vercel
- **Backend:** Railway o Fly.io
- **Base de datos:** Neon
- **Redis:** Upstash

### Observabilidad
- **Errores:** Sentry
- **Logs:** Pino
- **Analytics:** Plausible (privacy-friendly)

### Desarrollo
- **Repositorio:** Monorepo con pnpm workspaces
- **CI/CD:** GitHub Actions
- **Versionado:** Conventional Commits + Changesets

## 12. Arquitectura

Arquitectura hexagonal modular. El núcleo de negocio NO depende de detalles técnicos. Los adaptadores externos son intercambiables.

### Estructura del monorepo

```
{{PROJECT_NAME}}/
├── apps/
│   ├── web/                      # Next.js
│   ├── api/                      # Fastify API
│   └── worker/                   # Workers BullMQ
├── packages/
│   ├── core/                     # Lógica de negocio pura
│   │   ├── src/
│   │   │   ├── domain/           # User, Concept, Quest, Badge, etc.
│   │   │   ├── use-cases/        # SubmitQuestResponse, UnlockBadge, etc.
│   │   │   └── ports/            # Interfaces
│   ├── adapters/
│   │   ├── persistence/          # Prisma adapters
│   │   ├── messaging/            # Telegram, email
│   │   └── ai/                   # Reservado fase 2
│   ├── shared/                   # Tipos y utils compartidos
│   ├── db/                       # Schema Prisma y migraciones
│   └── ui/                       # Componentes UI reutilizables
├── docs/
│   ├── adr/                      # Architecture Decision Records
│   ├── voice-guide.md            # Guía de tono y lenguaje
│   ├── visual-system.md          # Sistema de diseño
│   ├── content-guidelines.md     # Cómo crear quests, casos, tips
│   ├── badge-design-guide.md     # Cómo diseñar insignias
│   └── api.md
├── docker-compose.yml            # Postgres + Redis local
├── .env.example
├── biome.json
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
└── PROYECTO_MAESTRO.md
```

### Reglas arquitectónicas

1. El paquete `core` NUNCA importa de `adapters` o `apps`.
2. Toda dependencia externa se accede vía interface en `ports`.
3. Toda configuración por variables de entorno, nunca hardcoded.
4. Toda decisión arquitectónica significativa genera un ADR.
5. Archivos no superan 300 líneas sin justificación documentada.

## 13. Sistema de diseño visual

### Filosofía visual

Profesional como Linear/Vercel + alma de juego como un MMO premium. El diseño NO usa elementos infantiles, sí usa narrativa y progresión visible.

### Paleta

**Base oscura:**
- `#0A0B0D` — Fondo principal (casi negro, no negro)
- `#131519` — Superficies elevadas
- `#1F2329` — Bordes sutiles
- `#2A2F38` — Bordes de énfasis

**Texto:**
- `#F4F5F7` — Texto primario
- `#C9CDD6` — Texto secundario
- `#8B92A0` — Texto terciario
- `#6B7280` — Texto muted

**Colores semánticos:**
- Verde `#4ADE80` → Dominado, consolidado, positivo
- Azul/violeta `#6366F1 / #8B5CF6` → En progreso, presente, próximo
- Amarillo `#F59E0B` → Insights, contenido pasivo, calidez
- Rosa `#EC4899` → Creatividad, narrativa, casos
- Cyan `#06B6D4` → Información, datos
- Rojo suave `#DC2626` → Alertas (raro), no errores

### Tipografía

- Una sola fuente: system stack moderno (SF Pro / Segoe UI / Inter como fallback)
- Tres tamaños base: 20-22px para títulos grandes, 13-14px para títulos sección, 11-12px para metadatos
- Letter-spacing: `-0.01em` general, `-0.02em` en headings
- Dos pesos: 400 regular, 500 medium (cero 600/700)
- Sentence case siempre, nunca Title Case ni ALL CAPS (excepto badges)

### Espaciados

Múltiplos de 4px: 8, 12, 16, 20, 24, 32. Cero números arbitrarios.

### Border radius

- 6px para elementos pequeños (botones, badges)
- 8px para cards
- 10-12px para contenedores principales
- Sin border-radius en bordes de un solo lado

### Animaciones

- Lentas y deliberadas (200-400ms)
- Easing personalizado, no default
- Elementos que "respiran" cuando están activos (escala 0.98-1.02)
- Transiciones de estado suaves
- Shimmer effect en elementos "en progreso"
- Pulse en elementos que requieren atención

### Densidad informativa

- Patrón F para dashboards densos
- Patrón Z para landing pages
- Máximo 7 chunks visibles por sección (Miller)
- Información crítica arriba-izquierda
- CTAs en zonas calientes

## 14. Guía de voz

### Principios del lenguaje

**Lo que NUNCA decimos:**
- "Reprobaste", "Incorrecto", "Fallaste", "Perdiste tu racha"
- "Tu nivel es..." (categórico)
- "Ranking", "puesto", "compite"
- "Apúrate", "tiempo limitado", "no te lo pierdas"
- "Estudia", "lección", "examen", "test", "prueba" (en contexto de evaluación)

**Lo que SÍ decimos:**
- "Quest", "misión", "capítulo", "movimiento"
- "Estás explorando...", "Aquí hay algo que vale la pena revisar..."
- "Tu trayectoria muestra...", "Tu próximo paso..."
- "Sin apuro, a tu ritmo", "Cuando estés listo..."
- "Una posible mirada...", "Otros caminos válidos..."
- "Desbloqueaste...", "Ganaste...", "Encontraste..."

### Tono

Conversacional pero respetuoso. Cercano sin ser informal. Narrativo sin ser dramático. Honesto incluso cuando es incómodo. Nunca condescendiente.

Lenguaje de aventura aplicado a contexto profesional. Como si un mentor sabio te guiara por un camino, no como si un profesor te evaluara.

## 15. Lo que NO está en el MVP

- Sistema de pagos o suscripciones
- Dashboard para empresas
- App móvil nativa
- Integración con WhatsApp
- IA generativa (feedback con LLM)
- Matching automático con empresas
- Defensa oral por audio o video
- OCR de fotos (la subida sí, el procesamiento viene después)
- Sistema de comentarios o foros
- Más de un dominio inicial (solo QA)
- Múltiples idiomas (solo español inicialmente)

## 16. Fases de implementación

### Fase 0: Setup y fundaciones (semanas 1-2)
- Repositorio inicializado con estructura definida
- Stack técnico funcionando localmente
- CI/CD básico configurado
- ADRs iniciales
- Sistema de diseño documentado

### Fase 1: Núcleo de aprendizaje gamificado (semanas 3-8)
- Modelo de datos completo en Prisma
- API con Fastify
- Algoritmo FSRS implementado
- Sistema de XP, niveles, monedas, insignias
- Bot de Telegram con onboarding lúdico
- Banco inicial de 30-50 daily quests sobre QA
- Dashboard web con skill tree visual

### Fase 2: Misiones narrativas (semanas 9-12)
- Estructura de misiones con capítulos
- 5-10 misiones completas de QA con narrativa
- Sistema de generación de entradas al portafolio
- Visualizaciones de progreso de misión

### Fase 3: Portafolio público (semanas 13-16)
- Página de perfil público
- Sistema de enlaces compartibles
- Generación de imágenes compartibles de insignias
- Privacidad granular

### Fase 4: Conexión con mercado (semanas 17-20)
- Sección de demanda de mercado
- Sistema de curaduría manual de ofertas
- Match de habilidades con ofertas

### Fase 5: Refinamiento (semanas 21-24)
- Tips por email
- Comunidad de compañeros de ruta
- Métricas y observabilidad completas
- Preparación para usuarios beta abiertos

## 17. Compromiso con el proyecto

Este es un proyecto personal del creador, construido a ritmo humano. No es una startup con presión de inversionistas. Es una construcción de largo plazo con propósito.

Si funciona comercialmente, excelente. Si no, sirve como portafolio profesional del creador y como sistema personal de aprendizaje. En ambos casos, el creador gana.

La métrica de éxito principal NO es usuarios, ingresos, ni crecimiento. Es: **¿esto está siendo útil de verdad para alguien, incluyendo al creador mismo?**

---

*Documento vivo. Se actualiza cuando hay cambios sustantivos en la visión o el alcance.*
*Última actualización: tras conversación sobre experiencia de juego completa.*
