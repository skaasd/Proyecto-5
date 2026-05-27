"use client";

import { motion } from "framer-motion";

type XPBarProps = {
  currentXp: number;
  currentLevelXp: number;
  nextLevelXp: number;
  label?: string;
};

export function XPBar({
  currentXp,
  currentLevelXp,
  nextLevelXp,
  label = "Progreso de ruta",
}: XPBarProps) {
  const levelSpan = Math.max(1, nextLevelXp - currentLevelXp);
  const ratio = Math.min(Math.max((currentXp - currentLevelXp) / levelSpan, 0), 1);

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>
          {currentXp} / {nextLevelXp} XP
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-md border border-border bg-surface">
        <motion.div
          className="h-full rounded-md bg-accent-progress"
          initial={{ width: 0 }}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
