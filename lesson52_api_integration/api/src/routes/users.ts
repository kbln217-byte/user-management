import { Router, Request, Response } from "express";
import { pool } from "../lib/db";
import { isNonEmptyString, looksLikeEmail } from "../lib/validate";
import { notFoundError, validationError } from "../lib/errors";

export type User = { id: number; name: string; email: string; createdAt: string };

const router = Router();

// GET /users?q=...
router.get("/", async (req: Request, res: Response) => {
  const q = (req.query.q as string | undefined)?.trim();

  const sql = q
    ? `SELECT id, name, email, created_at
       FROM users
       WHERE lower(name) LIKE lower($1) OR lower(email) LIKE lower($1)
       ORDER BY id`
    : `SELECT id, name, email, created_at
       FROM users
       ORDER BY id`;

  const params = q ? [`%${q}%`] : [];

  const r = await pool.query(sql, params);

  const items: User[] = r.rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
  }));

  res.status(200).json({ items, page: 1, limit: 20, total: items.length });
});

// GET /users/:id
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const r = await pool.query(
    `SELECT id, name, email, created_at FROM users WHERE id = $1`,
    [id]
  );

  if (r.rowCount === 0) return res.status(404).json(notFoundError("user not found"));

  const row = r.rows[0];
  res.status(200).json({
    item: { id: row.id, name: row.name, email: row.email, createdAt: row.created_at } satisfies User,
  });
});

// POST /users
router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body ?? {};
  const details: { field: string; reason: string }[] = [];

  if (!isNonEmptyString(name)) details.push({ field: "name", reason: "required" });
  if (!isNonEmptyString(email)) details.push({ field: "email", reason: "required" });
  if (isNonEmptyString(email) && !looksLikeEmail(email)) details.push({ field: "email", reason: "invalid_format" });

  if (details.length) return res.status(400).json(validationError("invalid request", details));

  try {
    const r = await pool.query(
      `INSERT INTO users (name, email) VALUES ($1, $2)
       RETURNING id, name, email, created_at`,
      [name.trim(), email.trim()]
    );

    const row = r.rows[0];
    res.status(201).json({
      item: { id: row.id, name: row.name, email: row.email, createdAt: row.created_at } satisfies User,
    });
  } catch (e: any) {
    // email UNIQUE で重複した時（Postgresエラーコード 23505）
    if (e?.code === "23505") {
      return res
        .status(400)
        .json(validationError("email already exists", [{ field: "email", reason: "duplicate" }]));
    }
    throw e;
  }
});

// PUT /users/:id
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email } = req.body ?? {};
  const details: { field: string; reason: string }[] = [];

  if (!isNonEmptyString(name)) details.push({ field: "name", reason: "required" });
  if (!isNonEmptyString(email)) details.push({ field: "email", reason: "required" });
  if (isNonEmptyString(email) && !looksLikeEmail(email)) details.push({ field: "email", reason: "invalid_format" });

  if (details.length) return res.status(400).json(validationError("invalid request", details));

  try {
    const r = await pool.query(
      `UPDATE users
       SET name = $1, email = $2
       WHERE id = $3
       RETURNING id, name, email, created_at`,
      [name.trim(), email.trim(), id]
    );

    if (r.rowCount === 0) return res.status(404).json(notFoundError("user not found"));

    const row = r.rows[0];
    res.status(200).json({
      item: { id: row.id, name: row.name, email: row.email, createdAt: row.created_at } satisfies User,
    });
  } catch (e: any) {
    if (e?.code === "23505") {
      return res
        .status(400)
        .json(validationError("email already exists", [{ field: "email", reason: "duplicate" }]));
    }
    throw e;
  }
});

// DELETE /users/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const r = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  if (r.rowCount === 0) return res.status(404).json(notFoundError("user not found"));

  res.status(204).send();
});

export default router;