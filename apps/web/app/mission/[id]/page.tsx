"use client";

import { MissionScene } from "@project-name/ui";
import { motion } from "framer-motion";
import { ArrowLeft, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getMissionData } from "../../../lib/mission-data";

export default function MissionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const data = getMissionData(params.id);
  const chapters = Array.from({ length: data.totalChapters }, (_, index) => index + 1);

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
          peersText={data.peersText}
        />
      </motion.div>
    </div>
  );
}
