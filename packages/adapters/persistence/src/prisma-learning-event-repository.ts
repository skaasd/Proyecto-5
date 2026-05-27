import type { Prisma, PrismaClient } from "@prisma/client";
import type { LearningEvent, LearningEventRepository } from "@project-name/core";

export class PrismaLearningEventRepository implements LearningEventRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async append(event: LearningEvent): Promise<void> {
    await this.prisma.learningEvent.create({
      data: {
        userId: event.userId,
        questionId: event.questionId,
        type: mapEventType(event.kind),
        payload: event.payload as Prisma.InputJsonValue,
        occurredAt: event.occurredAt,
      },
    });
  }
}

function mapEventType(kind: LearningEvent["kind"]) {
  switch (kind) {
    case "response_submitted":
      return "RESPONSE_SUBMITTED";
    case "question_sent":
      return "QUESTION_SENT";
    case "feedback_viewed":
      return "FEEDBACK_VIEWED";
    case "preferences_updated":
      return "PREFERENCES_UPDATED";
  }
}
