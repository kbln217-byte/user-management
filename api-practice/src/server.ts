import express, { Request, Response, NextFunction } from "express";
// import { config } from "./config";
// import { authRouter } from "./auth/auth.routes";
// import { usersRouter } from "./users/users.routes";
// import type { HttpError } from "./auth/auth.service";

async function main() {

  const app = express();
  app.use(express.json());

    app.listen( () => {
    console.log("サーバーが動きました。");
  });
}

main();
