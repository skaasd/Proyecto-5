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
