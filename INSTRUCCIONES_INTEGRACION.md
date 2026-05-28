# Instrucciones de integración

Este paquete contiene el rediseño de las pantallas **Dashboard** y **Misión** con la estética de juego validada. Reemplaza los archivos generados previamente que tenían diseño plano.

## Filosofía de esta entrega

- Los componentes nuevos están en `packages/ui/src/primitives/` y se exportan desde `packages/ui/src/index.ts`.
- Las páginas (`apps/web/app/dashboard/page.tsx` y `apps/web/app/mission/[id]/page.tsx`) ensamblan esos componentes.
- Los datos vienen de archivos mock tipados en `apps/web/lib/` (`dashboard-data.ts`, `mission-data.ts`). Cuando el backend esté listo, se reemplazan las funciones `getDashboardData()` y `getMissionData()` por llamadas al API, manteniendo los mismos tipos de retorno. Las páginas no cambian.

## Archivos en esta entrega

```
apps/web/app/globals.css                       (REEMPLAZAR)
apps/web/app/layout.tsx                         (REEMPLAZAR)
apps/web/tailwind.config.ts                     (REEMPLAZAR)
apps/web/app/dashboard/page.tsx                 (REEMPLAZAR)
apps/web/app/mission/[id]/page.tsx              (NUEVO)
apps/web/lib/dashboard-data.ts                  (NUEVO)
apps/web/lib/mission-data.ts                    (NUEVO)
packages/ui/src/index.ts                        (REEMPLAZAR)
packages/ui/src/primitives/skill-tree.tsx       (NUEVO)
packages/ui/src/primitives/quest-banner.tsx     (NUEVO)
packages/ui/src/primitives/mission-scene.tsx    (NUEVO)
```

## Pasos de integración

### 1. Dependencias

En `apps/web/package.json`, asegurar que estén:
- `framer-motion` (mover desde packages/ui o agregar también aquí): `^11.18.2`
- `lucide-react`: ya está (`^0.468.0`)

En `packages/ui/package.json` ya está `framer-motion`. Mantenerlo.

Ejecutar `pnpm install` desde la raíz.

### 2. Reemplazar archivos

Copiar cada archivo de esta entrega a su ruta correspondiente, respetando la columna REEMPLAZAR/NUEVO de arriba.

### 3. Fuentes

`layout.tsx` ahora carga Sora (display) y una sans para el cuerpo vía `next/font/google`. No requiere archivos locales. Si se desea usar Geist real en lugar del fallback, instalar `geist` y ajustar el import; el fallback actual funciona sin dependencias extra.

### 4. Verificar

```bash
pnpm --filter @project-name/ui build
pnpm --filter @project-name/web dev
```

Abrir `/dashboard` y `/mission/demo`.

## Checklist de validación visual

- [ ] El dashboard tiene fondo oscuro con halos de color sutiles y textura de grano
- [ ] La barra de XP se anima al cargar
- [ ] La quest activa tiene el shimmer en el paso "Exploratorias"
- [ ] El skill tree muestra nodos conectados, con el nodo activo pulsando
- [ ] El nodo "JEFE" aparece como rectángulo punteado dorado
- [ ] Las insignias tienen gradientes únicos y aparecen con animación spring
- [ ] La misión muestra cliente, diálogo del PM, y 4 movimientos con estilos
- [ ] Seleccionar un movimiento lo resalta
- [ ] Los textos no usan lenguaje escolar ("examen", "test", "reprobaste")

## Conexión futura al backend

Cuando los endpoints existan, en `dashboard-data.ts`:

```ts
// Reemplazar:
export function getDashboardData(): DashboardData { return { ... } }

// Por:
export async function getDashboardData(): Promise<DashboardData> {
  const res = await apiClient.get("/api/users/me/dashboard");
  return res.data;
}
```

Y en la página, convertir el componente a async server component o usar TanStack Query. El backend debe devolver la estructura tipada que define `DashboardData`.
