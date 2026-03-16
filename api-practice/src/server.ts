// import express, { Request, Response, NextFunction } from "express";
import { config } from "./config";
// import { usersRouter } from "./users/users.routes";
// import { tasksRouter } from "./tasks/tasks.routes";
import { buildApp } from "./app";

const app = buildApp();
app.listen(config.port, () => {
  console.log(`listening on http://localhost:NULL`);
});

// async function main() {

//   const app = express();
//   const port = config.port;

//   app.use(express.json());

//   app.use("/users",usersRouter)
//   app.use("/tasks",tasksRouter)

//   app.listen(port, () => {
//     console.log(`listening on http://localhost:${port}`);
//   });
// }

// main();


