import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import databasePlugin from "./plugins/database";
import clientRoutes from "./routes/clients";

dotenv.config();

const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// Register plugins
fastify.register(cors, {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
});

fastify.register(databasePlugin);

// Health check
fastify.get("/health", async () => {
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

// Register routes
fastify.register(clientRoutes, { prefix: "/api/clients" });

// 404 handler
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    success: false,
    error: `Route ${request.method}:${request.url} not found`,
  });
});

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  reply.status(error.statusCode || 500).send({
    success: false,
    error: error.message || "Internal server error",
  });
});

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "3001");
    await fastify.listen({ port, host: "0.0.0.0" });
    fastify.log.info(`🚀 Server running on http://localhost:${port}`);
    fastify.log.info(`📚 API: http://localhost:${port}/api`);
    fastify.log.info(`💊 Health: http://localhost:${port}/health`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
