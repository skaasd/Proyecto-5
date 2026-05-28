import { describe, expect, it } from "vitest";
import type {
  LearningEvent,
  LearningEventRepository,
  MessagingChannel,
  OutboundMessage,
  QuestionRepository,
  QuestionWithAnswers,
  SaveUserResponseInput,
  UserRepository,
} from "../src/index.js";
import { DeliverNextQuestion, UseCaseError } from "../src/index.js";

class InMemoryUsers implements UserRepository {
  constructor(private readonly userIds: string[]) {}

  async findById(id: string) {
    return this.userIds.includes(id)
      ? {
          id,
          email: `${id}@example.com`,
          createdAt: new Date("2026-05-27T12:00:00.000Z"),
          updatedAt: new Date("2026-05-27T12:00:00.000Z"),
        }
      : null;
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

  async saveUserResponse(input: SaveUserResponseInput) {
    return { id: "response_1", ...input };
  }
}

class InMemoryEvents implements LearningEventRepository {
  public events: LearningEvent[] = [];

  async append(event: LearningEvent): Promise<void> {
    this.events.push(event);
  }
}

class InMemoryMessaging implements MessagingChannel {
  public messages: OutboundMessage[] = [];

  async send(message: OutboundMessage): Promise<void> {
    this.messages.push(message);
  }
}

const question: QuestionWithAnswers = {
  id: "question_1",
  prompt: "Que revisarias primero?",
  type: "multiple_choice",
  conceptIds: ["concept_1"],
  concepts: [{ id: "concept_1", name: "Riesgo", subtopicId: "subtopic_1" }],
  answers: [
    {
      id: "answer_1",
      questionId: "question_1",
      text: "Flujo critico",
      isCorrect: true,
      explanation: "Tiene mas impacto.",
    },
  ],
};

describe("DeliverNextQuestion", () => {
  it("envia la siguiente quest y registra evento", async () => {
    const events = new InMemoryEvents();
    const messaging = new InMemoryMessaging();
    const useCase = new DeliverNextQuestion({
      users: new InMemoryUsers(["user_1"]),
      questions: new InMemoryQuestions(question),
      channelName: "email",
      events,
      messaging,
      now: () => new Date("2026-05-27T12:30:00.000Z"),
    });

    const result = await useCase.execute({
      userId: "user_1",
      scheduledFor: new Date("2026-05-27T12:00:00.000Z"),
    });

    expect(result).toEqual({ delivered: true, questionId: "question_1" });
    expect(messaging.messages).toEqual([
      {
        userId: "user_1",
        subject: "Tu siguiente quest de QA",
        body: "Que revisarias primero?\n\nConceptos: Riesgo",
      },
    ]);
    expect(events.events).toEqual([
      {
        userId: "user_1",
        questionId: "question_1",
        kind: "question_sent",
        occurredAt: new Date("2026-05-27T12:30:00.000Z"),
        payload: {
          channel: "email",
          conceptIds: ["concept_1"],
          scheduledFor: "2026-05-27T12:00:00.000Z",
        },
      },
    ]);
  });

  it("no envia nada si no hay preguntas disponibles", async () => {
    const messaging = new InMemoryMessaging();
    const useCase = new DeliverNextQuestion({
      users: new InMemoryUsers(["user_1"]),
      questions: new InMemoryQuestions(null),
      events: new InMemoryEvents(),
      messaging,
      now: () => new Date("2026-05-27T12:30:00.000Z"),
    });

    await expect(
      useCase.execute({
        userId: "user_1",
        scheduledFor: new Date("2026-05-27T12:00:00.000Z"),
      }),
    ).resolves.toEqual({ delivered: false });
    expect(messaging.messages).toEqual([]);
  });

  it("rechaza usuarios inexistentes", async () => {
    const useCase = new DeliverNextQuestion({
      users: new InMemoryUsers([]),
      questions: new InMemoryQuestions(question),
      events: new InMemoryEvents(),
      messaging: new InMemoryMessaging(),
      now: () => new Date("2026-05-27T12:30:00.000Z"),
    });

    await expect(
      useCase.execute({
        userId: "missing",
        scheduledFor: new Date("2026-05-27T12:00:00.000Z"),
      }),
    ).rejects.toEqual(new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND"));
  });
});
