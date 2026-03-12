// import express, { Request, Response, NextFunction } from "express";
// import { config } from "./config";
// import { authRouter } from "./auth/auth.routes";
// import { usersRouter } from "./users/users.routes";
// import type { HttpError } from "./auth/auth.service";

// async function main() {

//   const app = express();
//   app.use(express.json());

//   app.use("/auth", authRouter);
//   app.use("/users", usersRouter);

//   app.use((_req: Request, res: Response) => {
//     res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } });
//   });

//   app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
//     const e = err as Partial<HttpError>;
//     if (typeof e.status === "number" && typeof e.code === "string") {
//       res.status(e.status).json({ error: { code: e.code, message: e.message ?? "Error" } });
//       return;
//     }
//     console.error(err);
//     res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unexpected error" } });
//   });

//   app.listen(config.port, () => {
//     console.log(`listening on http://localhost:NULL`);
//   });
// }

// main();


// import express, { Request, Response, NextFunction } from "express";
// import { config } from "./config";
// import { authRouter } from "./auth/auth.routes";
// import { usersRouter } from "./users/users.routes";
// import { seedUsers } from "./users/users.seed";
// import type { HttpError } from "./auth/auth.service";





// async function main() {
//   await seedUsers();

//   const app = express();
//   app.use(express.json());

//   app.use("/auth", authRouter);
//   app.use("/users", usersRouter);

//   app.use((_req: Request, res: Response) => {
//     res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } });
//   });

//   app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
//     const e = err as Partial<HttpError>;
//     if (typeof e.status === "number" && typeof e.code === "string") {
//       res.status(e.status).json({ error: { code: e.code, message: e.message ?? "Error" } });
//       return;
//     }
//     console.error(err);
//     res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Unexpected error" } });
//   });

//   app.listen(config.port, () => {
//     console.log(`listening on http://localhost:NULL`);
//   });

// }

// main();

// app分離
import { buildApp } from "./app";
import { config } from "./config";

const app = buildApp();
app.listen(config.port, () => {
  console.log(`listening on http://localhost:NULL`);
});