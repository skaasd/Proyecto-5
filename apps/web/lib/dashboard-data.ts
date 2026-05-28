import type { QuestStep, SkillTreeEdge, SkillTreeNode } from "@project-name/ui";
import { buildUserApiHeaders, getApiBaseUrl } from "./api-client";
import type { CurrentUser } from "./current-user";

/*
  Mock data del dashboard.
  IMPORTANTE: esto es temporal. Cuando el backend esté listo, reemplazar
  `getDashboardData()` por una llamada al endpoint GET /api/users/me/dashboard.
  Los tipos de retorno deben mantenerse iguales para que la página no cambie.
*/

export type DashboardData = {
  user: {
    name: string;
    initial: string;
    level: number;
    greeting: string;
    lastVisitNote: string;
    coins: number;
    constanciaDays: number;
    currentXp: number;
    currentLevelXp: number;
    nextLevelXp: number;
    isPaused?: boolean;
  };
  activeQuest: {
    title: string;
    description: string;
    steps: QuestStep[];
    rewardText: string;
    unlockText: string;
  };
  quests: {
    type: "daily" | "weekly" | "side";
    typeLabel: string;
    title: string;
    meta: string;
  }[];
  skillTree: {
    pathName: string;
    nodes: SkillTreeNode[];
    edges: SkillTreeEdge[];
  };
  badges: {
    unlocked: { icon: string; label: string; gradient: string }[];
    lockedSlots: number;
    totalCollected: number;
    totalBadges: number;
  };
  companions: {
    initial: string;
    name: string;
    level: number;
    activity: string;
    gradient: string;
  }[];
  companionsNewThisWeek: number;
};

type UserProfileResponse = {
  profile: {
    email: string;
    createdAt: string;
    preferences: {
      isPaused: boolean;
    };
  };
};

type LearningOverviewResponse = {
  overview: {
    totalResponses: number;
    correctResponses: number;
    conceptsExplored: number;
    totalTimeMs: number;
    lastActivityAt?: string;
    recentResponses: Array<{
      questionPrompt: string;
      outcome: "expected" | "review";
      submittedAt: string;
    }>;
  };
};

type GameProfileResponse = {
  gameProfile: {
    level: number;
    totalXp: number;
    coins: number;
    constanciaDays: number;
    currentLevelXp: number;
    nextLevelXp: number;
    badges: Array<{
      title: string;
      rarity: "common" | "rare" | "epic";
      isLocked?: boolean;
    }>;
    skillNodes: Array<{
      label: string;
      level: string;
      state: "mastered" | "active" | "locked";
    }>;
  };
};

type NextQuestionResponse = {
  question: {
    id: string;
    prompt: string;
    concepts: Array<{ id: string; name: string }>;
    answers: Array<{ id: string; text: string }>;
  } | null;
};

