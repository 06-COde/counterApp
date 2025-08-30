import express from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";

import errorHandler from "./middlewares/error.handler.js";
import socketHandler from "./socket/socket.io.js";
import clusterManager from "./cluster/cluster.handling.js";
import counterRoutes from "./routes/counter.routes.js";
import { validateEnv } from "./config/env.validator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;

// Worker logic
const startWorker = async () => {
  const app = express();

  validateEnv();
  // Middlewares
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  // ✅ Health Check route
  app.get("/health", (req, res) => {
    res.json({
      success: true,
      message: "🚀 Server is healthy and running",
      pid: process.pid,
      uptime: process.uptime(),
    });
  });

  app.get("/", (req, res) => {
    res.send("🚀 Chat Server is Running...");
  });

  // Counter routes
  app.use("/api", counterRoutes);

  // Error handler
  app.use(errorHandler);

  // HTTP + Socket.IO
  const server = http.createServer(app);
  const io = new SocketIOServer(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  socketHandler(io);

  server.listen(PORT, () => {
    console.log(
      `[${new Date().toISOString()}] Worker ${process.pid} listening on http://localhost:${PORT}`
    );
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log(`[${new Date().toISOString()}] Worker ${process.pid} shutting down...`);
    server.close(() => process.exit(0));
  });
};

clusterManager(startWorker);
