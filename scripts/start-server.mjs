import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const port = process.env.PORT || "8787";
const ip = process.env.HOST || "0.0.0.0";

const wranglerPath = fileURLToPath(new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url));
const sitesEnvPath = fileURLToPath(new URL("./sites-env.mjs", import.meta.url));

const args = [
  "--import", sitesEnvPath,
  wranglerPath, "dev",
  "--config", "dist/server/wrangler.json",
  "--local",
  "--persist-to", ".wrangler/state",
  "--ip", ip,
  "--port", port,
  "--inspector-port", "0"
];

console.log(`Starting production server on ${ip}:${port}...`);
const proc = spawn(process.execPath, args, { stdio: "inherit" });
proc.on("exit", (code) => process.exit(code ?? 0));
