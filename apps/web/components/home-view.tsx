import type { HomeData } from "@/lib/home-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featureToneClass = {
  progress: "bg-[hsl(258_90%_66%/0.12)] text-[hsl(258_90%_80%)]",
  success: "bg-[hsl(142_69%_58%/0.12)] text-accent-success",
  insight: "bg-[hsl(38_92%_50%/0.12)] text-accent-insight",
} as const;

export function HomeView({ data }: { data: HomeData }) {
  const SparklesIcon = data.sparklesIcon;
  const SecondaryIcon = data.secondaryCta.icon;

  return (
    <main className="mx-auto max-w-[1080px] px-5 pb-16">
      <nav className="sticky top-0 z-50 mb-2 flex items-center justify-between py-3.5 backdrop-blur-xl">
        <Link className="flex items-center gap-2.5" href="/">
          <span className="grid h-[26px] w-[26px] place-items-center rounded-[7px] bg-gradient-to-br from-accent to-accent-progress shadow-[0_0_16px_hsl(239_84%_67%/0.4)]">
            <SparklesIcon size={15} className="text-white" aria-hidden="true" />
          </span>
          <span className="font-display text-[15px] font-semibold">Carrera</span>
        </Link>
        <div className="flex gap-2">
          <Link
            className="rounded-md border border-border-emphasis px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-text-2"
            href="/portfolio/demo"
          >
            Portafolio demo
          </Link>
          <Link
            className="rounded-md border border-border-emphasis px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-text-2"
            href="/login"
          >
            Entrar
          </Link>
        </div>
      </nav>

      <section className="relative py-14 text-center">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-[hsl(258_90%_66%/0.25)] bg-[hsl(239_84%_67%/0.08)] px-3.5 py-1.5 text-xs text-[hsl(258_90%_80%)]">
          <SparklesIcon size={14} aria-hidden="true" />
          {data.eyebrow}
        </span>
        <h1 className="mx-auto max-w-[760px] text-[42px] font-bold leading-[1.08] md:text-[56px]">
          {data.title}
          <br />
          <span className="bg-gradient-to-br from-accent via-accent-progress to-accent-narrative bg-clip-text text-transparent">
            {data.titleHighlight}
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-8 text-text-2">
          {data.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded-[11px] bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            href={data.primaryCta.href}
          >
            {data.primaryCta.label}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-[11px] border border-border-emphasis bg-surface px-6 py-3.5 text-sm font-semibold text-text-2 transition-transform hover:-translate-y-0.5 hover:text-foreground"
            href={data.secondaryCta.href}
          >
            <SecondaryIcon size={17} aria-hidden="true" />
            {data.secondaryCta.label}
          </Link>
        </div>
      </section>

      <section className="my-12 grid gap-3.5 md:grid-cols-3">
        {data.features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              className="rounded-[14px] border border-border bg-surface p-5"
              key={feature.title}
            >
              <div
                className={`mb-3.5 grid h-[42px] w-[42px] place-items-center rounded-[11px] ${featureToneClass[feature.tone as keyof typeof featureToneClass]}`}
              >
                <Icon size={20} aria-hidden="true" />
              </div>
              <h2 className="text-base">{feature.title}</h2>
              <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="my-12">
        <h2 className="text-center text-[28px]">Como funciona</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sin horarios, sin estres. Solo tu avanzando a tu ritmo.
        </p>
        <div className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {data.steps.map((step, index) => (
            <article className="px-5 py-4 text-center" key={step.title}>
              <div className="mx-auto mb-3.5 grid h-9 w-9 place-items-center rounded-full border border-[hsl(258_90%_66%/0.3)] bg-[hsl(239_84%_67%/0.1)] font-display font-semibold text-[hsl(258_90%_80%)]">
                {index + 1}
              </div>
              <h3 className="text-sm">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="my-12 rounded-[18px] border border-border bg-surface p-8 text-center">
        <h2 className="text-[26px]">Construido sobre honestidad</h2>
        <p className="mx-auto mt-2 max-w-[520px] text-sm leading-6 text-muted-foreground">
          En un mundo lleno de CVs inflados y certificaciones que se compran, nosotros apostamos por
          lo real.
        </p>
        <div className="mx-auto mt-7 grid max-w-[680px] gap-3 text-left md:grid-cols-2">
          {data.principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <article
                className="flex gap-2.5 rounded-[10px] bg-surface-2 p-3.5"
                key={principle.title}
              >
                <Icon
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-accent-success"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-[13px] font-medium">{principle.title}</h3>
                  <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
