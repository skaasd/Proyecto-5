export type LevelProgress = {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  progressRatio: number;
};

export type GameProfile = {
  userId: string;
  level: number;
  totalXp: number;
  coins: number;
  constanciaDays: number;
};

export type GameBadge = {
  title: string;
  rarity: "common" | "rare" | "epic";
  isLocked?: boolean;
};

export type GameConceptProgress = {
  id: string;
  name: string;
  responseCount: number;
  correctCount: number;
};

export type GameSkillNode = {
  label: string;
  level: string;
  state: "mastered" | "active" | "locked";
};

export type GameActivitySnapshot = {
  userId: string;
  totalResponses: number;
  correctResponses: number;
  conceptsExplored: number;
  activeDays: number;
  concepts: GameConceptProgress[];
};

export type GameProgression = GameProfile &
  LevelProgress & {
    badges: GameBadge[];
    skillNodes: GameSkillNode[];
  };

export type XPAward = {
  userId: string;
  amount: number;
  reason: string;
  occurredAt: Date;
};

export function xpRequiredForLevel(level: number): number {
  if (level <= 1) {
    return 0;
  }

  return (level - 1) * (level - 1) * 120;
}

export function calculateLevelProgress(totalXp: number): LevelProgress {
  const safeXp = Math.max(0, totalXp);
  let level = 1;

  while (xpRequiredForLevel(level + 1) <= safeXp) {
    level += 1;
  }

  const currentLevelXp = xpRequiredForLevel(level);
  const nextLevelXp = xpRequiredForLevel(level + 1);
  const levelSpan = nextLevelXp - currentLevelXp;

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    progressRatio: levelSpan > 0 ? (safeXp - currentLevelXp) / levelSpan : 1,
  };
}

export function applyXpAward(profile: GameProfile, award: XPAward): GameProfile {
  const totalXp = profile.totalXp + Math.max(0, award.amount);
  const levelProgress = calculateLevelProgress(totalXp);

  return {
    ...profile,
    level: levelProgress.level,
    totalXp,
  };
}

export function calculateGameProgression(snapshot: GameActivitySnapshot): GameProgression {
  const totalXp =
    snapshot.totalResponses * 20 +
    snapshot.correctResponses * 15 +
    snapshot.conceptsExplored * 10 +
    snapshot.activeDays * 5;
  const coins = snapshot.totalResponses * 4 + snapshot.correctResponses * 6;
  const levelProgress = calculateLevelProgress(totalXp);

  return {
    userId: snapshot.userId,
    level: levelProgress.level,
    totalXp,
    coins,
    constanciaDays: snapshot.activeDays,
    currentLevelXp: levelProgress.currentLevelXp,
    nextLevelXp: levelProgress.nextLevelXp,
    progressRatio: levelProgress.progressRatio,
    badges: [
      {
        title: "Primer movimiento",
        rarity: "common",
        isLocked: snapshot.totalResponses < 1,
      },
      {
        title: "Senal confiable",
        rarity: "rare",
        isLocked: snapshot.correctResponses < 5,
      },
      {
        title: "Cartografo QA",
        rarity: "epic",
        isLocked: snapshot.conceptsExplored < 5,
      },
      {
        title: "Constancia inicial",
        rarity: "rare",
        isLocked: snapshot.activeDays < 3,
      },
    ],
    skillNodes: buildSkillNodes(snapshot.concepts),
  };
}

function buildSkillNodes(concepts: GameConceptProgress[]): GameSkillNode[] {
  const nodes = concepts
    .toSorted((left, right) => right.responseCount - left.responseCount)
    .slice(0, 6)
    .map((concept) => {
      const accuracy = concept.responseCount > 0 ? concept.correctCount / concept.responseCount : 0;
      const level = Math.min(5, Math.max(1, concept.responseCount));

      return {
        label: concept.name,
        level: `Nivel ${level}`,
        state: concept.responseCount >= 3 && accuracy >= 0.7 ? "mastered" : "active",
      } satisfies GameSkillNode;
    });

  if (nodes.length > 0) {
    return nodes;
  }

  return [
    { label: "Fundamentos QA", level: "Por descubrir", state: "locked" },
    { label: "Riesgo de producto", level: "Por descubrir", state: "locked" },
    { label: "Diseno de casos", level: "Por descubrir", state: "locked" },
    { label: "Automatizacion", level: "Por descubrir", state: "locked" },
  ];
}
