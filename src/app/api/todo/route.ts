import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (): Promise<NextResponse> => {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { task, done } = await req.json();

    const newTodo = await prisma.todo.create({
      data: {
        task: task,
        done: done || false,
      },
    });

    return NextResponse.json(newTodo);
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};

export { GET, POST };
