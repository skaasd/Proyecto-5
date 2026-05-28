import { Queue } from "bullmq";
import { loadEnv } from "../config/env.js";
import { buildRedisConnection } from "../config/redis.js";
import { type SendQuestionJobData, sendQuestionQueueName } from "./send-question-job.js";

const env = loadEnv();
const userId = process.argv[2] ?? "user_demo";
const scheduledFor = process.argv[3] ?? new Date().toISOString();

const queue = new Queue<SendQuestionJobData>(sendQuestionQueueName, {
  connection: buildRedisConnection(env.REDIS_URL),
});

const job = await queue.add("deliver-next-question", {
  userId,
  scheduledFor,
});

await queue.close();

console.log(`Enqueued ${sendQuestionQueueName} job ${job.id} for ${userId} at ${scheduledFor}`);
