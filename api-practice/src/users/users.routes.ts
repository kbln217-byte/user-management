//HTTP受付

import { Router } from "express";
import * as service from "./users.service";

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


usersRouter.get("/:id", Router, (req: Router, res: any) => {
  res.status(200).json({ id: req.use });
});


usersRouter.get("/", Router, (req: Router, res: any) => {
  res.status(200).json({ Task: req.use });
});


usersRouter.put("/:id", Router, (req: Router, res: any) => {
  res.status(200).json({ id: req.use });
});


usersRouter.put("/", Router, (req: Router, res: any) => {
  res.status(200).json({ Task: req.use });
});

usersRouter.delete("/:id", Router, (req: Router, res: any) => {
  res.status(200).json({ id: req.use });
});


usersRouter.delete("/", Router, (req: Router, res: any) => {
  res.status(200).json({ Task: req.use });
});


// import { Router } from "express";
// import { requireAuth, requireRole, AuthedRequest } from "../auth/auth.middleware";

// export const usersRouter = Router();

// usersRouter.get("/me", requireAuth, (req: AuthedRequest, res) => {
//   res.status(200).json({ me: req.user });
// });

// usersRouter.get("/admin/secret", requireAuth, requireRole("admin"), (_req, res) => {
//   res.status(200).json({ secret: "admin-only" });
// });

// usersRouter.get("/editor/secret", requireAuth, requireRole("editor"), (_req, res) => {
//   res.status(200).json({ secret: "editor-only" });
// });
