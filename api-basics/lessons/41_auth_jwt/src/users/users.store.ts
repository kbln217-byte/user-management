export type Role = "user" | "admin" | "editor";

export type StoredUser = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
};

export const users: StoredUser[] = [];