async function fetchUserJson<T>(currentUser: CurrentUser, path: string): Promise<T | null> {
  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      cache: "no-store",
      headers: buildUserApiHeaders(currentUser),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getDashboardDataForUser(currentUser: CurrentUser): Promise<DashboardData> {
  const [profileResponse, overviewResponse, gameProfileResponse, nextQuestionResponse] =
    await Promise.all([
      fetchUserJson<UserProfileResponse>(currentUser, `/api/users/${currentUser.id}/profile`),
      fetchUserJson<LearningOverviewResponse>(currentUser, `/api/users/${currentUser.id}/overview`),
      fetchUserJson<GameProfileResponse>(currentUser, `/api/users/${currentUser.id}/game-profile`),
      fetchUserJson<NextQuestionResponse>(
        currentUser,
        `/api/questions/next?userId=${encodeURIComponent(currentUser.id)}`,
      ),
    ]);

  return buildDashboardData({
    currentUser,
    profile: profileResponse?.profile,
    overview: overviewResponse?.overview,
    gameProfile: gameProfileResponse?.gameProfile,
    nextQuestion: nextQuestionResponse?.question,
  });
}

export function getDashboardData(): DashboardData {
  return {
    user: {
      name: "Sebastián",
      initial: "S",
      level: 4,
      greeting: "Buenas tardes",
      lastVisitNote: "Tu última visita fue hace 2 días · explorabas Pruebas de regresión",
      coins: 847,
      constanciaDays: 12,
      currentXp: 2340,
      currentLevelXp: 0,
      nextLevelXp: 3500,
      isPaused: false,
    },
    activeQuest: {
      title: "Dominar Tipos de Pruebas",
      description: "Completa 6 conceptos para desbloquear la rama de Automatización. Te faltan 2.",
      steps: [
        { label: "Casos", state: "done" },
        { label: "Tipos", state: "done" },
        { label: "Regresión", state: "done" },
        { label: "Humo", state: "done" },
        { label: "Exploratorias", state: "active" },
        { label: "", state: "locked" },
      ],
      rewardText: '+250 XP · insignia "Test Strategist"',
      unlockText: "Desbloquea: Automatización",
    },
    quests: [
      {
        type: "daily",
        typeLabel: "DIARIA",
        title: "Responde una pregunta sobre lo que ya dominas",
        meta: "3 min · +30 XP",
      },
      {
        type: "weekly",
        typeLabel: "SEMANAL",
        title: "Resuelve el caso: Bug en producción de e-commerce",
        meta: "30-60 min · +180 XP · +1 caso",
      },
      {
        type: "side",
        typeLabel: "EXPLORA",
        title: "Insight: precondiciones en casos de prueba",
        meta: "2 min · +15 XP",
      },
    ],
    skillTree: {
      pathName: "QA Path",
      nodes: [
        { id: "start", label: "Inicio", level: "★", state: "start", x: 70, y: 125 },
        { id: "casos", label: "Casos prueba", level: "V", state: "mastered", x: 160, y: 80 },
        { id: "plan", label: "Plan pruebas", level: "IV", state: "mastered", x: 160, y: 170 },
        { id: "regresion", label: "Regresión", level: "III", state: "mastered", x: 260, y: 60 },
        { id: "humo", label: "Humo", level: "II", state: "mastered", x: 260, y: 190 },
        {
          id: "exploratorias",
          label: "Exploratorias",
          level: "II",
          state: "in-progress",
          x: 270,
          y: 125,
          hint: "en curso ›",
        },
        { id: "cajanegra", label: "Caja negra", level: "I", state: "in-progress", x: 380, y: 105 },
        { id: "boss", label: "Caso final", state: "boss", x: 490, y: 80 },
        { id: "selenium", label: "Selenium", state: "locked", x: 490, y: 150 },
        { id: "automation", label: "Automation", state: "locked", x: 580, y: 120 },
      ],
      edges: [
        { from: "start", to: "casos", kind: "solid" },
        { from: "start", to: "plan", kind: "solid" },
        { from: "casos", to: "regresion", kind: "solid" },
        { from: "casos", to: "exploratorias", kind: "active" },
        { from: "plan", to: "humo", kind: "solid" },
        { from: "exploratorias", to: "cajanegra", kind: "active" },
        { from: "cajanegra", to: "boss", kind: "locked" },
        { from: "boss", to: "selenium", kind: "locked" },
        { from: "selenium", to: "automation", kind: "locked" },
      ],
    },
    badges: {
      unlocked: [
        {
          icon: "shield",
          label: "PRIMER CASO",
          gradient: "linear-gradient(135deg,#4ADE80,#10B981)",
        },
        {
          icon: "target",
          label: "10 EN FILA",
          gradient: "linear-gradient(135deg,#6366F1,#4F46E5)",
        },
        { icon: "flame", label: "CONSTANCIA", gradient: "linear-gradient(135deg,#F59E0B,#DC2626)" },
        {
          icon: "bulb",
          label: "DEEP THINKER",
          gradient: "linear-gradient(135deg,#8B5CF6,#6366F1)",
        },
        { icon: "puzzle", label: "CASO REAL", gradient: "linear-gradient(135deg,#EC4899,#BE185D)" },
        { icon: "book", label: "5 INSIGHTS", gradient: "linear-gradient(135deg,#06B6D4,#0891B2)" },
      ],
      lockedSlots: 2,
      totalCollected: 8,
      totalBadges: 32,
    },
    companions: [
      {
        initial: "M",
        name: "María L.",
        level: 5,
        activity: "Acaba de desbloquear Selenium",
        gradient: "linear-gradient(135deg,#F59E0B,#DC2626)",
      },
      {
        initial: "J",
        name: "Jorge R.",
        level: 4,
        activity: "Misma quest que tú · al 50%",
        gradient: "linear-gradient(135deg,#6366F1,#8B5CF6)",
      },
      {
        initial: "A",
        name: "Ana M.",
        level: 3,
        activity: "Compartió un caso nuevo",
        gradient: "linear-gradient(135deg,#4ADE80,#10B981)",
      },
    ],
    companionsNewThisWeek: 24,
  };
}

function buildDashboardData(input: {
  currentUser: CurrentUser;
  profile?: UserProfileResponse["profile"];
  overview?: LearningOverviewResponse["overview"];
  gameProfile?: GameProfileResponse["gameProfile"];
  nextQuestion?: NonNullable<NextQuestionResponse["question"]> | null;
}): DashboardData {
  const fallback = getDashboardData();
  const name =
    input.currentUser.name ??
    input.currentUser.email?.split("@")[0] ??
    input.profile?.email.split("@")[0] ??
    fallback.user.name;
  const initial = name.trim().charAt(0).toUpperCase() || fallback.user.initial;
  const totalResponses = input.overview?.totalResponses ?? 0;
  const conceptsExplored = input.overview?.conceptsExplored ?? 0;
  const nextConcept = input.nextQuestion?.concepts[0]?.name ?? "Pruebas de humo";
  const completedSteps = Math.min(4, Math.max(1, conceptsExplored));

  return {
    ...fallback,
    user: {
      ...fallback.user,
      name,
      initial,
      level: input.gameProfile?.level ?? fallback.user.level,
      greeting: input.currentUser.isDemo ? "Modo demo activo" : fallback.user.greeting,
      lastVisitNote: buildLastVisitNote(input.overview?.lastActivityAt, nextConcept),
      coins: input.gameProfile?.coins ?? fallback.user.coins,
      constanciaDays: input.gameProfile?.constanciaDays ?? fallback.user.constanciaDays,
      currentXp: input.gameProfile?.totalXp ?? fallback.user.currentXp,
      currentLevelXp: input.gameProfile?.currentLevelXp ?? fallback.user.currentLevelXp,
      nextLevelXp: input.gameProfile?.nextLevelXp ?? fallback.user.nextLevelXp,
      isPaused: input.profile?.preferences.isPaused ?? fallback.user.isPaused,
    },
    activeQuest: {
      title: input.nextQuestion ? `Resolver: ${nextConcept}` : fallback.activeQuest.title,
      description: input.nextQuestion?.prompt ?? fallback.activeQuest.description,
      steps: buildQuestSteps(completedSteps),
      rewardText: "+30 XP · +10 monedas",
      unlockText:
        totalResponses > 0
          ? `${totalResponses} movimientos registrados`
          : "Primer movimiento de la ruta",
    },
    quests: [
      {
        type: "daily",
        typeLabel: "DIARIA",
        title: input.nextQuestion?.prompt ?? fallback.quests[0]?.title ?? "Movimiento sugerido",
        meta: "3 min · +30 XP",
      },
      {
        type: "weekly",
        typeLabel: "SEMANAL",
        title: "Convertir decisiones en evidencia de portafolio",
        meta: `${conceptsExplored} conceptos · ${totalResponses} movimientos`,
      },
      {
        type: "side",
        typeLabel: "EXPLORA",
        title: `Insight: ${nextConcept}`,
        meta: "2 min · +15 XP",
      },
    ],
    skillTree: buildSkillTreeFromGameProfile(input.gameProfile, fallback),
    badges: buildBadges(input.gameProfile, fallback),
  };
}

function buildLastVisitNote(lastActivityAt: string | undefined, nextConcept: string): string {
  if (!lastActivityAt) {
    return `Listo para explorar ${nextConcept}`;
  }

  return `Ultimo movimiento registrado: ${new Date(lastActivityAt).toLocaleDateString("es-CL")} · ${nextConcept}`;
}

function buildQuestSteps(completedSteps: number): QuestStep[] {
  const labels = ["Casos", "Tipos", "Regresion", "Humo", "Exploratorias", ""];

  return labels.map((label, index) => {
    if (index < completedSteps) {
      return { label, state: "done" };
    }

    if (index === completedSteps) {
      return { label, state: "active" };
    }

    return { label, state: "locked" };
  });
}

function buildSkillTreeFromGameProfile(
  gameProfile: GameProfileResponse["gameProfile"] | undefined,
  fallback: DashboardData,
): DashboardData["skillTree"] {
  if (!gameProfile?.skillNodes.length) {
    return fallback.skillTree;
  }

  const nodes = fallback.skillTree.nodes.map((node) => {
    const match = gameProfile.skillNodes.find((skill) =>
      skill.label.toLowerCase().includes(node.label.toLowerCase().split(" ")[0] ?? node.label),
    );

    if (!match) {
      return node;
    }

    return {
      ...node,
      label: match.label,
      level: match.level.replace("Nivel ", ""),
      state: match.state === "active" ? "in-progress" : match.state,
      hint: match.state === "active" ? "en curso" : node.hint,
    } satisfies SkillTreeNode;
  });

  return {
    ...fallback.skillTree,
    nodes,
  };
}

function buildBadges(
  gameProfile: GameProfileResponse["gameProfile"] | undefined,
  fallback: DashboardData,
): DashboardData["badges"] {
  if (!gameProfile?.badges.length) {
    return fallback.badges;
  }

  const gradients = {
    common: "linear-gradient(135deg,#4ADE80,#10B981)",
    rare: "linear-gradient(135deg,#6366F1,#4F46E5)",
    epic: "linear-gradient(135deg,#EC4899,#BE185D)",
  } as const;
  const unlocked = gameProfile.badges
    .filter((badge) => !badge.isLocked)
    .map((badge, index) => ({
      icon: ["shield", "target", "flame", "bulb"][index % 4] ?? "shield",
      label: badge.title.toUpperCase(),
      gradient: gradients[badge.rarity],
    }));
  const lockedSlots = Math.max(0, gameProfile.badges.length - unlocked.length);

  return {
    unlocked: unlocked.length > 0 ? unlocked : fallback.badges.unlocked,
    lockedSlots,
    totalCollected: unlocked.length,
    totalBadges: gameProfile.badges.length,
  };
}
