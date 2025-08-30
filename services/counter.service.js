import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { logChange } from "./logger.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "../data");
const counterFile = path.join(dataDir, "counter.txt");

// Ensure counter file exists
export const ensureFileExists = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  if (!fs.existsSync(counterFile)) {
    console.log("Creating counter file...");
    fs.writeFileSync(counterFile, "0", "utf-8");
  }
};

// Read counter from file (async, safe)
export const readCount = () => {
  return new Promise((resolve, reject) => {
    let data = "";
    const readStream = fs.createReadStream(counterFile, "utf8");

    readStream.on("data", (chunk) => (data += chunk));
    readStream.on("end", () => resolve(parseInt(data, 10) || 0));
    readStream.on("error", (err) => reject(err));
  });
};

// Write counter to file (async)
export const writeCount = (count) => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(counterFile);
    writeStream.write(count.toString());
    writeStream.end();
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

// ✅ Core counter operations
export const getCounter = async () => {
  ensureFileExists();
  return await readCount();
};

export const increment = async () => {
  ensureFileExists();
  const current = await readCount();
  const newCount = current + 1;
  await writeCount(newCount);
  logChange(`Incremented → ${newCount}`);
  return newCount;
};

export const decrement = async () => {
  ensureFileExists();
  const current = await readCount();
  const newCount = current > 0 ? current - 1 : 0;
  await writeCount(newCount);
  logChange(`Decremented → ${newCount}`);
  return newCount;
};

export const reset = async () => {
  ensureFileExists();
  await writeCount(0);
  logChange("Reset → 0");
  return 0;
};


