//　DB操作

import { Prisma } from "../generated/prisma/client";
import { prisma } from "../db";

export async function findByTask(id: number) {
  return prisma.task.findUnique({
    where: { id },
  });
}

export async function creatTasks( input:   {
  title: string;
  done: boolean;
  userId: number;
}) {
  return prisma.task.create({
    data: input,
  });
}

export async function listTasks(params: {
  q?: string;
  page: number;
  limit: number;
}) {
  const { q, page, limit } = params;
  const skip = (page - 1) * limit;
  const where: Prisma.TaskWhereInput = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          // { createdAt: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "asc" },
    }),
    prisma.task.count({ where }),
  ]);

  return { items, total };
}


export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  return prisma.user.create({
    data: input,
  });
}


export async function deleteTask(id: number) {
  return prisma.task.delete({
    where: { id },
  });
}

export async function findAllTasks(){
    return prisma.task.findMany();
}

export async function putTask(
  id: number,
  title: string,
  done: boolean,
  userId: number
) {
  return prisma.task.update({
    where: { id },
    data: {
      title,
      done,
      userId,
    },
  });
}