# Prompt quirúrgico para Codex · Rediseño de pantallas

## Contexto

Tu generación anterior produjo una arquitectura correcta pero un diseño visual plano que no cumple la visión del proyecto. Las pantallas se sienten como e-learning aburrido, no como un juego de progresión profesional.

Te entrego el rediseño YA HECHO de dos pantallas clave (Dashboard y Misión) en el zip adjunto `rediseño_pantallas.zip`. Tu tarea NO es diseñar ni inventar. Tu tarea es **integrar exactamente estos archivos** en el proyecto existente y asegurar que compilen y funcionen.

## Regla de oro

NO modifiques el diseño, los colores, los textos, las animaciones ni la estructura de los archivos entregados. Están validados y aprobados. Tu trabajo es integración técnica, no creativo. Si algo no compila, ajusta lo mínimo necesario para que funcione SIN cambiar la apariencia.

## Archivos a integrar

Del zip, copia cada archivo a su ruta exacta en el proyecto:

| Archivo en zip | Destino en proyecto | Acción |
|---|---|---|
| `apps/web/app/globals.css` | mismo | REEMPLAZAR |
| `apps/web/app/layout.tsx` | mismo | REEMPLAZAR |
| `apps/web/tailwind.config.ts` | mismo | REEMPLAZAR |
| `apps/web/app/dashboard/page.tsx` | mismo | REEMPLAZAR |
| `apps/web/app/mission/[id]/page.tsx` | mismo | CREAR |
| `apps/web/lib/dashboard-data.ts` | mismo | CREAR |
| `apps/web/lib/mission-data.ts` | mismo | CREAR |
| `packages/ui/src/index.ts` | mismo | REEMPLAZAR |
| `packages/ui/src/primitives/skill-tree.tsx` | mismo | CREAR |
| `packages/ui/src/primitives/quest-banner.tsx` | mismo | CREAR |
| `packages/ui/src/primitives/mission-scene.tsx` | mismo | CREAR |

## Pasos exactos

### 1. Dependencias

- En `apps/web/package.json`: agregar `"framer-motion": "^11.18.2"` a dependencies si no está. `lucide-react` ya existe.
- En `packages/ui/package.json`: `framer-motion` ya está. Verificar que también tenga `lucide-react` como peerDependency si los componentes lo usan (skill-tree y otros NO usan lucide, usan SVG nativo; solo las páginas en apps/web usan lucide, así que NO hace falta en packages/ui).
- Ejecutar `pnpm install` desde la raíz.

### 2. Reemplazar y crear los archivos

Copiar literalmente el contenido de cada archivo del zip a su destino. No reescribir, no "mejorar", no reformatear.

### 3. Resolver el placeholder del nombre del paquete

Los imports usan `@project-name/ui` (el nombre actual del workspace). Verificar que coincida con el nombre real en `packages/ui/package.json`. Si el workspace se llama distinto, ajustar SOLO el string del import, nada más.

### 4. Compilar el paquete UI

```bash
pnpm --filter <nombre-ui> build
```

Si hay errores de tipos, corregir SOLO el tipo, sin tocar JSX ni estilos.

### 5. Levantar y verificar

```bash
pnpm --filter <nombre-web> dev
```

Visitar `/dashboard` y `/mission/demo`.

## Posibles ajustes técnicos permitidos

Solo estos ajustes están permitidos, y solo si son necesarios para compilar:

- Corregir rutas de import si la estructura difiere ligeramente
- Ajustar el nombre del workspace en los imports (`@project-name/*`)
- Agregar `"use client"` si falta en algún componente que use hooks o framer-motion
- Resolver conflictos de tipos de TypeScript sin cambiar la lógica visual
- Ajustar la extensión de imports (`.js` vs sin extensión) según la config del proyecto

## Ajustes PROHIBIDOS

- Cambiar colores, gradientes, tamaños, espaciados
- Cambiar textos visibles al usuario
- Eliminar o simplificar animaciones
- Reemplazar el skill tree SVG por algo más simple
- Cambiar la estructura de las páginas
- "Simplificar" los componentes
- Usar otra paleta o tipografía
- Volver al diseño plano anterior

## Validación final (ejecuta este checklist antes de entregar)

1. ¿El dashboard tiene fondo oscuro con halos de color y grano? Debe.
2. ¿La barra de XP se anima al cargar la página? Debe.
3. ¿La quest activa tiene shimmer en el paso activo? Debe.
4. ¿El skill tree tiene nodos conectados por líneas, con el nodo activo pulsando y el nodo JEFE punteado dorado? Debe.
5. ¿Las insignias tienen gradientes de colores únicos y animación de entrada? Debe.
6. ¿La página de misión muestra cliente con ícono, diálogo del PM, y 4 movimientos con estilos de color (Analítica verde, Metódica azul, Humana ámbar, Creativa rosa)? Debe.
7. ¿Al hacer clic en un movimiento se resalta? Debe.
8. ¿Los títulos usan una fuente display (Sora) distinta del cuerpo? Debe.
9. ¿NO aparece lenguaje escolar en ningún texto? Debe.
10. ¿Compila sin errores y `pnpm dev` levanta? Debe.

Si los 10 pasan, la integración está completa.

## Entrega

Al terminar, reporta:
1. Qué archivos copiaste y dónde
2. Qué ajustes técnicos mínimos necesitaste (si alguno) y por qué
3. Confirmación de los 10 puntos del checklist
4. Cualquier problema que no pudiste resolver sin cambiar el diseño (en ese caso, NO cambies el diseño, repórtalo y pregunta)

## Después de esto

Una vez integradas estas dos pantallas, las siguientes serán: portafolio público, página de login rediseñada, y conexión de los datos mock al backend real. Pero eso es en iteraciones futuras. Por ahora, solo integra estas dos pantallas perfectamente.
