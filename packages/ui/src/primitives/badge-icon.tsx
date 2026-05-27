"use client";

import { motion } from "framer-motion";

type BadgeIconProps = {
  title: string;
  rarity: "common" | "rare" | "epic";
  isLocked?: boolean;
};

const rarityClassName = {
  common: "border-accent-success/50 bg-accent-success/10",
  rare: "border-accent-info/50 bg-accent-info/10",
  epic: "border-accent-narrative/50 bg-accent-narrative/10",
};

export function BadgeIcon({ title, rarity, isLocked }: BadgeIconProps) {
  return (
    <motion.div
      className={`grid aspect-square place-items-center rounded-lg border p-3 text-center text-xs ${rarityClassName[rarity]} ${
        isLocked ? "opacity-45" : ""
      }`}
      whileHover={{ scale: isLocked ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-muted-foreground">{isLocked ? "Por descubrir" : title}</span>
    </motion.div>
  );
}
