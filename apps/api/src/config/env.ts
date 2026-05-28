import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

const envSchema = z.object({
  API_HOST: z.string().default("0.0.0.0"),
  API_PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url(),
  DEMO_USER_ID: z.string().min(1).optional(),
  DEMO_MODE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  INTERNAL_API_SECRET: z.string().min(1).optional(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  REDIS_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().optional(),
});

export type ApiEnv = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): ApiEnv {
  loadRootEnv(source);
  return envSchema.parse(source);
}

function loadRootEnv(target: NodeJS.ProcessEnv) {
  const rootEnvPath = resolve(process.cwd(), "../../.env");

  try {
    const rootEnv = readFileSync(rootEnvPath, "utf8");

    for (const line of rootEnv.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (!target[key]) {
        target[key] = value;
      }
    }
  } catch {
    // Root .env is optional; production should provide environment variables explicitly.
  }
}
