import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bug,
  Calendar,
  CreditCard,
  FileText,
  Link as LinkIcon,
  ListChecks,
  Mail,
  MessageCircle,
  ShieldCheck,
  Table,
  Target,
  Zap,
} from "lucide-react";

export type PortfolioSkill = {
  name: string;
  evidence: string;
  percent: number;
  tone: "success" | "learning";
};

export type PortfolioCase = {
  title: string;
  description: string;
  tags: string[];
  timeText: string;
  icon: LucideIcon;
  iconTone: "insight" | "success";
  evidence: Array<{ icon: LucideIcon; label: string }>;
};

export type PortfolioReflection = {
  quote: string;
  meta: string;
};

export type PortfolioBadge = {
  label: string;
  icon: LucideIcon;
  gradient: string;
};

export type PortfolioData = {
  person: {
    initials: string;
    name: string;
    role: string;
    since: string;
    email: string;
    isVerified: boolean;
  };
  stats: Array<{ label: string; value: string; suffix?: string }>;
  skills: PortfolioSkill[];
  cases: PortfolioCase[];
  reflections: PortfolioReflection[];
  badges: PortfolioBadge[];
  trustText: string;
};

export const portfolioMock: PortfolioData = {
  person: {
    initials: "SP",
    name: "Sebastian Perez",
    role: "QA Engineer · Construyendo evidencia en QA y automatizacion",
    since: "Activo desde mayo 2026 · 47 dias de practica documentada",
    email: "demo@example.com",
    isVerified: true,
  },
  stats: [
    { label: "Tiempo invertido", value: "23h 14m" },
    { label: "Conceptos solidos", value: "12", suffix: "/ 24" },
    { label: "Casos resueltos", value: "8" },
    { label: "Constancia", value: "4.2", suffix: "/ sem" },
  ],
  skills: [
    { name: "Casos de prueba", evidence: "Solido · 18 evidencias", percent: 88, tone: "success" },
    {
      name: "Tipos de pruebas",
      evidence: "Solido · 14 evidencias",
      percent: 82,
      tone: "success",
    },
    {
      name: "Pruebas de regresion",
      evidence: "Aprendiendo · 7 evidencias",
      percent: 54,
      tone: "learning",
    },
    { name: "Selenium", evidence: "Aprendiendo · 4 evidencias", percent: 32, tone: "learning" },
  ],
  cases: [
    {
      title: "Analisis del incidente Knight Capital de 2012",
      description:
        "Caso publico real. Identifique 4 fallas de QA que pudieron prevenir las perdidas de USD 460M. Propuse una estrategia QA alternativa.",
      tags: ["Regresion QA", "Estrategia QA", "Sistemas criticos"],
      timeText: "3h trabajadas",
      icon: Bug,
      iconTone: "insight",
      evidence: [
        { icon: FileText, label: "Analisis 1.400 palabras" },
        { icon: MessageCircle, label: "Reflexion personal" },
        { icon: LinkIcon, label: "Fuentes citadas" },
      ],
    },
    {
      title: "Plan de pruebas para modulo de pagos en fintech",
      description:
        "Caso sintetico. Disene estrategia completa para validar transacciones con 3 medios de pago, considerando edge cases de fraude y reversa.",
      tags: ["Plan de pruebas", "Edge cases", "Fintech"],
      timeText: "2h 20m",
      icon: CreditCard,
      iconTone: "success",
      evidence: [
        { icon: ListChecks, label: "47 casos de prueba" },
        { icon: Table, label: "Matriz de riesgo" },
        { icon: MessageCircle, label: "Reflexion" },
      ],
    },
  ],
  reflections: [
    {
      quote:
        "Antes pensaba que las pruebas exploratorias eran las menos importantes. Despues de analizar el caso de Knight Capital entendi que son las que detectan los bugs que nadie predijo. Cambio mi forma de priorizar.",
      meta: "Hace 12 dias · sobre Tipos de pruebas",
    },
    {
      quote:
        "Confundi regresion con revalidacion durante 3 semanas. Lo descubri practicando un caso donde los resultados no calzaban con la teoria. Aprender a darme cuenta de mis propios errores es lo mas valioso de esto.",
      meta: "Hace 18 dias · sobre Pruebas de regresion",
    },
  ],
  badges: [
    {
      label: "Primer caso",
      icon: ShieldCheck,
      gradient: "linear-gradient(135deg,#4ADE80,#10B981)",
    },
    { label: "10 en fila", icon: Target, gradient: "linear-gradient(135deg,#6366F1,#4F46E5)" },
    { label: "Constancia 12d", icon: Zap, gradient: "linear-gradient(135deg,#F59E0B,#DC2626)" },
    { label: "Deep thinker", icon: BookOpen, gradient: "linear-gradient(135deg,#8B5CF6,#6366F1)" },
    { label: "Caso real", icon: Bug, gradient: "linear-gradient(135deg,#EC4899,#BE185D)" },
  ],
  trustText:
    "Toda esta evidencia se genero dentro de la plataforma, con timestamps y trazabilidad. La persona controla que mostrar y que mantener privado.",
};

export type PortfolioRealSources = {
  currentUserName?: string | null;
  email?: string | null;
  createdAt?: string;
  totalTimeMs?: number;
  conceptsExplored?: number;
  totalResponses?: number;
  constanciaDays?: number;
  level?: number;
};

export function buildPortfolioData(sources: PortfolioRealSources): PortfolioData {
  const name =
    sources.currentUserName ||
    (sources.email ? (sources.email.split("@")[0] ?? sources.email) : "Aprendiz QA");
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return {
    ...portfolioMock,
    person: {
      initials: initials || "QA",
      name,
      role: "Construyendo evidencia en QA y automatizacion",
      since: sources.createdAt
        ? `Activo desde ${new Date(sources.createdAt).toLocaleDateString("es-CL", {
            month: "long",
            year: "numeric",
          })} · nivel ${sources.level ?? 1}`
        : "Trayectoria en construccion",
      email: sources.email ?? portfolioMock.person.email,
      isVerified: true,
    },
    stats: [
      { label: "Tiempo invertido", value: formatTime(sources.totalTimeMs ?? 0) },
      { label: "Conceptos explorados", value: String(sources.conceptsExplored ?? 0) },
      { label: "Movimientos registrados", value: String(sources.totalResponses ?? 0) },
      { label: "Constancia", value: String(sources.constanciaDays ?? 0), suffix: "dias" },
    ],
  };
}

function formatTime(totalTimeMs: number): string {
  const minutes = Math.round(totalTimeMs / 60_000);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export const portfolioIcons = {
  Calendar,
  Mail,
  ShieldCheck,
};
