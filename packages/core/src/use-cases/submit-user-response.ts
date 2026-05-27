import type { UserResponse } from "../domain/user-response.js";
import type { LearningEventRepository } from "../ports/learning-event-repository.js";
import type { QuestionRepository } from "../ports/question-repository.js";
import type { SpacedRepetitionScheduler } from "../ports/spaced-repetition-scheduler.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";

export type SubmitUserResponseInput = {
  userId: string;
  questionId: string;
  answerId?: string;
  responseText?: string;
  responseTimeMs: number;
  attemptNumber: number;
  channel: UserResponse["channel"];
};

export type SubmitUserResponseResult = {
  response: UserResponse;
  feedback: string;
};

type Dependencies = {
  users: UserRepository;
  questions: QuestionRepository;
  events: LearningEventRepository;
  scheduler: SpacedRepetitionScheduler;
  now: () => Date;
};

export class SubmitUserResponse {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: SubmitUserResponseInput): Promise<SubmitUserResponseResult> {
    const submittedAt = this.dependencies.now();
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const question = await this.dependencies.questions.findByIdWithAnswers(input.questionId);

    if (!question) {
      throw new UseCaseError("No encontramos esa pregunta.", "QUESTION_NOT_FOUND");
    }

    const selectedAnswer = input.answerId
      ? question.answers.find((answer) => answer.id === input.answerId)
      : undefined;

    if (input.answerId && !selectedAnswer) {
      throw new UseCaseError("La respuesta no pertenece a esta pregunta.", "ANSWER_NOT_FOUND");
    }

    const isCorrect = selectedAnswer?.isCorrect ?? false;
    const response = await this.dependencies.questions.saveUserResponse({
      ...input,
      isCorrect,
      submittedAt,
    });

    await this.dependencies.events.append({
      userId: input.userId,
      questionId: input.questionId,
      kind: "response_submitted",
      occurredAt: submittedAt,
      payload: {
        answerId: input.answerId,
        channel: input.channel,
        isCorrect,
        responseTimeMs: input.responseTimeMs,
      },
    });

    await this.dependencies.scheduler.recordReview({
      userId: input.userId,
      conceptIds: question.conceptIds,
      isCorrect,
      reviewedAt: submittedAt,
    });

    return {
      response,
      feedback: buildFeedback(isCorrect, selectedAnswer?.explanation),
    };
  }
}

function buildFeedback(isCorrect: boolean, explanation?: string): string {
  if (isCorrect) {
    return explanation
      ? `Tu respuesta coincide con la esperada. ${explanation}`
      : "Tu respuesta coincide con la esperada.";
  }

  return explanation
    ? `Aquí hay algo que vale la pena revisar. ${explanation}`
    : "Aquí hay algo que vale la pena revisar antes de seguir.";
}
