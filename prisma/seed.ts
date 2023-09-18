import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.deleteMany();

  console.log("Existing seed deleted!");

  await prisma.todo.create({
    data: {
      id: 0,
      task: "Learn API testing with Next.js 13",
      done: false,
    },
  });

  await prisma.todo.create({
    data: {
      id: 1,
      task: "Deploy the app",
      done: false,
    },
  });

  console.log("Todos seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
