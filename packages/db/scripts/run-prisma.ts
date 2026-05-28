import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadRootEnv } from "./load-root-env.js";

loadRootEnv();

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const prismaCommand =
  process.platform === "win32"
    ? resolve(packageRoot, "node_modules/.bin/prisma.cmd")
    : resolve(packageRoot, "node_modules/.bin/prisma");
const env = Object.fromEntries(
  Object.entries(process.env).filter(
    (entry): entry is [string, string] => !entry[0].startsWith("=") && typeof entry[1] === "string",
  ),
);
const command = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : prismaCommand;
const args =
  process.platform === "win32"
    ? ["/d", "/s", "/c", prismaCommand, ...process.argv.slice(2)]
    : process.argv.slice(2);
const child = spawn(command, args, {
  env,
  shell: false,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
