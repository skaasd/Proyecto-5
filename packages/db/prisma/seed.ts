import { PrismaClient } from "@prisma/client";
import { conceptBank, questionBank } from "@project-name/shared";
import { loadRootEnv } from "../scripts/load-root-env.js";

loadRootEnv();

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
      description: "Fundamentos de calidad de software y automatizacion de pruebas.",
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
      name: "Tipos y proposito de pruebas",
      description: "Que busca cada tipo de prueba y cuando aporta valor.",
      order: 1,
    },
  });

  const concepts = await Promise.all(
    conceptBank.map((concept) => upsertConcept(subtopic.id, concept.slug, concept.name)),
  );
  const conceptBySlug = new Map(concepts.map((concept) => [concept.slug, concept]));

  for (const question of questionBank) {
    await upsertQuestion({
      id: question.id,
      domainId: domain.id,
      topicId: topic.id,
      subtopicId: subtopic.id,
      conceptIds: question.conceptSlugs.map((slug) => requireConcept(conceptBySlug, slug).id),
      prompt: question.prompt,
      explanation: question.explanation,
      answers: [
        {
          id: `${question.id}_answer_correct`,
          text: question.correct,
          isCorrect: true,
          explanation: `Correcto. ${question.explanation}`,
        },
        ...question.distractors.map((answer, index) => ({
          id: `${question.id}_answer_distractor_${index + 1}`,
          text: answer,
          isCorrect: false,
          explanation: `No es el mejor foco para este escenario. ${question.explanation}`,
        })),
      ],
    });
  }

  await prisma.tip.upsert({
    where: { id: "tip_qa_regression_small" },
    update: {},
    create: {
      id: "tip_qa_regression_small",
      domainId: domain.id,
      type: "SHORT_ADVICE",
      title: "Regresion no significa probarlo todo",
      body: "Una buena regresion prioriza los flujos con mas riesgo de impacto. No se trata de repetir todo sin criterio.",
      author,
      concepts: {
        connect: [
          { id: requireConcept(conceptBySlug, "regresion").id },
          { id: requireConcept(conceptBySlug, "cobertura").id },
        ],
      },
    },
  });

  console.log(
    `Seed listo. Usuario demo: ${user.email}. Daily quests QA: ${questionBank.length}. Conceptos: ${conceptBank.length}.`,
  );
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
  const answerIds = input.answers.map((answer) => answer.id);

  await prisma.question.upsert({
    where: { id: input.id },
    update: {
      prompt: input.prompt,
      currentVersion: 1,
      isActive: true,
      concepts: {
        set: input.conceptIds.map((id) => ({ id })),
      },
    },
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
    },
  });

  await prisma.questionVersion.upsert({
    where: {
      questionId_version: {
        questionId: input.id,
        version: 1,
      },
    },
    update: {
      prompt: input.prompt,
      explanation: input.explanation,
      author,
    },
    create: {
      questionId: input.id,
      version: 1,
      prompt: input.prompt,
      explanation: input.explanation,
      author,
    },
  });

  await prisma.answer.deleteMany({
    where: {
      questionId: input.id,
      id: {
        notIn: answerIds,
      },
    },
  });

  for (const [order, answer] of input.answers.entries()) {
    await prisma.answer.upsert({
      where: { id: answer.id },
      update: {
        text: answer.text,
        isCorrect: answer.isCorrect,
        explanation: answer.explanation,
        order,
      },
      create: {
        id: answer.id,
        questionId: input.id,
        text: answer.text,
        isCorrect: answer.isCorrect,
        explanation: answer.explanation,
        order,
      },
    });
  }
}

function requireConcept(
  concepts: Map<string, Awaited<ReturnType<typeof upsertConcept>>>,
  slug: string,
) {
  const concept = concepts.get(slug);

  if (!concept) {
    throw new Error(`Concepto seed no encontrado: ${slug}`);
  }

  return concept;
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
