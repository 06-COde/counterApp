import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, "../logs");
const logPath = path.join(logsDir, "logs.txt");

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, "");

export const logChange = (msg) => {
  const line = `${new Date().toISOString()} - ${msg}\n`;
  fs.appendFileSync(logPath, line);
};
