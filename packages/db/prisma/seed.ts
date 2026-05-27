import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: process.env.DATABASE_URL
    ? {
        db: {
          url: process.env.DATABASE_URL,
        },
      }
    : undefined,
});

const author = "seed:qa-initial";
const demoUserEmail = "demo@example.com";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: demoUserEmail },
    update: {},
    create: {
      id: "user_demo",
      email: demoUserEmail,
      name: "Persona Demo",
      emailVerified: new Date(),
      preferences: {
        create: {
          activeChannels: ["WEB", "EMAIL"],
          questionsPerWeek: 5,
          tipsPerWeek: 2,
          preferredWindowStart: "09:00",
          preferredWindowEnd: "18:00",
        },
      },
      channels: {
        create: {
          type: "EMAIL",
          address: demoUserEmail,
          isConfirmed: true,
          confirmedAt: new Date(),
        },
      },
    },
  });

  const domain = await prisma.domain.upsert({
    where: { slug: "qa" },
    update: {},
    create: {
      slug: "qa",
      name: "QA",
      description: "Fundamentos de calidad de software y automatización de pruebas.",
    },
  });

  const topic = await prisma.topic.upsert({
    where: {
      domainId_slug: {
        domainId: domain.id,
        slug: "fundamentos-de-pruebas",
      },
    },
    update: {},
    create: {
      domainId: domain.id,
      slug: "fundamentos-de-pruebas",
      name: "Fundamentos de pruebas",
      description: "Conceptos base para razonar sobre calidad, riesgo y cobertura.",
      order: 1,
    },
  });

  const subtopic = await prisma.subtopic.upsert({
    where: {
      topicId_slug: {
        topicId: topic.id,
        slug: "tipos-y-proposito",
      },
    },
    update: {},
    create: {
      topicId: topic.id,
      slug: "tipos-y-proposito",
      name: "Tipos y propósito de pruebas",
      description: "Qué busca cada tipo de prueba y cuándo aporta valor.",
      order: 1,
    },
  });

  const concepts = await Promise.all([
    upsertConcept(subtopic.id, "regresion", "Pruebas de regresión"),
    upsertConcept(subtopic.id, "humo", "Pruebas de humo"),
    upsertConcept(subtopic.id, "exploratorias", "Pruebas exploratorias"),
    upsertConcept(subtopic.id, "cobertura", "Cobertura de pruebas"),
  ]);

  await upsertQuestion({
    id: "question_qa_regression_purpose",
    domainId: domain.id,
    topicId: topic.id,
    subtopicId: subtopic.id,
    conceptIds: [concepts[0].id, concepts[3].id],
    prompt:
      "Después de corregir un bug en el login, el equipo quiere revisar que el cambio no haya roto flujos que antes funcionaban. ¿Qué tipo de prueba describe mejor esa intención?",
    explanation:
      "Las pruebas de regresión buscan detectar impactos no deseados después de cambios en el producto.",
    answers: [
      {
        id: "answer_qa_regression_correct",
        text: "Prueba de regresión",
        isCorrect: true,
        explanation:
          "Exacto: la intención principal es revisar que algo que ya funcionaba siga funcionando.",
      },
      {
        id: "answer_qa_regression_smoke",
        text: "Prueba de humo",
        isCorrect: false,
        explanation:
          "Una prueba de humo revisa señales básicas de estabilidad, pero aquí el foco es impacto por cambio.",
      },
      {
        id: "answer_qa_regression_load",
        text: "Prueba de carga",
        isCorrect: false,
        explanation:
          "La prueba de carga observa comportamiento bajo volumen; no es el objetivo central del caso.",
      },
    ],
  });

  await upsertQuestion({
    id: "question_qa_smoke_release",
    domainId: domain.id,
    topicId: topic.id,
    subtopicId: subtopic.id,
    conceptIds: [concepts[1].id],
    prompt:
      "Antes de invertir horas en una suite completa, quieres saber si la nueva build al menos permite iniciar sesión, navegar y crear un registro básico. ¿Qué enfoque calza mejor?",
    explanation:
      "Las pruebas de humo dan una señal rápida sobre si una build merece revisión más profunda.",
    answers: [
      {
        id: "answer_qa_smoke_correct",
        text: "Ejecutar una prueba de humo",
        isCorrect: true,
        explanation:
          "Sí. Es una revisión breve de flujos críticos antes de entrar en pruebas más detalladas.",
      },
      {
        id: "answer_qa_smoke_exploratory",
        text: "Hacer solo pruebas exploratorias largas",
        isCorrect: false,
        explanation:
          "La exploración puede aportar mucho, pero aquí se busca una señal rápida y acotada.",
      },
      {
        id: "answer_qa_smoke_skip",
        text: "Saltar validaciones hasta producción",
        isCorrect: false,
        explanation:
          "Eso aumenta riesgo innecesario; una señal temprana ayuda al equipo a decidir mejor.",
      },
    ],
  });

  await upsertQuestion({
    id: "question_qa_exploratory_value",
    domainId: domain.id,
    topicId: topic.id,
    subtopicId: subtopic.id,
    conceptIds: [concepts[2].id, concepts[3].id],
    prompt:
      "Un flujo nuevo no tiene casos documentados todavía, pero ya existe una versión navegable. ¿Qué aporte específico pueden tener las pruebas exploratorias?",
    explanation:
      "Las pruebas exploratorias ayudan a aprender del producto mientras se prueba, especialmente cuando hay incertidumbre.",
    answers: [
      {
        id: "answer_qa_exploratory_correct",
        text: "Descubrir riesgos y comportamientos no previstos mientras se aprende el flujo",
        isCorrect: true,
        explanation:
          "Bien visto. La exploración combina diseño, aprendizaje y ejecución de pruebas en una misma actividad.",
      },
      {
        id: "answer_qa_exploratory_no_value",
        text: "Reemplazar para siempre cualquier caso de prueba documentado",
        isCorrect: false,
        explanation:
          "No hace falta oponerlos. La exploración y los casos documentados pueden complementarse.",
      },
      {
        id: "answer_qa_exploratory_only_ui",
        text: "Validar únicamente colores y tamaños de fuente",
        isCorrect: false,
        explanation:
          "Puede incluir interfaz, pero su valor es más amplio: comportamiento, riesgos y aprendizaje.",
      },
    ],
  });

  await prisma.tip.upsert({
    where: { id: "tip_qa_regression_small" },
    update: {},
    create: {
      id: "tip_qa_regression_small",
      domainId: domain.id,
      type: "SHORT_ADVICE",
      title: "Regresión no significa probarlo todo",
      body: "Una buena regresión prioriza los flujos con más riesgo de impacto. No se trata de repetir todo sin criterio.",
      author,
      concepts: {
        connect: [{ id: concepts[0].id }, { id: concepts[3].id }],
      },
    },
  });

  console.log(`Seed listo. Usuario demo: ${user.email}`);
}

