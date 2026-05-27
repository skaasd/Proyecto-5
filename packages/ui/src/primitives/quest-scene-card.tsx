"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type QuestSceneCardProps = {
  eyebrow: string;
  title: string;
  reward: string;
  children: ReactNode;
};

export function QuestSceneCard({ eyebrow, title, reward, children }: QuestSceneCardProps) {
  return (
    <motion.section
      className="overflow-hidden rounded-lg border border-border bg-surface"
      whileHover={{ borderColor: "hsl(var(--border-emphasis))" }}
      transition={{ duration: 0.2 }}
    >
      <div className="border-b border-border p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">{eyebrow}</p>
            <h2 className="mt-2 text-xl font-medium">{title}</h2>
          </div>
          <div className="w-fit rounded-md border border-accent-insight/40 bg-accent-insight/10 px-3 py-2 text-xs text-foreground">
            {reward}
          </div>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}
