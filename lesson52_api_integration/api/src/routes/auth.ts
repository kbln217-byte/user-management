import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../lib/db";

export const authRouter = express.Router();

type LoginBody = { email?: string; password?: string };
type DbUser = { id: number; email: string; password: string | null };

authRouter.post("/login", async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "email と password は必須です" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "JWT_SECRET が未設定です" });
  }

  // ★ここがDB版の核（emailで検索）
  const r = await pool.query<DbUser>(
    `SELECT id, email, password FROM users WHERE email = $1`,
    [email.trim()]
  );

  if (r.rowCount === 0) {
    return res.status(401).json({ message: "メールアドレスまたはパスワードが違います" });
  }

  const user = r.rows[0]!;

  if (!user.password || user.password !== password) {
    return res.status(401).json({ message: "メールアドレスまたはパスワードが違います" });
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, secret, { expiresIn: "1h" });
  return res.json({ token });
});

export default authRouter;