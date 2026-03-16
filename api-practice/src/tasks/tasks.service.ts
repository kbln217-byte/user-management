//　業務ロジック

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
// import { creatednewTasks, findAllTasks, findByTask, deleteTask } from "./tasks.repo";
import { Prisma } from "../generated/prisma/client";
import { stringify } from "querystring";

import * as repo from "./tasks.repo";
import { findByIdUser } from "../users/users.repo";


export type JwtPayload = {
  sub: number;

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

export async function register(input: {
  title: string;
  done: boolean;
  userId: number;
}) {

  try {
    const user = await findByIdUser(input.userId);
    if(!user) throw new HttpError(404, "NOT_FUNd", "user is not fund");
    const result = await repo.creatTasks({
  title: input.title,
  done: input.done,
  userId: user.id
    });

    return result;

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

export async function findAllTask() {
    return await repo.findAllTasks();
}

export async function findByTasks(id: number) {
    return await repo.findByTask(id);
}

export async function deletedTask(id: number) {
    return await repo.deleteTask(id);
}

export async function putTaskRepo(
  id: number,
  title: string,
  done: boolean,
  userId: number
) {


  // return await putTask(id, title, done, userId);
}