import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DELIVERY_CHANNEL: z.enum(["auto", "email", "log"]).default("auto"),
  EMAIL_FROM: z.string().email().default("aprendizaje@example.com"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  REDIS_URL: z.string().url(),
  RESEND_API_KEY: z.string().optional(),
});

export type WorkerEnv = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): WorkerEnv {
  return envSchema.parse(source);
}
