import { describe, expect, it } from "vitest";
import type {
  QuestionRepository,
  QuestionWithAnswers,
  SaveUserResponseInput,
  User,
  UserRepository,
  UserResponse,
} from "../src/index.js";
import { GetNextQuestion, UseCaseError } from "../src/index.js";

const now = new Date("2026-05-27T12:00:00.000Z");

class InMemoryUsers implements UserRepository {
  constructor(private readonly users: User[]) {}

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }
}

class InMemoryQuestions implements QuestionRepository {
  constructor(private readonly question: QuestionWithAnswers | null) {}

  async findByIdWithAnswers(): Promise<QuestionWithAnswers | null> {
    return this.question;
  }

  async findNextForUser(): Promise<QuestionWithAnswers | null> {
    return this.question;
  }

  async saveUserResponse(input: SaveUserResponseInput): Promise<UserResponse> {
    return {
      id: "response_1",
      ...input,
    };
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
  prompt: "¿Qué aporta una prueba de humo?",
  type: "multiple_choice",
  conceptIds: ["concept_1"],
  concepts: [{ id: "concept_1", name: "Pruebas de humo", subtopicId: "subtopic_1" }],
  answers: [
    {
      id: "answer_1",
      questionId: "question_1",
      text: "Una señal rápida de estabilidad básica.",
      isCorrect: true,
      explanation: "No expongas esto en la pregunta inicial.",
    },
  ],
};

describe("GetNextQuestion", () => {
  it("entrega la próxima pregunta sin exponer cuál respuesta es correcta", async () => {
    const useCase = new GetNextQuestion({
      users: new InMemoryUsers([user]),
      questions: new InMemoryQuestions(question),
    });

    const result = await useCase.execute({ userId: "user_1" });

    expect(result.question?.prompt).toBe("¿Qué aporta una prueba de humo?");
    expect(result.question?.answers).toEqual([
      {
        id: "answer_1",
        text: "Una señal rápida de estabilidad básica.",
      },
    ]);
    expect(JSON.stringify(result)).not.toContain("isCorrect");
    expect(JSON.stringify(result)).not.toContain("No expongas");
  });

  it("rechaza usuarios inexistentes", async () => {
    const useCase = new GetNextQuestion({
      users: new InMemoryUsers([]),
      questions: new InMemoryQuestions(question),
    });

    await expect(useCase.execute({ userId: "user_404" })).rejects.toEqual(
      new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND"),
    );
  });
});
