import { Router, Request, Response } from "express";
import { isNonEmptyString, looksLikeEmail } from "../lib/validate";
import { notFoundError, validationError } from "../lib/errors";

export type User = { id: number; name: string; email: string; createdAt: string };

const router = Router();

let nextId = 3;
const users: User[] = [
  { id: 1, name: "Taro", email: "taro@example.com", createdAt: new Date().toISOString() },
  { id: 2, name: "Hanako", email: "hanako@example.com", createdAt: new Date().toISOString() },
];

// GET /users
router.get("/", (_req: Request, res: Response) => {
    console.log(_req.query);
    const q =_req.query.q as string | undefined;
    let result = users;

  if (q) {
    result = users.filter((u) =>
    u.name.toLowerCase().includes(q.toLowerCase())
); 
  }

  res.status(200).json({ items: result, page: 1, limit: 20, total: users.length });
});

// 演習2：ページング（page/limit）
router.get("/", (_req: Request, res: Response) => {
    console.log(_req.query);
    const q =_req.query.q as string | undefined;
    const { page, limit} = _req.query;
    console.log(limit);
    console.log(page);
    let result = users;
    const details: {field : string; reason: string }[]=[];

    if (q) {
    result = users.filter((u) =>
    u.name.toLowerCase().includes(q.toLowerCase())    ); 
    }
    const pageNum = Number(page);
    const limitNum = Number(limit);

    if(!Number.isInteger(pageNum) || pageNum <= 0) {
        details.push({ field: "page", reason: "pageは数字で指定してください。"})
    }
    
    if(!Number.isInteger(limitNum) || limitNum <= 0) {
        details.push({ field: "limit", reason: "limitは数字で指定してください。"})
    }
    if(details.length) return res.status(400).json(validationError("invalid request", details));

    res.status(200).json({ items: result, page:pageNum, limit: limitNum, total: users.length });
});


// GET /users/:id
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json(notFoundError("user not found"));
  res.status(200).json({ item: user });
});

// POST /users
router.post("/", (req: Request, res: Response) => {
  const { name, email } = req.body ?? {};
  const details: { field: string; reason: string }[] = [];

  if (!isNonEmptyString(name)) details.push({ field: "name", reason: "required" });
  if (!isNonEmptyString(email)) details.push({ field: "email", reason: "required" });
  if (isNonEmptyString(email) && !looksLikeEmail(email)) details.push({ field: "email", reason: "invalid_format" });

  if (details.length) return res.status(400).json(validationError("invalid request", details));

  // email重複チェック（簡易）
  if (users.some((u) => u.email === email)) {
    return res.status(400).json(validationError("email already exists", [{ field: "email", reason: "duplicate" }]));
  }

  const user: User = {
    id: nextId++,
    name: name.trim(),
    email: email.trim(),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  res.status(201).json({ item: user });
});

// PUT /users/:id
router.put("/:id", (req: Request, res: Response) => {
    // ID取得
  const id = Number(req.params.id);
//   IDに一致するユーザー取得
  const user = users.find((u) => u.id === id);
//   ユーザーがいなかった場合は404
  if (!user) return res.status(404).json(notFoundError("user not found"));

//   リクエストＢＯＤＹからＮＡＭＥとＥＭＡＩＬを取得
  const { name, email } = req.body ?? {};
//   エラーディテールを初期化
  const details: { field: string; reason: string }[] = [];
// ＮＡＭＥが空の場合
  if (!isNonEmptyString(name)) details.push({ field: "name", reason: "required" });
//   ＥＭＡＩＬが空の場合
  if (!isNonEmptyString(email)) details.push({ field: "email", reason: "required" });
//   ＥＭＡＩＬの入力フォーマット
  if (isNonEmptyString(email) && !looksLikeEmail(email)) details.push({ field: "email", reason: "invalid_format" });

  if (details.length) return res.status(400).json(validationError("invalid request", details));
  if (users.some((u) => u.email === email && u.id !== id)) {
    return res.status(400).json(validationError("email already exists", [{ field: "email", reason: "duplicate" }]));
  }

    if (users.some((u) => u.email === email)) {
    return res.status(400).json(validationError("email already exists", [{ field: "email", reason: "duplicate" }]));
  }
  user.name = name.trim();
  user.email = email.trim();
  res.status(200).json({ item: user });
});

// DELETE /users/:id
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  console.log(id);
  const idx = users.findIndex((u) => u.id === id);
  console.log(idx);
  if (idx === -1) return res.status(404).json(notFoundError("user not found"));

  users.splice(idx, 1);
  res.status(204).send();
});

export default router;