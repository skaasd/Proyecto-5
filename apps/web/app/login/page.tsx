import { signIn } from "@/auth";
import {
  ArrowRight,
  CheckCircle2,
  Chrome,
  Clock3,
  LockKeyhole,
  Mail,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

async function signInWithEmail(formData: FormData) {
  "use server";

  const email = formData.get("email");

  if (typeof email === "string") {
    await signIn("resend", {
      email,
      redirectTo: "/dashboard",
    });
  }
}

async function signInWithGoogle() {
  "use server";

  await signIn("google", {
    redirectTo: "/dashboard",
  });
}

const progressNodes = [
  { x: 74, y: 152, label: "Inicio", fill: "hsl(142 69% 58%)" },
  { x: 194, y: 82, label: "Casos", fill: "hsl(142 69% 58%)" },
  { x: 306, y: 124, label: "Quest", fill: "hsl(258 90% 66%)", active: true },
  { x: 424, y: 146, label: "Portafolio", fill: "hsl(38 92% 50%)" },
  { x: 520, y: 80, label: "Oferta", fill: "hsl(222 9% 41%)", locked: true },
];

const routeStats = [
  { icon: Trophy, label: "Nivel actual", value: "QA Path" },
  { icon: Sparkles, label: "Siguiente desbloqueo", value: "Automatizacion" },
  { icon: Clock3, label: "Ritmo", value: "A tu tiempo" },
];

const accessNotes = [
  "El dashboard conserva tu avance entre sesiones.",
  "Puedes pausar quests sin perder trayectoria.",
  "Tu portafolio se comparte solo cuando lo decides.",
];

export default function LoginPage() {
  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-[1080px] min-w-0 items-center gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative order-2 min-w-0 overflow-hidden rounded-[22px] border border-border bg-surface px-5 py-6 sm:px-7 sm:py-8 lg:order-1">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,hsl(258_90%_66%/0.18),transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-20 left-8 h-60 w-60 rounded-full bg-[radial-gradient(circle,hsl(38_92%_50%/0.12),transparent_72%)]" />

          <div className="relative">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-progress text-white shadow-[0_6px_20px_hsl(239_84%_67%/0.28)]">
                  <Route size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wide text-[hsl(258_90%_80%)]">
                    Observatorio QA
                  </p>
                  <p className="font-display text-[14px] font-semibold">Trayectoria verificable</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[hsl(142_69%_58%/0.25)] bg-[hsl(142_69%_58%/0.1)] px-2.5 py-1 text-[10px] font-medium text-accent-success">
                <ShieldCheck size={12} aria-hidden="true" />
                Privado por defecto
              </span>
            </div>

            <h1 className="max-w-[520px] text-[34px] leading-[1.05] sm:text-[44px]">
              Entra y retoma tu mapa profesional.
            </h1>
            <p className="mt-4 max-w-[520px] text-[14px] leading-6 text-text-2">
              Tus quests, casos y evidencias quedan reunidas en una ruta que puedes mostrar cuando
              tenga sentido.
            </p>

            <div className="mt-8 grid gap-3 border-y border-border py-5 sm:grid-cols-3">
              {routeStats.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label}>
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-border-emphasis bg-white/[0.03] text-[hsl(258_90%_80%)]">
                      <Icon size={15} aria-hidden="true" />
                    </div>
                    <p className="text-[10px] uppercase text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-[13px] font-medium text-text-2">{item.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 h-[230px] overflow-hidden rounded-2xl border border-border bg-[hsl(222_16%_11%/0.56)]">
              <svg
                aria-label="Vista previa del mapa de progreso"
                className="h-full w-full"
                role="img"
                viewBox="0 0 620 230"
              >
                <defs>
                  <linearGradient id="login-path" x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="hsl(142 69% 58%)" />
                    <stop offset="1" stopColor="hsl(258 90% 66%)" />
                  </linearGradient>
                  <filter id="login-glow">
                    <feGaussianBlur result="blur" stdDeviation="5" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M74 152 C140 62 218 76 286 118 S410 176 520 80"
                  fill="none"
                  stroke="url(#login-path)"
                  strokeDasharray="6 6"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                />
                {progressNodes.map((node) => (
                  <g key={node.label}>
                    {node.active ? (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        fill="none"
                        r="24"
                        stroke={node.fill}
                        strokeOpacity="0.42"
                      />
                    ) : null}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      fill={node.locked ? "none" : node.fill}
                      filter={node.active ? "url(#login-glow)" : undefined}
                      r={node.active ? 14 : 12}
                      stroke={node.fill}
                      strokeDasharray={node.locked ? "3 3" : undefined}
                      strokeWidth={node.locked ? 1.5 : undefined}
                    />
                    <text
                      fill={node.locked ? "hsl(222 9% 41%)" : "hsl(220 16% 96%)"}
                      fontSize="11"
                      textAnchor="middle"
                      x={node.x}
                      y={node.y + 34}
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </section>

        <section className="order-1 min-w-0 rounded-[22px] border border-border bg-surface p-5 shadow-[0_18px_80px_hsl(222_24%_2%/0.32)] sm:p-7 lg:order-2">
          <div className="mb-7">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[hsl(38_92%_50%/0.22)] bg-[hsl(38_92%_50%/0.1)] px-2.5 py-1 text-[10px] font-medium text-accent-insight">
              <LockKeyhole size={12} aria-hidden="true" />
              Acceso seguro
            </span>
            <h2 className="mt-4 text-[26px]">Entrar</h2>
            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
              Elige una puerta de acceso para continuar desde el dashboard.
            </p>
          </div>

          <form action={signInWithEmail} className="grid gap-3">
            <label className="text-[12px] font-medium text-text-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-4"
                size={16}
              />
              <input
                className="h-12 w-full rounded-lg border border-border-emphasis bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-[hsl(258_90%_66%/0.28)]"
                id="email"
                name="email"
                placeholder="tu@email.com"
                type="email"
                required
              />
            </div>
            <button
              className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-4 text-[13px] font-semibold text-[#0A0B0D] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              type="submit"
            >
              Enviar enlace
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase text-text-4">o</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form action={signInWithGoogle}>
            <button
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-border-emphasis bg-transparent px-4 text-[13px] font-semibold text-text-2 transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              type="submit"
            >
              <Chrome size={16} aria-hidden="true" />
              Continuar con Google
            </button>
          </form>

          <div className="mt-7 space-y-3 border-t border-border pt-5">
            {accessNotes.map((text) => (
              <p className="flex items-center gap-2 text-[11px] text-muted-foreground" key={text}>
                <CheckCircle2
                  aria-hidden="true"
                  className="flex-shrink-0 text-accent-success"
                  size={14}
                />
                {text}
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
