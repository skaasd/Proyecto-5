"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type MoveStyle = "analytic" | "method" | "human" | "creative";

export type MissionMove = {
  id: string;
  title: string;
  description: string;
  style: MoveStyle;
  styleLabel: string; // "ANALÍTICA" etc
  timeText: string; // "~15 min"
};

export type MissionSceneProps = {
  clientName: string;
  problemTitle: string;
  problemMeta: string; // "Reportado hace 2 horas · perdiendo $4.2M CLP por día"
  speaker: string; // "PM del cliente"
  dialog: string;
  tags: { icon?: string; label: string; tone: "info" | "warn" | "strategy" }[];
  prompt: string;
  moves: MissionMove[];
  rewardText: string;
  peersText?: string;
  onSelectMove?: (id: string) => void;
};

const styleClasses: Record<MoveStyle, { icon: string; tag: string }> = {
  analytic: {
    icon: "border border-[hsl(142_69%_58%/0.3)] bg-[hsl(142_69%_58%/0.1)] text-accent-success",
    tag: "bg-[hsl(142_69%_58%/0.1)] text-accent-success",
  },
  method: {
    icon: "border border-[hsl(217_91%_60%/0.3)] bg-[hsl(217_91%_60%/0.1)] text-[hsl(217_91%_66%)]",
    tag: "bg-[hsl(217_91%_60%/0.1)] text-[hsl(217_91%_66%)]",
  },
  human: {
    icon: "border border-[hsl(38_92%_50%/0.3)] bg-[hsl(38_92%_50%/0.1)] text-accent-insight",
    tag: "bg-[hsl(38_92%_50%/0.1)] text-accent-insight",
  },
  creative: {
    icon: "border border-[hsl(330_81%_60%/0.3)] bg-[hsl(330_81%_60%/0.1)] text-accent-narrative",
    tag: "bg-[hsl(330_81%_60%/0.1)] text-accent-narrative",
  },
};

const tagTone: Record<string, string> = {
  info: "bg-[hsl(217_91%_60%/0.1)] text-[hsl(217_91%_66%)]",
  warn: "bg-[hsl(38_92%_50%/0.1)] text-accent-insight",
  strategy: "bg-[hsl(258_90%_66%/0.1)] text-[hsl(258_90%_80%)]",
};

export function MissionScene({
  clientName,
  problemTitle,
  problemMeta,
  speaker,
  dialog,
  tags,
  prompt,
  moves,
  rewardText,
  peersText,
  onSelectMove,
}: MissionSceneProps) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(id: string) {
    setSelected(id);
    onSelectMove?.(id);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      {/* head */}
      <div
        className="px-5 pb-3.5 pt-[18px]"
        style={{ background: "linear-gradient(180deg, hsl(239 84% 67% / 0.05), transparent)" }}
      >
        <div className="mb-4 flex items-center gap-3.5">
          <div
            className="relative grid h-[46px] w-[46px] flex-shrink-0 place-items-center rounded-xl"
            style={{ background: "linear-gradient(135deg, hsl(38 92% 50%), hsl(0 84% 60%))" }}
          >
            <span className="text-[22px] text-white">▲</span>
            <span className="absolute -bottom-[3px] -right-[3px] grid h-[17px] w-[17px] place-items-center rounded-full border-2 border-surface bg-accent-alert text-[11px] font-bold text-white">
              !
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-wide text-accent-insight">
              {clientName}
            </p>
            <p className="mt-0.5 text-sm font-medium">{problemTitle}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{problemMeta}</p>
          </div>
        </div>

        <div className="mb-3.5 rounded-r-lg border-l-2 border-accent bg-white/[0.03] px-[15px] py-[13px]">
          <p className="text-[12.5px] leading-relaxed text-text-2">
            <span className="font-semibold text-[hsl(239_84%_76%)]">{speaker}:</span> {dialog}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t.label}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[10px] ${tagTone[t.tone]}`}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* body */}
      <div className="px-5 pb-[18px] pt-3.5">
        <p className="mb-3.5 text-[12px] text-muted-foreground">{prompt}</p>

        {moves.map((m, i) => {
          const sc = styleClasses[m.style];
          const isSel = selected === m.id;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => handleSelect(m.id)}
              className={[
                "mb-2.5 cursor-pointer rounded-xl border bg-surface-2 px-4 py-3.5 transition-all hover:translate-x-1",
                isSel
                  ? "border-accent-progress bg-[hsl(258_90%_66%/0.08)]"
                  : "border-border hover:border-border-emphasis",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-lg ${sc.icon}`}
                >
                  <span className="text-[15px]">◆</span>
                </div>
                <div className="flex-1">
                  <p className="mb-0.5 text-[13px] font-medium">{m.title}</p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                  <span
                    className={`rounded px-[7px] py-0.5 text-[9px] font-semibold tracking-wide ${sc.tag}`}
                  >
                    {m.styleLabel}
                  </span>
                  <span className="text-[10px] text-text-4">{m.timeText}</span>
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="mt-1 flex items-start gap-2.5 rounded-lg border border-dashed border-border-emphasis bg-[hsl(239_84%_67%/0.04)] px-3.5 py-3">
          <span className="mt-0.5 flex-shrink-0 text-sm text-[hsl(239_84%_76%)]">ⓘ</span>
          <div>
            <p className="text-[12px] text-text-2">
              No hay respuesta única correcta. Cada camino te lleva a aprender algo distinto.
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Lo que importa es por qué eliges lo que eliges. Después podrás reflexionar.
            </p>
          </div>
        </div>
      </div>

      {/* foot */}
      <div className="flex items-center justify-between border-t border-border bg-white/[0.015] px-5 py-[13px]">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            {rewardText}
          </span>
          {peersText && (
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              {peersText}
            </span>
          )}
        </div>
        <button
          className="flex items-center gap-1.5 rounded-md border border-border-emphasis px-[11px] py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-text-2"
          type="button"
        >
          Guardar y seguir después
        </button>
      </div>
    </div>
  );
}
