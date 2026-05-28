import type { PortfolioData, PortfolioSkill } from "@/lib/portfolio-data";
import { Calendar, Mail, ShieldCheck } from "lucide-react";

const skillTone = {
  success: {
    text: "text-accent-success",
    fill: "linear-gradient(90deg,#4ADE80,#10B981)",
  },
  learning: {
    text: "text-[hsl(217_91%_66%)]",
    fill: "linear-gradient(90deg,#60A5FA,#6366F1)",
  },
} as const;

export function PortfolioView({ data }: { data: PortfolioData }) {
  return (
    <main className="mx-auto max-w-[1080px] px-5 pb-16 pt-6">
      <PortfolioHeader data={data} />
      <SkillsPanel skills={data.skills} />
      <CasesPanel data={data} />
      <ReflectionsPanel data={data} />
      <BadgesPanel data={data} />
      <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-border bg-[hsl(239_84%_67%/0.04)] px-6 py-3.5">
        <ShieldCheck
          size={16}
          className="flex-shrink-0 text-[hsl(258_90%_80%)]"
          aria-hidden="true"
        />
        <p className="text-[11px] leading-5 text-text-2">{data.trustText}</p>
      </div>
    </main>
  );
}

function PortfolioHeader({ data }: { data: PortfolioData }) {
  return (
    <header className="relative mb-3.5 overflow-hidden rounded-[18px] border border-border bg-[linear-gradient(180deg,hsl(239_84%_67%/0.07),transparent)] p-6">
      <div className="pointer-events-none absolute -top-12 right-16 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,hsl(258_90%_66%/0.12),transparent_70%)]" />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
        <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-progress font-display text-2xl font-semibold shadow-[0_6px_20px_hsl(239_84%_67%/0.3)]">
          {data.person.initials}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[22px]">{data.person.name}</h1>
            {data.person.isVerified ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-[hsl(142_69%_58%/0.3)] bg-[hsl(142_69%_58%/0.1)] px-2.5 py-1 text-[10px] font-medium text-accent-success">
                <ShieldCheck size={12} aria-hidden="true" />
                Perfil verificado
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-[13px] text-text-2">{data.person.role}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{data.person.since}</p>
        </div>
        <a
          className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          href={`mailto:${data.person.email}`}
        >
          <Mail size={15} aria-hidden="true" />
          Contactar
        </a>
      </div>
      <div className="relative mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat) => (
          <div className="rounded-[9px] bg-white/[0.03] px-3 py-2.5" key={stat.label}>
            <p className="text-[10px] uppercase tracking-[0.05em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-0.5 font-display text-lg font-semibold">
              {stat.value}{" "}
              {stat.suffix ? (
                <small className="text-[11px] font-normal text-text-4">{stat.suffix}</small>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
}

function SkillsPanel({ skills }: { skills: PortfolioSkill[] }) {
  return (
    <section className="mb-3.5 rounded-2xl border border-border bg-surface p-5">
      <SectionHeading
        meta="Auto-generado"
        subtitle="Cada habilidad respaldada por evidencia real, trazable."
        title="Mapa de habilidades"
      />
      <div className="mt-3 grid gap-3">
        {skills.map((skill) => {
          const tone = skillTone[skill.tone];

          return (
            <div className="grid items-center gap-3 md:grid-cols-[160px_1fr_70px]" key={skill.name}>
              <div>
                <p className="text-[13px] font-medium">{skill.name}</p>
                <p className={`mt-0.5 text-[11px] ${tone.text}`}>{skill.evidence}</p>
              </div>
              <div className="h-2 overflow-hidden rounded bg-surface-2">
                <div
                  className="h-full rounded"
                  style={{ width: `${skill.percent}%`, background: tone.fill }}
                />
              </div>
              <p className={`text-right text-[11px] ${tone.text}`}>{skill.percent}%</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CasesPanel({ data }: { data: PortfolioData }) {
  return (
    <section className="mb-3.5 rounded-2xl border border-border bg-surface p-5">
      <SectionHeading
        meta={`${data.cases.length + 6} casos`}
        subtitle="Situaciones reales o realistas documentadas completas, no solo respondidas."
        title="Casos resueltos"
      />
      <div className="mt-2.5 grid gap-2.5">
        {data.cases.map((item) => {
          const Icon = item.icon;
          const iconClass =
            item.iconTone === "success" ? "text-accent-success" : "text-accent-insight";

          return (
            <article
              className="cursor-pointer rounded-xl border border-border bg-surface-2 px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-border-emphasis"
              key={item.title}
            >
              <div className="flex flex-col gap-3 md:flex-row md:justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Icon size={16} className={iconClass} aria-hidden="true" />
                    <h3 className="text-[13px] font-medium">{item.title}</h3>
                  </div>
                  <p className="mb-2.5 text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        className="rounded bg-[hsl(239_84%_67%/0.1)] px-2 py-0.5 text-[10px] text-[hsl(258_90%_80%)]"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="whitespace-nowrap text-[11px] text-text-4">{item.timeText}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-3 border-t border-border pt-2.5 text-[11px] text-muted-foreground">
                {item.evidence.map((evidence) => {
                  const EvidenceIcon = evidence.icon;
                  return (
                    <span className="inline-flex items-center gap-1" key={evidence.label}>
                      <EvidenceIcon size={13} aria-hidden="true" />
                      {evidence.label}
                    </span>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
      <button
        className="mt-3 w-full rounded-lg border border-dashed border-border-emphasis px-3 py-2 text-xs text-muted-foreground"
        type="button"
      >
        Ver los 6 casos restantes
      </button>
    </section>
  );
}

function ReflectionsPanel({ data }: { data: PortfolioData }) {
  return (
    <section className="mb-3.5 rounded-2xl border border-border bg-surface p-5">
      <SectionHeading
        subtitle="Lo que cambio en mi forma de pensar mientras aprendia."
        title="Reflexiones del proceso"
      />
      <div className="mt-2.5 grid gap-2.5">
        {data.reflections.map((reflection) => (
          <blockquote
            className="rounded-r-lg border-l-2 border-accent bg-[linear-gradient(135deg,hsl(239_84%_67%/0.04),hsl(258_90%_66%/0.02))] px-4 py-3.5"
            key={reflection.quote}
          >
            <p className="text-[13px] leading-6">"{reflection.quote}"</p>
            <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar size={13} aria-hidden="true" />
              {reflection.meta}
            </p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function BadgesPanel({ data }: { data: PortfolioData }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <SectionHeading subtitle={`${data.badges.length} de 32 · compartibles`} title="Insignias" />
      <div className="mt-3 flex flex-wrap gap-2">
        {data.badges.map((badge) => {
          const Icon = badge.icon;

          return (
            <span
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-white"
              key={badge.label}
              style={{ background: badge.gradient }}
            >
              <Icon size={14} aria-hidden="true" />
              {badge.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}

function SectionHeading({
  meta,
  subtitle,
  title,
}: {
  meta?: string;
  subtitle?: string;
  title: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-[15px]">{title}</h2>
        {subtitle ? <p className="mt-1 text-[11px] text-muted-foreground">{subtitle}</p> : null}
      </div>
      {meta ? <span className="whitespace-nowrap text-[11px] text-text-4">{meta}</span> : null}
    </div>
  );
}
