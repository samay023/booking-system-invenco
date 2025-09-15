import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import hpp from "hpp";
import { xss } from "express-xss-sanitizer";
import classesRouter from "./modules/classes/classes.routes";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "1mb" })); // prevent large payload DOS
app.use(
  cors({
    origin: [process.env.ALLOWED_CORS_ORIGIN ?? "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(xss()); // Prevent cross site scripting attacks e.g. <script>alert('XSS')</script>
app.use(hpp()); // Prevent HTTP Parameter Pollution e.g. ?sort=price&sort=rating

app.get("/health", (_req: Request, res: Response) => {
  const response: ApiResponseBody<{ status: string; timestamp: string }> = {
    success: true,
    payload: { status: "OK", timestamp: new Date().toISOString() },
    error: null,
  };
  res.status(200).json(response);
});

// Set up routes
app.use("/classes", classesRouter);

export default app;
