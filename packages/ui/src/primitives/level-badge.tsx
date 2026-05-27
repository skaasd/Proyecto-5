"use client";

import { motion } from "framer-motion";

type LevelBadgeProps = {
  level: number;
  label?: string;
};

export function LevelBadge({ level, label = "Nivel" }: LevelBadgeProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 rounded-md border border-border-emphasis bg-surface px-3 py-2 text-sm"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{level}</span>
    </motion.div>
  );
}
