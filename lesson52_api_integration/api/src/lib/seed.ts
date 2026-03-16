import { pool } from "./db";

export async function seedDemoUser() {
  const email = "demo@example.com";

  // すでにいるなら何もしない
  const exists = await pool.query(`SELECT 1 FROM users WHERE email = $1`, [email]);
  if (exists.rowCount && exists.rowCount > 0) return;

  await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)`,
    ["Demo", email, "password"]
  );

  console.log("[seed] demo user inserted");
}