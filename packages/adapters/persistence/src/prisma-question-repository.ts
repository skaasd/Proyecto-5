import type { Prisma, PrismaClient } from "@prisma/client";
import type {
  QuestionRepository,
  QuestionType,
  QuestionWithAnswers,
  SaveUserResponseInput,
  UserResponse,
} from "@project-name/core";

export class PrismaQuestionRepository implements QuestionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByIdWithAnswers(id: string): Promise<QuestionWithAnswers | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        answers: {
          orderBy: { order: "asc" },
        },
        concepts: true,
      },
    });

    if (!question) {
      return null;
    }

    return mapQuestion(question);
  }

  async findNextForUser(userId: string): Promise<QuestionWithAnswers | null> {
    const dueConceptIds = await this.prisma.spacedRepetitionState.findMany({
      where: {
        userId,
        nextReviewAt: {
          lte: new Date(),
        },
      },
      orderBy: { nextReviewAt: "asc" },
      select: { conceptId: true },
      take: 10,
    });

    if (dueConceptIds.length > 0) {
      const reviewQuestion = await this.prisma.question.findFirst({
        where: {
          isActive: true,
          concepts: {
            some: {
              id: { in: dueConceptIds.map((state) => state.conceptId) },
            },
          },
        },
        include: {
          answers: {
            orderBy: { order: "asc" },
          },
          concepts: true,
        },
        orderBy: [{ updatedAt: "asc" }, { id: "asc" }],
      });

      if (reviewQuestion) {
        return mapQuestion(reviewQuestion);
      }
    }

    const question =
      (await this.prisma.question.findFirst({
        where: {
          isActive: true,
          responses: {
            none: { userId },
          },
        },
        include: {
          answers: {
            orderBy: { order: "asc" },
          },
          concepts: true,
        },
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      })) ??
      (await this.prisma.question.findFirst({
        where: { isActive: true },
        include: {
          answers: {
            orderBy: { order: "asc" },
          },
          concepts: true,
        },
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      }));

    return question ? mapQuestion(question) : null;
  }

  async saveUserResponse(input: SaveUserResponseInput): Promise<UserResponse> {
    const response = await this.prisma.userResponse.create({
      data: {
        userId: input.userId,
        questionId: input.questionId,
        answerId: input.answerId,
        responseText: input.responseText,
        isCorrect: input.isCorrect,
        responseTimeMs: input.responseTimeMs,
        attemptNumber: input.attemptNumber,
        submittedAt: input.submittedAt,
      },
    });

    return {
      id: response.id,
      userId: response.userId,
      questionId: response.questionId,
      answerId: response.answerId ?? undefined,
      responseText: response.responseText ?? undefined,
      isCorrect: response.isCorrect,
      responseTimeMs: response.responseTimeMs,
      attemptNumber: response.attemptNumber,
      channel: input.channel,
      submittedAt: response.submittedAt,
    };
  }
}

type PrismaQuestionWithRelations = Prisma.QuestionGetPayload<{
  include: {
    answers: true;
    concepts: true;
  };
}>;

function mapQuestion(question: NonNullable<PrismaQuestionWithRelations>): QuestionWithAnswers {
  return {
    id: question.id,
    prompt: question.prompt,
    type: mapQuestionType(question.type),
    conceptIds: question.concepts.map((concept) => concept.id),
    concepts: question.concepts.map((concept) => ({
      id: concept.id,
      name: concept.name,
      subtopicId: concept.subtopicId,
    })),
    answers: question.answers.map((answer) => ({
      id: answer.id,
      questionId: answer.questionId,
      text: answer.text,
      isCorrect: answer.isCorrect,
      explanation: answer.explanation,
    })),
  };
}

function mapQuestionType(type: string): QuestionType {
  switch (type) {
    case "MULTIPLE_CHOICE":
      return "multiple_choice";
    case "SHORT_ANSWER":
      return "short_answer";
    case "MINI_EXERCISE":
      return "mini_exercise";
    case "SCENARIO":
      return "scenario";
    case "CODE":
      return "code";
    default:
      return "short_answer";
  }
}
