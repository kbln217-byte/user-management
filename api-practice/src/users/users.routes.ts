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


//一覧取得
usersRouter.get("/", async(req, res ,next) => {
  try{
// users.serviceを呼び出し
  const users = await service.findAllUsers
  res.status(200).json({ users });

  } catch(error) {
    next(error)
  }

});

//詳細取得
usersRouter.get("/:id", async(req, res ,next) => {
  try{
// idを定義
  const id = Number(req.params.id);
  // users.serviceを呼び出し
  const user = await service.findById(id);
  res.status(200).json({ user });
  
  } catch(error) {
    next(error)
  }

});


//更新（PUT）
usersRouter.put("/:id",async(req, res ,next) => {
try{
  const id = Number(req.params.id);


  const user = await service.putUsers(id);

  res.status(200).json({ user });
  
} catch(error) {
 next(error)
}
});


// //   IDに一致するユーザー取得
//   const user = users.find((u) => u.id === id);
// //   ユーザーがいなかった場合は404
//   if (!user) return res.status(404).json(notFoundError("user not found"));

// //   リクエストＢＯＤＹからＮＡＭＥとＥＭＡＩＬを取得
//   const { name, email } = req.body ?? {};
// //   エラーディテールを初期化
//   const details: { field: string; reason: string }[] = [];
// // ＮＡＭＥが空の場合
//   if (!isNonEmptyString(name)) details.push({ field: "name", reason: "required" });
// //   ＥＭＡＩＬが空の場合
//   if (!isNonEmptyString(email)) details.push({ field: "email", reason: "required" });
// //   ＥＭＡＩＬの入力フォーマット
//   if (isNonEmptyString(email) && !looksLikeEmail(email)) details.push({ field: "email", reason: "invalid_format" });

//   if (details.length) return res.status(400).json(validationError("invalid request", details));
//   if (users.some((u) => u.email === email && u.id !== id)) {
//     return res.status(400).json(validationError("email already exists", [{ field: "email", reason: "duplicate" }]));
//   }

//     if (users.some((u) => u.email === email)) {
//     return res.status(400).json(validationError("email already exists", [{ field: "email", reason: "duplicate" }]));
//   }
//   user.name = name.trim();
//   user.email = email.trim();
//   res.status(200).json({ item: user });


usersRouter.delete("/:id",async(req, res ,next) => {
try{
  const id = Number(req.params.id);
  const deletedUser = await service.deletedUser(id);

  res.status(204).json({ deletedUser });
  
} catch(error) {
 next(error)
}
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