async function upsertConcept(subtopicId: string, slug: string, name: string) {
  return prisma.concept.upsert({
    where: {
      subtopicId_slug: {
        subtopicId,
        slug,
      },
    },
    update: {},
    create: {
      subtopicId,
      slug,
      name,
    },
  });
}

type SeedAnswer = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
};

type SeedQuestion = {
  id: string;
  domainId: string;
  topicId: string;
  subtopicId: string;
  conceptIds: string[];
  prompt: string;
  explanation: string;
  answers: SeedAnswer[];
};

async function upsertQuestion(input: SeedQuestion) {
  await prisma.question.upsert({
    where: { id: input.id },
    update: {},
    create: {
      id: input.id,
      domainId: input.domainId,
      topicId: input.topicId,
      subtopicId: input.subtopicId,
      type: "MULTIPLE_CHOICE",
      level: "INITIAL",
      prompt: input.prompt,
      estimatedTimeSec: 90,
      author,
      concepts: {
        connect: input.conceptIds.map((id) => ({ id })),
      },
      versions: {
        create: {
          version: 1,
          prompt: input.prompt,
          explanation: input.explanation,
          author,
        },
      },
      answers: {
        create: input.answers.map((answer, order) => ({
          id: answer.id,
          text: answer.text,
          isCorrect: answer.isCorrect,
          explanation: answer.explanation,
          order,
        })),
      },
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
