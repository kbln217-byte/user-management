//HTTP受付

import { Router } from "express";
import * as service from "./tasks.service";

export const tasksRouter = Router();


tasksRouter.post("/register",  async(req, res ,next) => {
  try {
    //リクエストデータの受け取り（まずはリクエスト情報が欲しい。req.bodyは{"name":"xxx","email":"xxx","password":"xxx"}
    const body = (req.body ?? {}) as {
  title: string;
  done: boolean;
  userId: number;
    };

    //リクエストデータを分割代入
 const { title, done, userId } = body;
//➡正しく書くと
// const name = body.name
// const email = body.email
// const password = body.password

//バリデーション処理(email重複確認と必須項目入力チェック等)nameとPW必須チェックとemailの重複
      if (!title || !userId == null || typeof done == "undefined") {
      res.status(400).json({ error: { 
        code: "VALIDATION_ERROR", 
        message: "名前・メールアドレス・パスワードは必須です" 
      } });
      return;
    }
   
//バリデーションが終わったらエラーを表示する
// const result = usersサービス、regisuter関数を呼び出す
     const result = await service.register({
  title,
  done,
  userId    });

// 上記に該当しなければ登録を繰り返す
res.status(201).json(result);
  } catch (e) {
    next(e);
  }
  
});


//一覧取得
tasksRouter.get("/", async(req, res ,next) => {
  try{
// users.serviceを呼び出し
  const tasks = await service.findAllTask()
  res.status(200).json({ tasks });

  } catch(error) {
    next(error)
  }

});

//詳細取得
tasksRouter.get("/:id", async(req, res ,next) => {
  try{
// idを定義
  const id = Number(req.params.id);
  // tasks.serviceを呼び出し
  const tasks = await service.findByTasks(id);
  res.status(200).json({ tasks });
  
  } catch(error) {
    next(error)
  }
});


//更新（PUT）
tasksRouter.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const body = (req.body ?? {}) as {
      title?: unknown;
      done?: unknown;
      userId?: unknown;
    };

    const title = body.title;
    const done = body.done;
    const userId = body.userId;

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "invalid id" });
    }
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "title is required" });
    }
    if (typeof done !== "boolean") {
      return res.status(400).json({ message: "done must be boolean" });
    }
    if (typeof userId !== "number") {
      return res.status(400).json({ message: "userId must be number" });
    }
    const task = await service.putTaskRepo(id, title, done, userId);

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
});


tasksRouter.delete("/:id",async(req, res ,next) => {
try{
  const id = Number(req.params.id);
  const deletedTask = await service.deletedTask(id);

  res.status(204).json({ deletedTask });
  
} catch(error) {
 next(error)
}
});
