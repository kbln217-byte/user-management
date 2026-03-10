import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { logInfo, logError } from "./lib/logger";
import { config } from "./lib/config";

// 呪文

const app = express();
const port = config.port;
// 呪文

// JSONを受け取れるようにする（POST/PUTで必要）
app.use(express.json());


// CORS
app.use(cors({ origin: config.corsOrigin }));

// リスクエストログ
app.use((req, _res, next) => {
  logInfo("request", { method: req.method, path: req.path });
  next();
});


// ヘルスチェック（稼働確認）
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
  // throw new Error("boom")
});

// ダミーデータ
type User = { id: number; name: string };
const users: User[] = [
  { id: 1, name: "Taro" },
  { id: 2, name: "Hanako" },
];

// 一覧
app.get("/users", (_req: Request, res: Response) => {
  res.status(200).json({ items: users });
});

// 演習1：1件取得を追加（ユーザー詳細取得）
app.get("/users/:id", (_req: Request, res: Response) => {

    const id = Number(_req.params.id);
    console.log(id);
    const user = users.find((u) => u.id === id);
    console.log(user);
    if(!user){
        return res.status(404).json({message: "ユーザーはいません。" })
    }
    res.status(200).json({item: user });
});

// 正解
// app.get("/users/:id", (_req: Request, res: Response) => {

//     const id = Number(_req.params.id);
//     console.log(id);
//     const user = users.find((u) => u.id === id);
//     console.log(user);
//     if(!user) {
//         return res.status(404).json({message: "ユーザーはいません。" })
//     }
//     res.status(200).json({item: user });
// });

// 共通エラーハンドリング

app.use((err: unknown, _req: Request, res: Response, _next: unknown) => {
  logError("unexpected error", { err: String(err) });
  res.status(500).json({
    error: { code: "INTERNAL_SERVER_ERROR", message: "unexpected error" },
  });
});

// app.listen(port, () => {
//   console.log(`Server running: http://localhost:5432`);
// });

// 演習2：POSTで追加（ダミーでOK）
// curl -Method POST http://localhost:3000/users -Headers @{ "Content-Type" = "application/json" } -Body '{"name":"Jiro"}'
app.post("/users", (req: Request, res: Response) => {
  const { name } = req.body;
//   分割代入↑

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  const newUser: User = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  res.status(201).json({ item: newUser });
});


// const port = 4000;
app.listen(config.port, () => {
  console.log(`Server running: http://localhost:4000`);
});