import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webDir = dirname(fileURLToPath(import.meta.url));
const rootEnvPath = resolve(webDir, "../../.env");

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

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
} catch {
  // Root .env is optional; CI and production should provide real environment variables.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@project-name/db"],
};

export default nextConfig;
