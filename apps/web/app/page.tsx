import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, PauseCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

const signals = [
  { label: "Dominio inicial", value: "QA" },
  { label: "Ritmo", value: "configurable" },
  { label: "Comparación", value: "solo contigo" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {"{{PROJECT_NAME}}"}
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Trayectoria profesional verificable, construida a tu ritmo.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Un espacio para recorrer QA y automatización registrando evidencia real de trayectoria,
            sin rankings, rachas ni presión artificial.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">
                Ver tablero
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Entrar</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-surface p-5 shadow-sm">
          <div className="grid gap-3">
            {signals.map((signal) => (
              <div
                className="flex items-center justify-between rounded-md bg-muted px-4 py-3"
                key={signal.label}
              >
                <span className="text-sm text-muted-foreground">{signal.label}</span>
                <span className="text-sm font-medium">{signal.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-1 text-primary" size={20} aria-hidden="true" />
              <p className="text-sm leading-6">
                La evidencia se registra con trazabilidad y contexto.
              </p>
            </div>
            <div className="flex gap-3">
              <PauseCircle className="mt-1 text-primary" size={20} aria-hidden="true" />
              <p className="text-sm leading-6">Puedes pausar el aprendizaje cuando lo necesites.</p>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-1 text-primary" size={20} aria-hidden="true" />
              <p className="text-sm leading-6">
                El tiempo invertido se calcula desde interacciones reales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
