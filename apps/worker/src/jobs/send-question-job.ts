import type { DeliverNextQuestionInput, DeliverNextQuestionResult } from "@project-name/core";
import type { Job } from "bullmq";

export const sendQuestionQueueName = "send-question";

export type SendQuestionJobData = {
  userId: string;
  scheduledFor: string;
};

export type DeliverNextQuestionRunner = {
  execute(input: DeliverNextQuestionInput): Promise<DeliverNextQuestionResult>;
};

export function buildSendQuestionJob(deliverNextQuestion: DeliverNextQuestionRunner) {
  return async function sendQuestionJob(job: Job<SendQuestionJobData>): Promise<void> {
    const scheduledFor = new Date(job.data.scheduledFor);

    if (Number.isNaN(scheduledFor.getTime())) {
      throw new Error(`Invalid scheduledFor value: ${job.data.scheduledFor}`);
    }

    const result = await deliverNextQuestion.execute({
      userId: job.data.userId,
      scheduledFor,
    });

    if (result.delivered) {
      await job.log(`Delivered question ${result.questionId} to user ${job.data.userId}`);
      return;
    }

    await job.log(`No available question for user ${job.data.userId}`);
  };
}
