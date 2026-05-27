import { type ConnectionOptions, Worker } from "bullmq";
import pino from "pino";
import { loadEnv } from "./config/env.js";
import { sendQuestionJob, sendQuestionQueueName } from "./jobs/send-question-job.js";

const env = loadEnv();
const logger = pino({ level: env.LOG_LEVEL });
const redisUrl = new URL(env.REDIS_URL);
const connection: ConnectionOptions = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port || 6379),
  username: redisUrl.username || undefined,
  password: redisUrl.password || undefined,
  maxRetriesPerRequest: null,
};

const worker = new Worker(sendQuestionQueueName, sendQuestionJob, {
  connection,
});

worker.on("completed", (job) => {
  logger.info({ jobId: job.id, queue: job.queueName }, "job completed");
});

worker.on("failed", (job, error) => {
  logger.error({ error, jobId: job?.id, queue: job?.queueName }, "job failed");
});

logger.info({ queue: sendQuestionQueueName }, "worker started");
