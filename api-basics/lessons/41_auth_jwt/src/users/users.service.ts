import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { createUser, findByEmail } from "../users/users.repo";
// import { Prisma } from "@prisma/client";
import { Prisma } from "../generated/prisma";
import type { SignOptions } from "jsonwebtoken";
import { AnyNull } from "../generated/prisma/runtime/client";

export type JwtPayload = {
  sub: number;
  role: "user" | "admin";
};

export class HttpError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function getUser(email: string, password: string) {
  const user = await findByEmail(email);

  if (!user) {
    throw new HttpError(401, "AUTH_FAILED", "Invalid email or password");
  }

  const ok = await bcrypt.compare(password, user.passwordHash);

  if (!ok) {
    throw new HttpError(401, "AUTH_FAILED", "Invalid email or password");
  }

  const payload: JwtPayload = {
    sub: user.id,
    role: user.role as "user" | "admin",
  };

  const token = config.jwtExpiresIn
    ? jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn })
    : jwt.sign(payload, config.jwtSecret);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function register(input: {
  name: string;
  email: string;
  password: string;
  role:any;
}) {

  const passwordHash = await bcrypt.hash(input.password, 10);

  try {

    const user = await createUser({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
    });

    return user;

  } catch (e: any ) {

    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      throw new HttpError(
        400,
        "VALIDATION_ERROR",
        "email already exists"
      );
    }

    throw e;
  }
}