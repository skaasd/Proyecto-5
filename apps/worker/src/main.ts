import { DeliverNextQuestion, type MessagingChannel } from "@project-name/core";
import { prisma } from "@project-name/db";
import {
  PrismaLearningEventRepository,
  PrismaQuestionRepository,
  PrismaUserRepository,
} from "@project-name/persistence";
import { Worker } from "bullmq";
import pino from "pino";
import { loadEnv } from "./config/env.js";
import { buildRedisConnection } from "./config/redis.js";
import { buildSendQuestionJob, sendQuestionQueueName } from "./jobs/send-question-job.js";
import { LogMessagingChannel } from "./messaging/log-messaging-channel.js";
import { ResendEmailService } from "./messaging/resend-email-service.js";
import { UserEmailMessagingChannel } from "./messaging/user-email-messaging-channel.js";

const env = loadEnv();
const logger = pino({ level: env.LOG_LEVEL });
const connection = buildRedisConnection(env.REDIS_URL);
const users = new PrismaUserRepository(prisma);
const deliveryChannelName =
  env.DELIVERY_CHANNEL === "auto" ? (env.RESEND_API_KEY ? "email" : "log") : env.DELIVERY_CHANNEL;
const messaging: MessagingChannel =
  deliveryChannelName === "email" && env.RESEND_API_KEY
    ? new UserEmailMessagingChannel(
        users,
        new ResendEmailService({
          apiKey: env.RESEND_API_KEY,
          from: env.EMAIL_FROM,
        }),
      )
    : new LogMessagingChannel(logger);

if (deliveryChannelName === "email" && !env.RESEND_API_KEY) {
  logger.warn(
    "DELIVERY_CHANNEL=email requested without RESEND_API_KEY; falling back to log delivery",
  );
}

const deliverNextQuestion = new DeliverNextQuestion({
  channelName: deliveryChannelName,
  events: new PrismaLearningEventRepository(prisma),
  messaging,
  now: () => new Date(),
  questions: new PrismaQuestionRepository(prisma),
  users,
});

const worker = new Worker(sendQuestionQueueName, buildSendQuestionJob(deliverNextQuestion), {
  connection,
});

worker.on("completed", (job) => {
  logger.info({ jobId: job.id, queue: job.queueName }, "job completed");
});

worker.on("failed", (job, error) => {
  logger.error({ error, jobId: job?.id, queue: job?.queueName }, "job failed");
});

logger.info({ queue: sendQuestionQueueName }, "worker started");
