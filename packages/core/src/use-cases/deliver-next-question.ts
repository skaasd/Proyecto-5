import type { LearningEventRepository } from "../ports/learning-event-repository.js";
import type { MessagingChannel } from "../ports/messaging-channel.js";
import type { QuestionRepository } from "../ports/question-repository.js";
import type { UserRepository } from "../ports/user-repository.js";
import { UseCaseError } from "./errors.js";

export type DeliverNextQuestionInput = {
  userId: string;
  scheduledFor: Date;
};

export type DeliverNextQuestionResult = {
  delivered: boolean;
  questionId?: string;
};

type Dependencies = {
  users: UserRepository;
  questions: QuestionRepository;
  events: LearningEventRepository;
  messaging: MessagingChannel;
  channelName?: string;
  now: () => Date;
};

export class DeliverNextQuestion {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(input: DeliverNextQuestionInput): Promise<DeliverNextQuestionResult> {
    const user = await this.dependencies.users.findById(input.userId);

    if (!user) {
      throw new UseCaseError("No encontramos ese usuario.", "USER_NOT_FOUND");
    }

    const question = await this.dependencies.questions.findNextForUser(input.userId);

    if (!question) {
      return { delivered: false };
    }

    await this.dependencies.messaging.send({
      userId: input.userId,
      subject: "Tu siguiente quest de QA",
      body: renderQuestionMessage(
        question.prompt,
        question.concepts.map((concept) => concept.name),
      ),
    });

    await this.dependencies.events.append({
      userId: input.userId,
      questionId: question.id,
      kind: "question_sent",
      occurredAt: this.dependencies.now(),
      payload: {
        channel: this.dependencies.channelName ?? "worker",
        conceptIds: question.conceptIds,
        scheduledFor: input.scheduledFor.toISOString(),
      },
    });

    return {
      delivered: true,
      questionId: question.id,
    };
  }
}

function renderQuestionMessage(prompt: string, conceptNames: string[]): string {
  const concepts = conceptNames.length > 0 ? `\n\nConceptos: ${conceptNames.join(", ")}` : "";
  return `${prompt}${concepts}`;
}
