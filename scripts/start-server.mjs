import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const port = process.env.PORT || "3000";
const host = process.env.HOST || "0.0.0.0";
const nextCli = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

console.log(`Starting Next.js on ${host}:${port}...`);
const processHandle = spawn(
  process.execPath,
  [nextCli, "start", "--hostname", host, "--port", port],
  { stdio: "inherit" },
);

processHandle.on("exit", (code) => process.exit(code ?? 0));
