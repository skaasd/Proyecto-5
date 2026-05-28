import { Award, BriefcaseBusiness, Check, Eye, Map as MapIcon, Sparkles } from "lucide-react";

export const homeData = {
  eyebrow: "No es otro curso. Es una aventura profesional.",
  title: "Vuelvete experto en algo",
  titleHighlight: "mientras te entretienes",
  description:
    "Aprende QA y automatizacion jugando misiones reales, construye un portafolio que reemplaza tu CV, y deja que tu trabajo hable por ti. A tu ritmo, sin presion, sin trampas.",
  primaryCta: {
    href: "/dashboard",
    label: "Empezar mi camino",
  },
  secondaryCta: {
    href: "/portfolio/demo",
    label: "Ver un perfil de ejemplo",
    icon: Eye,
  },
  features: [
    {
      title: "Aprende como un juego",
      description:
        "Misiones con casos reales, un mapa de habilidades que iluminas, niveles e insignias. La dopamina del progreso aplicada a aprender de verdad.",
      icon: MapIcon,
      tone: "progress",
    },
    {
      title: "Tu trabajo es tu CV",
      description:
        "Cada caso que resuelves queda como evidencia trazable. Un portafolio que se construye solo y que las empresas pueden verificar.",
      icon: Award,
      tone: "success",
    },
    {
      title: "Conectado al mercado real",
      description:
        "Mira que empresas valoran lo que estas aprendiendo. Sin promesas falsas, solo informacion honesta para que decidas.",
      icon: BriefcaseBusiness,
      tone: "insight",
    },
  ],
  steps: [
    {
      title: "Recibe misiones",
      description: "Llegan a tu Telegram o correo, cuando tu quieras y cuantas quieras.",
    },
    {
      title: "Resuelve jugando",
      description: "Casos reales con decisiones. No hay respuesta unica, importa como piensas.",
    },
    {
      title: "Construye evidencia",
      description: "Cada mision completa enriquece tu portafolio verificable automaticamente.",
    },
    {
      title: "Muestrate al mundo",
      description: "Comparte tu perfil con quien quieras. Tu trabajo habla antes que tu.",
    },
  ],
  principles: [
    {
      title: "Sin rankings ni competencia",
      description: "Solo te comparas contigo mismo en el pasado.",
      icon: Check,
    },
    {
      title: "Sin presion ni rachas ansiosas",
      description: "Pausa cuando quieras. Nada se pierde.",
      icon: Check,
    },
    {
      title: "Tus datos son tuyos",
      description: "Exporta o borra todo cuando quieras.",
      icon: Check,
    },
    {
      title: "Mide tu proceso, no solo resultados",
      description: "Se valora como piensas y persistes.",
      icon: Check,
    },
  ],
  sparklesIcon: Sparkles,
};

export type HomeData = typeof homeData;
