import { PrismaClient } from "@prisma/client";

export default async function cleanDb() {
  const prisma = new PrismaClient();
  await prisma.recipe
    .deleteMany({
      where: {
        author: {
          //TODO: figure out a better way to do this
          name: {
            startsWith: "Testing",
          },
        },
      },
    })
    .finally(() => prisma.$disconnect());
}
