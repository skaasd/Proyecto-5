"use client";

import { QuestBanner, SkillTree, SkillTreeLegend } from "@project-name/ui";
import { motion } from "framer-motion";
import {
  BookOpen,
  Coins,
  Compass,
  Flame,
  Lightbulb,
  Lock,
  Pause,
  Puzzle,
  Share2,
  Shield,
  Sun,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { DashboardData } from "../lib/dashboard-data";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield size={19} />,
  target: <Target size={19} />,
  flame: <Flame size={19} />,
  bulb: <Lightbulb size={19} />,
  puzzle: <Puzzle size={19} />,
  book: <BookOpen size={19} />,
};

const questTagClass: Record<string, string> = {
  daily: "bg-[hsl(142_69%_58%/0.12)] text-accent-success",
  weekly: "bg-[hsl(239_84%_67%/0.12)] text-[hsl(239_84%_76%)]",
  side: "bg-[hsl(38_92%_50%/0.12)] text-accent-insight",
};

const questIcon: Record<string, React.ReactNode> = {
  daily: <Sun size={15} className="text-accent-insight" />,
  weekly: <Puzzle size={15} className="text-[hsl(239_84%_76%)]" />,
  side: <Compass size={15} className="text-accent-insight" />,
};
const lockedBadgeSlotKeys = [
  "locked-slot-1",
  "locked-slot-2",
  "locked-slot-3",
  "locked-slot-4",
  "locked-slot-5",
  "locked-slot-6",
  "locked-slot-7",
  "locked-slot-8",
];

