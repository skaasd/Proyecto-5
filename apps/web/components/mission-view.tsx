"use client";

import { MissionScene } from "@project-name/ui";
import { motion } from "framer-motion";
import { ArrowLeft, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import type { MissionData } from "../lib/mission-data";

export function MissionView({ data }: { data: MissionData }) {
  const router = useRouter();
  const startedAt = useRef(Date.now());
  const [submissionState, setSubmissionState] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const chapters = Array.from({ length: data.totalChapters }, (_, index) => index + 1);
  const handleSelectMove = useCallback(
    async (answerId: string) => {
      if (!data.questionId) {
        return;
      }

      setSubmissionState("saving");

      try {
        const response = await fetch("/api/mission-response", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            questionId: data.questionId,
            answerId,
            responseTimeMs: Date.now() - startedAt.current,
          }),
        });

        setSubmissionState(response.ok ? "saved" : "error");
      } catch {
        setSubmissionState("error");
      }
    },
    [data.questionId],
  );

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-6">
      {/* top bar */}
      <div className="mb-3.5 flex items-center justify-between rounded-2xl border border-border bg-surface px-5 py-3.5">
        <div className="flex items-center gap-3.5">
          <button
            className="flex items-center gap-1 text-[12px] text-muted-foreground transition-colors hover:text-text-2"
            onClick={() => router.push("/dashboard")}
            type="button"
          >
            <ArrowLeft size={14} /> Salir
          </button>
          <div className="h-[22px] w-px bg-border-emphasis" />
          <div>
            <p className="flex items-center gap-1 text-[11px] font-medium text-[hsl(258_90%_80%)]">
              <Puzzle size={11} /> {data.chapterLabel}
            </p>
            <p className="font-display text-[13px] font-semibold">{data.chapterTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {chapters.map((n) => {
            const cls =
              n < data.currentChapter
                ? "bg-accent-success"
                : n === data.currentChapter
                  ? "bg-accent-progress"
                  : "bg-surface-2";
            return <div key={`chapter-${n}`} className={`h-1 w-[26px] rounded-sm ${cls}`} />;
          })}
          <span className="ml-1.5 text-[11px] text-muted-foreground">
            {data.currentChapter}/{data.totalChapters}
          </span>
        </div>
      </div>

      {/* scene */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <MissionScene
          clientName={data.clientName}
          problemTitle={data.problemTitle}
          problemMeta={data.problemMeta}
          speaker={data.speaker}
          dialog={data.dialog}
          tags={data.tags}
          prompt={data.prompt}
          moves={data.moves}
          rewardText={data.rewardText}
          peersText={submissionText(submissionState, data.peersText)}
          onSelectMove={handleSelectMove}
        />
      </motion.div>
    </div>
  );
}

function submissionText(state: "idle" | "saving" | "saved" | "error", fallback: string): string {
  if (state === "saving") {
    return "Registrando evidencia...";
  }

  if (state === "saved") {
    return "Movimiento registrado";
  }

  if (state === "error") {
    return "No se pudo registrar; seleccion guardada localmente";
  }

  return fallback;
}
