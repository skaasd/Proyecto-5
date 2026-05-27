import type { Job } from "bullmq";

export const sendQuestionQueueName = "send-question";

export type SendQuestionJobData = {
  userId: string;
  scheduledFor: string;
};

export async function sendQuestionJob(job: Job<SendQuestionJobData>): Promise<void> {
  job.log(`Question scheduling placeholder for user ${job.data.userId}`);
}
