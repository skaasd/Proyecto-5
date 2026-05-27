# ADR 0008: Framer Motion para experiencia de juego

## Estado

Aceptada.

## Contexto

La versión 2 del producto exige que la interfaz se sienta como progresión profesional con alma de juego, no como un dashboard estático. Necesitamos animaciones pequeñas, predecibles y testeables para comunicar progreso, foco y desbloqueos.

## Decisión

Usaremos Framer Motion en los componentes lúdicos compartidos del paquete `@project-name/ui`.

## Consecuencias

- Los componentes de progreso pueden animar cambios de XP, nivel e insignias sin lógica repetida en cada app.
- El paquete `ui` debe declararse como componente cliente cuando use animaciones.
- Las animaciones deben ser deliberadas, de baja intensidad y coherentes con la guía visual.
