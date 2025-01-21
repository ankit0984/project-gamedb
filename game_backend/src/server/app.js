import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "../db/logger.js";
import compression from "compression";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { limiter } from "../middleware/rateLimiter.js";
import dotenv from "dotenv";

dotenv.config("../.env");

const app = express();

app.use(helmet());
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
app.use(limiter);
app.use(express.json({ limit: "36kb" }));
app.use(express.urlencoded({ extended: true, limit: "36kb" }));
app.use(cookieParser());
app.use(compression());
app.use(ExpressMongoSanitize());

// cors
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Total-Count"],
};

app.use(cors(corsOptions));

// routers for route
import { auth_router } from "../routes/auth.routes.js";
import { game_router } from "../routes/gamedb.routes.js";
import { errorHandler } from "../middleware/errorHandelre.js";

app.use("/api", auth_router);
app.use("/api", game_router);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

export default app;
