import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import bugRoutes from "./routes/bugRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: "100kb" }));
app.use(requestLogger);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      service: "buglab-api",
      status: "ok"
    }
  });
});

app.use("/api/bugs", bugRoutes);

app.use(notFound);
app.use(errorHandler);
