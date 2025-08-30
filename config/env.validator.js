import dotenv from "dotenv";
import { body, validationResult } from "express-validator";

// Load .env file
dotenv.config();

/**
 * Validate environment variables before starting the server
 */
export const validateEnv = () => {
  const errors = [];

  // ✅ Check PORT
  const port = process.env.PORT;
  if (!port) {
    errors.push("❌ PORT is missing in .env file");
  } else if (isNaN(port) || port <= 0 || port > 65535) {
    errors.push("❌ PORT must be a valid number between 1 and 65535");
  }

  if (errors.length > 0) {
    console.error("Environment Validation Failed:");
    errors.forEach((err) => console.error(err));
    process.exit(1); // Stop app if env is invalid
  } else {
    console.log(`✅ Environment validated successfully (PORT=${port})`);
  }
};
