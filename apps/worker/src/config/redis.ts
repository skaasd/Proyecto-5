import type { ConnectionOptions } from "bullmq";

export function buildRedisConnection(redisUrlValue: string): ConnectionOptions {
  const redisUrl = new URL(redisUrlValue);

  return {
    host: redisUrl.hostname,
    port: Number(redisUrl.port || 6379),
    username: redisUrl.username || undefined,
    password: redisUrl.password || undefined,
    maxRetriesPerRequest: null,
  };
}
