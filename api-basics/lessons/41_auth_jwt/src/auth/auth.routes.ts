import { Router, Request, Response, NextFunction } from "express";
import * as service from "./auth.service";
import { users } from "../users/users.store";
import { error } from "node:console";
import { requireAuth } from "./auth.middleware";


export const authRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const body = (req.body ?? {}) as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "email and password are required" } });
      return;
    }

    const result = await service.login(email, password,);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }

});

// 正解
authRouter.post("/register", async (_req, res, next) => {
  try {
    const body = (_req.body ?? {}) as {
      name?: string;
      email?: string;
      password?: string;
      role?: any;
    };
    const { name, email, password, role } = body;

    if (!email || !name || !password || !role) {
      res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "email and password are required" } });
      return;
    }

const result = await service.register({
      name,
      email,
      password,
      role,
    });

    // const result = await service.register(name, email, password );
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});


// authRouter.post("/register", async (req, res, next) => {
//   try {
//     const body = (req.body ?? {}) as { email?: string; password?: string };
//     const { email, password } = body;


//     // メールアドレスの重複
//   if (users.some((u) => u.email === email)) {
//     return res.status(400).json(error("email already exists", [{ field: "email", reason: "duplicate" }]));
//   }

//   users.push();
//   res.status(201).json({ item: email });
//     // メールアドレスの重複終

//     const result = await service.login("email", "password");
//     res.status(200).json(result);
//   } catch (e) {
//     next(e);
//   }
  
// });