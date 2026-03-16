import express from "express";
import { tasksRouter } from "./tasks/tasks.routes";
import { usersRouter } from "./users/users.routes";

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use("/tasks", tasksRouter);
  app.use("/users", usersRouter);
  return app;
}

export function login() {
  const app = express();
  app.use(express.json());
  app.use("/tasks", tasksRouter);
  app.use("/users", usersRouter);
    //↑ルーターの読み込み
  return app;
}