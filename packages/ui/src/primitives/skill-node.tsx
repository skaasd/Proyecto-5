"use client";

import { motion } from "framer-motion";

type SkillNodeState = "mastered" | "active" | "locked";

type SkillNodeProps = {
  label: string;
  level: string;
  state: SkillNodeState;
};

const stateClassName = {
  mastered: "border-accent-success/60 bg-accent-success/10 text-foreground",
  active: "border-accent-progress/70 bg-accent-progress/10 text-foreground",
  locked: "border-border bg-muted/40 text-muted-foreground",
};

const dotClassName = {
  mastered: "bg-accent-success",
  active: "bg-accent-progress",
  locked: "bg-muted-foreground",
};

export function SkillNode({ label, level, state }: SkillNodeProps) {
  return (
    <motion.div
      className={`relative min-h-24 rounded-lg border p-4 ${stateClassName[state]}`}
      animate={state === "active" ? { scale: [1, 1.015, 1] } : undefined}
      transition={
        state === "active" ? { duration: 2.4, repeat: Number.POSITIVE_INFINITY } : undefined
      }
    >
      <div className={`h-2.5 w-2.5 rounded-full ${dotClassName[state]}`} aria-hidden="true" />
      <p className="mt-4 text-sm font-medium">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{level}</p>
    </motion.div>
  );
}
