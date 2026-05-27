import { describe, expect, it } from "vitest";
import type {
  LearningEvent,
  LearningEventRepository,
  QuestionRepository,
  QuestionWithAnswers,
  RecordReviewInput,
  SaveUserResponseInput,
  SpacedRepetitionScheduler,
  User,
  UserRepository,
  UserResponse,
} from "../src/index.js";
import { SubmitUserResponse, UseCaseError } from "../src/index.js";

const now = new Date("2026-05-27T12:00:00.000Z");

class InMemoryUsers implements UserRepository {
  constructor(private readonly users: User[]) {}

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
}

class InMemoryQuestions implements QuestionRepository {
  public savedResponses: SaveUserResponseInput[] = [];

  constructor(private readonly questions: QuestionWithAnswers[]) {}

  async findByIdWithAnswers(id: string): Promise<QuestionWithAnswers | null> {
    return this.questions.find((question) => question.id === id) ?? null;
  }

  async findNextForUser(): Promise<QuestionWithAnswers | null> {
    return this.questions[0] ?? null;
  }

  async saveUserResponse(input: SaveUserResponseInput): Promise<UserResponse> {
    this.savedResponses.push(input);

    return {
      id: "response_1",
      ...input,
    };
  }
}

class InMemoryEvents implements LearningEventRepository {
  public events: LearningEvent[] = [];

  async append(event: LearningEvent): Promise<void> {
    this.events.push(event);
  }
}

class InMemoryScheduler implements SpacedRepetitionScheduler {
  public reviews: RecordReviewInput[] = [];

  async recordReview(input: RecordReviewInput): Promise<void> {
    this.reviews.push(input);
  }
}

const user: User = {
  id: "user_1",
  email: "persona@example.com",
  createdAt: now,
  updatedAt: now,
};

const question: QuestionWithAnswers = {
  id: "question_1",
  prompt: "¿Qué busca una prueba de regresión?",
  type: "multiple_choice",
  conceptIds: ["concept_1"],
  concepts: [{ id: "concept_1", name: "Regresión", subtopicId: "subtopic_1" }],
  answers: [
    {
      id: "answer_1",
      questionId: "question_1",
      text: "Detectar impactos no deseados después de cambios.",
      isCorrect: true,
      explanation:
        "Las pruebas de regresión ayudan a revisar que cambios nuevos no rompan flujos previos.",
    },
    {
      id: "answer_2",
      questionId: "question_1",
      text: "Validar solamente el diseño visual.",
      isCorrect: false,
      explanation: "El foco no está solo en lo visual, sino en comportamiento que ya funcionaba.",
    },
  ],
};

function buildUseCase() {
  const questions = new InMemoryQuestions([question]);
  const events = new InMemoryEvents();
  const scheduler = new InMemoryScheduler();

  const useCase = new SubmitUserResponse({
    users: new InMemoryUsers([user]),
    questions,
    events,
    scheduler,
    now: () => now,
  });

  return { events, questions, scheduler, useCase };
}

describe("SubmitUserResponse", () => {
  it("registra una respuesta correcta y crea eventos de aprendizaje", async () => {
    const { events, questions, scheduler, useCase } = buildUseCase();

    const result = await useCase.execute({
      userId: "user_1",
      questionId: "question_1",
      answerId: "answer_1",
      responseTimeMs: 12_000,
      attemptNumber: 1,
      channel: "web",
    });

    expect(result.response.isCorrect).toBe(true);
    expect(result.feedback).toContain("Tu respuesta coincide");
    expect(questions.savedResponses).toHaveLength(1);
    expect(events.events).toEqual([
      expect.objectContaining({
        kind: "response_submitted",
        userId: "user_1",
        questionId: "question_1",
      }),
    ]);
    expect(scheduler.reviews).toEqual([
      {
        userId: "user_1",
        conceptIds: ["concept_1"],
        isCorrect: true,
        reviewedAt: now,
      },
    ]);
  });

  it("registra una respuesta a revisar sin lenguaje castigador", async () => {
    const { useCase } = buildUseCase();

    const result = await useCase.execute({
      userId: "user_1",
      questionId: "question_1",
      answerId: "answer_2",
      responseTimeMs: 18_000,
      attemptNumber: 1,
      channel: "telegram",
    });

    expect(result.response.isCorrect).toBe(false);
    expect(result.feedback).toContain("vale la pena revisar");
    expect(result.feedback).not.toContain("fallaste");
  });

  it("rechaza una respuesta que no pertenece a la pregunta", async () => {
    const { useCase } = buildUseCase();

    await expect(
      useCase.execute({
        userId: "user_1",
        questionId: "question_1",
        answerId: "answer_404",
        responseTimeMs: 18_000,
        attemptNumber: 1,
        channel: "web",
      }),
    ).rejects.toEqual(
      new UseCaseError("La respuesta no pertenece a esta pregunta.", "ANSWER_NOT_FOUND"),
    );
  });
});
