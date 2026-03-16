import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import { logInfo, logError } from "./lib/logger";
import { config } from "./lib/config";
import cors from "cors";
import { seedDemoUser } from "./lib/seed";



const app = express();
const port = Number(process.env.PORT ?? 3000);

// JSONを受け取れるようにする（POST/PUTで必要）
app.use(express.json());

app.use(cors({ origin: config.corsOrigin }));

app.use((req, _res, next) => {
  logInfo("request", { method: req.method, path: req.path });
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/users", usersRouter);

app.use("/auth", authRouter);

app.use((err: unknown, _req: Request, res: Response, _next: unknown) => {
  logError("unexpected error", { err: String(err) });
  res.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "unexpected error" },
  });
});

//API起動時にダミーuserをインサート
seedDemoUser().catch(console.error);

app.listen(port, () => {
  console.log(`API listening on: http://localhost:${port}`);
});