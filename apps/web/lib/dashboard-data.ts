import type { QuestStep, SkillTreeEdge, SkillTreeNode } from "@project-name/ui";

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