export function DashboardView({ data }: { data: DashboardData }) {
  const router = useRouter();
  const [xpWidth, setXpWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(Boolean(data.user.isPaused));
  const [pauseState, setPauseState] = useState<"idle" | "saving" | "error">("idle");

  const xpRatio =
    (data.user.currentXp - data.user.currentLevelXp) /
    Math.max(1, data.user.nextLevelXp - data.user.currentLevelXp);

  useEffect(() => {
    const t = setTimeout(() => setXpWidth(xpRatio * 100), 200);
    return () => clearTimeout(t);
  }, [xpRatio]);

  async function togglePause() {
    const next = !isPaused;
    setPauseState("saving");

    try {
      const response = await fetch("/api/learning-pause", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ isPaused: next }),
      });

      if (!response.ok) {
        setPauseState("error");
        return;
      }

      setIsPaused(next);
      setPauseState("idle");
    } catch {
      setPauseState("error");
    }
  }

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-6">
      {/* hero bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-3.5 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="relative grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-gradient-to-br from-accent to-accent-progress font-display text-lg font-semibold shadow-[0_4px_14px_hsl(239_84%_67%/0.3)]">
            {data.user.initial}
            <span className="absolute -bottom-1.5 -right-1.5 rounded-md border-2 border-background bg-accent-insight px-1.5 text-[10px] font-bold text-[#1a1205]">
              Nv {data.user.level}
            </span>
          </div>
          <div>
            <p className="text-[11px] font-medium text-[hsl(258_90%_80%)]">{data.user.greeting}</p>
            <h2 className="text-[17px]">{data.user.name}</h2>
            <p className="mt-0.5 text-[12px] text-muted-foreground">{data.user.lastVisitNote}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-[9px] border border-[hsl(38_92%_50%/0.22)] bg-[hsl(38_92%_50%/0.1)] px-3 py-[7px] text-[13px] font-medium text-accent-insight">
            <Coins size={14} /> {data.user.coins}
          </div>
          <div className="flex items-center gap-1.5 rounded-[9px] border border-[hsl(142_69%_58%/0.22)] bg-[hsl(142_69%_58%/0.1)] px-3 py-[7px] text-[13px] font-medium text-accent-success">
            <Flame size={14} /> {data.user.constanciaDays} días
          </div>
          <button
            className="flex items-center gap-1.5 rounded-md border border-border-emphasis px-3 py-[7px] text-[11px] text-muted-foreground transition-colors hover:text-text-2"
            onClick={togglePause}
            type="button"
          >
            <Pause size={13} /> {pauseButtonText(isPaused, pauseState)}
          </button>
        </div>
      </motion.div>

      {/* xp row */}
      <div className="mb-3.5 flex items-center gap-3.5 rounded-2xl border border-border bg-surface px-5 py-3">
        <span className="whitespace-nowrap font-display text-[13px] font-semibold text-text-2">
          Nivel {data.user.level}
        </span>
        <div className="relative h-2 flex-1 overflow-hidden rounded-[5px] bg-surface-2">
          <motion.div
            className="relative h-full rounded-[5px]"
            style={{ background: "linear-gradient(90deg, hsl(38 92% 50%), #F97316)" }}
            animate={{ width: `${xpWidth}%` }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="whitespace-nowrap text-[12px] font-semibold text-accent-insight">
          {data.user.currentXp.toLocaleString("es")} / {data.user.nextLevelXp.toLocaleString("es")}{" "}
          XP
        </span>
      </div>

      {/* active quest */}
      <div className="mb-3.5">
        <QuestBanner
          title={data.activeQuest.title}
          description={data.activeQuest.description}
          steps={data.activeQuest.steps}
          rewardText={data.activeQuest.rewardText}
          unlockText={data.activeQuest.unlockText}
          onContinue={() => router.push("/mission/demo")}
        />
      </div>

      {/* quest cards */}
      <div className="mb-3.5 grid gap-3 sm:grid-cols-3">
        {data.quests.map((q, i) => (
          <motion.div
            key={q.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
            className="cursor-pointer rounded-[13px] border border-border bg-surface px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-border-emphasis hover:bg-surface-2"
          >
            <div className="mb-2.5 flex items-start justify-between">
              <span
                className={`rounded-[5px] px-2 py-0.5 text-[9px] font-semibold tracking-wider ${questTagClass[q.type]}`}
              >
                {q.typeLabel}
              </span>
              {questIcon[q.type]}
            </div>
            <h3 className="text-[13px] font-medium leading-snug">{q.title}</h3>
            <p className="mt-2 text-[10px] text-muted-foreground">{q.meta}</p>
          </motion.div>
        ))}
      </div>

      {/* skill tree */}
      <div className="mb-3.5 rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px]">Tu mapa del {data.skillTree.pathName}</h3>
          <div className="flex gap-1.5">
            <button
              className="rounded-md border border-[hsl(258_90%_66%/0.35)] bg-[hsl(239_84%_67%/0.12)] px-[11px] py-1 text-[11px] text-[hsl(258_90%_80%)]"
              type="button"
            >
              QA Path
            </button>
            <button
              className="rounded-md border border-border px-[11px] py-1 text-[11px] text-muted-foreground"
              type="button"
            >
              Automation
            </button>
          </div>
        </div>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Toca un nodo para explorarlo · las ramas se desbloquean al avanzar
        </p>
        <div className="mt-2">
          <SkillTree nodes={data.skillTree.nodes} edges={data.skillTree.edges} />
        </div>
        <SkillTreeLegend />
      </div>

      {/* badges + companions */}
      <div className="grid gap-3.5 lg:grid-cols-[1.3fr_1fr]">
        {/* badges */}
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px]">Insignias</h3>
            <button
              className="flex items-center gap-1.5 rounded-md border border-border-emphasis px-[11px] py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-text-2"
              onClick={() => router.push("/portfolio")}
              type="button"
            >
              <Share2 size={12} /> Compartir
            </button>
          </div>
          <p className="mb-3.5 mt-0.5 text-[11px] text-muted-foreground">
            {data.badges.totalCollected} de {data.badges.totalBadges} coleccionadas
          </p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {data.badges.unlocked.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl p-1 transition-transform hover:-translate-y-1 hover:scale-105"
                style={{ background: b.gradient }}
              >
                <span className="text-white">{iconMap[b.icon]}</span>
                <small className="mt-1 text-center text-[7.5px] font-semibold leading-tight tracking-wide text-white">
                  {b.label}
                </small>
              </motion.div>
            ))}
            {lockedBadgeSlotKeys.slice(0, data.badges.lockedSlots).map((key) => (
              <div
                key={key}
                className="flex aspect-square flex-col items-center justify-center rounded-xl border border-dashed border-border-emphasis bg-white/[0.03] p-1"
              >
                <Lock size={16} className="text-text-4" />
              </div>
            ))}
          </div>
        </div>

        {/* companions */}
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px]">Compañeros de ruta</h3>
            <span className="text-[11px] text-accent-success">
              +{data.companionsNewThisWeek} esta semana
            </span>
          </div>
          <p className="mb-2 mt-0.5 text-[11px] text-muted-foreground">
            Otros explorando el {data.skillTree.pathName}
          </p>
          {data.companions.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2.5 border-b border-border py-2.5 last:border-none"
            >
              <div
                className="grid h-[30px] w-[30px] flex-shrink-0 place-items-center rounded-full font-display text-[12px] font-semibold text-white"
                style={{ background: c.gradient }}
              >
                {c.initial}
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-[12px] font-medium">
                  {c.name}
                  <span className="text-muted-foreground">Nv {c.level}</span>
                </div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{c.activity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function pauseButtonText(isPaused: boolean, state: "idle" | "saving" | "error"): string {
  if (state === "saving") {
    return "Guardando";
  }

  if (state === "error") {
    return "Reintentar";
  }

  return isPaused ? "Reanudar" : "Pausar";
}
