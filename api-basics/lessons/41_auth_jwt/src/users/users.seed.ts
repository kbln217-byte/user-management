import bcrypt from "bcryptjs";
import { users } from "./users.store";

export async function seedUsers() {
  if (users.length > 0) return;

  const passwordHash = await bcrypt.hash("passw0rd", 10);

  users.push(
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      passwordHash,
      role: "editor",
    },
    {
      id: 2,
      name: "Admin",
      email: "admin@example.com",
      passwordHash,
      role: "admin",
    },
    {
      id: 3,
      name: "Editor",
      email: "editor@example.com",
      passwordHash,
      role: "editor",
    }
  );
}