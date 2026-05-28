import type { MissionMove } from "@project-name/ui";

/*
  Mock data de una misión. Temporal.
  Reemplazar getMissionData(id) por GET /api/missions/:id cuando el backend esté listo.
*/

export type MissionData = {
  chapterLabel: string;
  chapterTitle: string;
  currentChapter: number;
  totalChapters: number;
  clientName: string;
  problemTitle: string;
  problemMeta: string;
  speaker: string;
  dialog: string;
  tags: { label: string; tone: "info" | "warn" | "strategy" }[];
  prompt: string;
  moves: MissionMove[];
  rewardText: string;
  peersText: string;
};

export function getMissionData(_id: string): MissionData {
  return {
    chapterLabel: "Misión semanal",
    chapterTitle: "Bug en producción · Capítulo 2 de 4",
    currentChapter: 2,
    totalChapters: 4,
    clientName: "Cliente · Retail Marketplace SpA",
    problemTitle: "El 3% de las compras está fallando en el checkout",
    problemMeta: "Reportado hace 2 horas · perdiendo $4.2M CLP por día",
    speaker: "PM del cliente",
    dialog:
      '"El equipo de devs dice que no encuentran el bug. Lanzamos una promo importante en 6 horas y necesitamos saber si seguir o pausarla. ¿Qué pruebas haces primero para acotar el problema?"',
    tags: [
      { label: "Sin tiempo límite", tone: "info" },
      { label: "Alta presión simulada", tone: "warn" },
      { label: "Decisión de estrategia", tone: "strategy" },
    ],
    prompt: "Elige tu próximo movimiento. Cada decisión cambia el resto de la misión.",
    moves: [
      {
        id: "logs",
        title: "Revisar logs y filtrar el 3% de transacciones fallidas",
        description: "Empezar por entender el patrón. ¿Qué tienen en común esas compras fallidas?",
        style: "analytic",
        styleLabel: "ANALÍTICA",
        timeText: "~15 min",
      },
      {
        id: "smoke",
        title: "Pruebas de humo en el flujo de checkout completo",
        description:
          "Verificar manualmente que el flow básico funciona end-to-end con distintos medios de pago.",
        style: "method",
        styleLabel: "METÓDICA",
        timeText: "~30 min",
      },
      {
        id: "support",
        title: "Entrevistar a soporte: ¿qué reportan los usuarios afectados?",
        description:
          "A veces los usuarios saben cosas que los logs no muestran. Buscar el patrón humano antes del técnico.",
        style: "human",
        styleLabel: "HUMANA",
        timeText: "~20 min",
      },
      {
        id: "own",
        title: "Escribir mi propio enfoque",
        description:
          "Ninguna de las opciones refleja exactamente lo que harías. Explica tu estrategia.",
        style: "creative",
        styleLabel: "CREATIVA",
        timeText: "~10 min",
      },
    ],
    rewardText: "+180 XP · +1 caso al portafolio",
    peersText: "12 personas en esta misión ahora",
  };
}
