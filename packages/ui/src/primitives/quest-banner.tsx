"use client";

import { motion } from "framer-motion";

export type QuestStep = {
  label: string;
  state: "done" | "active" | "locked";
};

export type QuestBannerProps = {
  title: string;
  description: string;
  steps: QuestStep[];
  rewardText?: string;
  unlockText?: string;
  timerText?: string;
  onContinue?: () => void;
};

export function QuestBanner({
  title,
  description,
  steps,
  rewardText,
  unlockText,
  timerText = "sin apuro · cuando quieras",
  onContinue,
}: QuestBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        background: "linear-gradient(135deg, hsl(239 84% 67% / 0.14), hsl(258 90% 66% / 0.06))",
        borderColor: "hsl(258 90% 66% / 0.3)",
      }}
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(258 90% 66% / 0.25), transparent 70%)" }}
      />

      <div className="relative flex items-center gap-2.5">
        <span className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[hsl(258_90%_80%)]">
          QUEST ACTIVA
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[hsl(258_90%_80%)]">
          {timerText}
        </span>
      </div>

      <h2 className="relative mt-2 text-xl">{title}</h2>
      <p className="relative mb-3.5 mt-1 max-w-[70%] text-[13px] leading-relaxed text-[hsl(258_90%_80%)]">
        {description}
      </p>

      <div className="relative mb-3.5 flex gap-1.5">
        {steps.map((step, i) => (
          <div
            key={step.label || "locked-step"}
            className={[
              "relative flex h-[26px] flex-1 items-center justify-center gap-1 overflow-hidden rounded-md text-[10px] font-medium",
              step.state === "done"
                ? "border border-[hsl(142_69%_58%/0.4)] bg-[hsl(142_69%_58%/0.18)] text-accent-success"
                : step.state === "active"
                  ? "animate-shimmer border border-[hsl(258_90%_66%/0.55)] bg-[hsl(258_90%_66%/0.22)] text-[hsl(258_90%_80%)]"
                  : "border border-dashed border-border-emphasis bg-white/[0.03] text-text-4",
            ].join(" ")}
          >
            <span className="relative">{step.label}</span>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 text-[11px] text-[hsl(258_90%_80%)] sm:flex-row sm:gap-4">
          {rewardText && <span>{rewardText}</span>}
          {unlockText && <span>{unlockText}</span>}
        </div>
        <button
          onClick={onContinue}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0A0B0D] transition-transform hover:-translate-y-0.5"
          type="button"
        >
          Continuar →
        </button>
      </div>
    </motion.div>
  );
}
