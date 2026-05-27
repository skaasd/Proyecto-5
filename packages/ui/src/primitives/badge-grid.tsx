"use client";

import { BadgeIcon } from "./badge-icon.js";

type BadgeGridItem = {
  title: string;
  rarity: "common" | "rare" | "epic";
  isLocked?: boolean;
};

type BadgeGridProps = {
  badges: BadgeGridItem[];
};

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {badges.map((badge) => (
        <BadgeIcon
          isLocked={badge.isLocked}
          key={badge.title}
          rarity={badge.rarity}
          title={badge.title}
        />
      ))}
    </div>
  );
}
