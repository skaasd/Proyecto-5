import type { MissionMove } from "@project-name/ui";
import { buildUserApiHeaders, getApiBaseUrl } from "./api-client";
import type { CurrentUser } from "./current-user";

/*
  Mock data de una misión. Temporal.
  Reemplazar getMissionData(id) por GET /api/missions/:id cuando el backend esté listo.
*/

export type MissionData = {
  questionId?: string;
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

type NextQuestionResponse = {
  question: {
    id: string;
    prompt: string;
    concepts: Array<{ id: string; name: string }>;
    answers: Array<{ id: string; text: string }>;
  } | null;
};

export async function getMissionDataForUser(
  id: string,
  currentUser: CurrentUser,
): Promise<MissionData> {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/api/questions/next?userId=${encodeURIComponent(currentUser.id)}`,
      {
        cache: "no-store",
        headers: buildUserApiHeaders(currentUser),
      },
    );

    if (!response.ok) {
      return getMissionData(id);
    }

    const result = (await response.json()) as NextQuestionResponse;

    if (!result.question) {
      return {
        ...getMissionData(id),
        chapterLabel: "Ruta al dia",
        chapterTitle: "No hay movimientos pendientes",
        problemTitle: "Tu bandeja de quests esta despejada",
        dialog:
          '"No tienes una pregunta pendiente ahora mismo. Puedes volver al dashboard o revisar tu portafolio."',
        prompt: "Cuando aparezca el siguiente movimiento, lo veras aqui.",
        moves: [],
        rewardText: "Sin movimientos pendientes",
        peersText: "Ruta sincronizada",
      };
    }

    return buildMissionDataFromQuestion(result.question);
  } catch {
    return getMissionData(id);
  }
}

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

function buildMissionDataFromQuestion(question: NonNullable<NextQuestionResponse["question"]>) {
  const conceptName = question.concepts[0]?.name ?? "QA";
  const styles = [
    { style: "analytic", styleLabel: "ANALITICA", timeText: "~5 min" },
    { style: "method", styleLabel: "METODICA", timeText: "~5 min" },
    { style: "human", styleLabel: "HUMANA", timeText: "~5 min" },
    { style: "creative", styleLabel: "CREATIVA", timeText: "~5 min" },
  ] as const;
  const moves = question.answers.map((answer, index) => {
    const visual = styles[index % styles.length] ?? styles[0];

    return {
      id: answer.id,
      title: answer.text,
      description: "Elige este movimiento si refleja mejor tu lectura del escenario.",
      style: visual.style,
      styleLabel: visual.styleLabel,
      timeText: visual.timeText,
    } satisfies MissionMove;
  });

  return {
    questionId: question.id,
    chapterLabel: "Movimiento sugerido",
    chapterTitle: `${conceptName} · Decision activa`,
    currentChapter: 1,
    totalChapters: Math.max(1, question.answers.length),
    clientName: "Caso QA · Backend sincronizado",
    problemTitle: conceptName,
    problemMeta: "Generado desde la API · registra evidencia al responder",
    speaker: "Escenario",
    dialog: `"${question.prompt}"`,
    tags: [
      { label: "Desde backend", tone: "info" },
      { label: "Evidencia trazable", tone: "strategy" },
      { label: "Sin tiempo limite", tone: "warn" },
    ],
    prompt: "Elige tu proximo movimiento. Se registrara como evidencia de aprendizaje.",
    moves,
    rewardText: "+30 XP · +10 monedas",
    peersText: "Sincronizado con tu ruta",
  } satisfies MissionData;
}
