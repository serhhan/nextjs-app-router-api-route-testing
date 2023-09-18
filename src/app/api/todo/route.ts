import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const todos = await prisma.todo.findMany();
      return res.status(200).json(todos);

    case "POST":
      const newTodo = await prisma.todo.create({
        data: {
          task: req.body.task,
          done: req.body.done || false,
        },
      });
      return res.status(201).json(newTodo);

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
