//HTTP受付

import { Router } from "express";
import * as service from "./auth.service";

export const usersRouter = Router();

//　新規作成時
usersRouter.post("/register",  async(req, res ,next) => {
  try {
    //リクエストデータの受け取り（まずはリクエスト情報が欲しい。req.bodyは{"name":"xxx","email":"xxx","password":"xxx"}
    const body = (req.body ?? {}) as {
      name?: string;
      email?: string;
      password?: string;
    };

    //リクエストデータを分割代入
 const { name, email, password } = body;
//➡正しく書くと
// const name = body.name
// const email = body.email
// const password = body.password

//バリデーション処理(email重複確認と必須項目入力チェック等)nameとPW必須チェックとemailの重複
    if (!name|| !email || !password) {
      res.status(400).json({ error: { 
        code: "VALIDATION_ERROR", 
        message: "名前・メールアドレス・パスワードは必須です" 
      } });
      return;
    }
   
//バリデーションが終わったらエラーを表示する
// const result = usersサービス、regisuter関数を呼び出す
     const result = await service.register({
      name,
      email,
      password,
    });

// 上記に該当しなければ登録を繰り返す
res.status(201).json(result);
  } catch (e) {
    next(e);
  }
  
});










// import { Router, Request, Response, NextFunction } from "express";
// import * as service from "./auth.service";
// import { users } from "../users/users.store";
// import { error } from "node:console";
// import { requireAuth } from "./auth.middleware";


// export const authRouter = Router();

// authRouter.post("/login", async (req, res, next) => {
//   try {
//     const body = (req.body ?? {}) as { email?: string; password?: string };
//     const { email, password } = body;

//     if (!email || !password) {
//       res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "email and password are required" } });
//       return;
//     }

//     const result = await service.login(email, password,);
//     res.status(200).json(result);
//   } catch (e) {
//     next(e);
//   }

// });

// // 正解
// authRouter.post("/register", async (_req, res, next) => {
//   try {
//     const body = (_req.body ?? {}) as {
//       name?: string;
//       email?: string;
//       password?: string;
//     };
//     const { name, email, password } = body;

//     if (!email || !name || !password ) {
//       res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "namea and email and password are required" } });
//       return;
//     }

// const result = await service.register(
//       name,
//       email,
//       password,
//     );

//     // const result = await service.register(name, email, password );
//     res.status(201).json(result);
//   } catch (e) {
//     next(e);
//   }
// });

