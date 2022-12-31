import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  await db.user.create({
    data: {
      username: "kody",
      passwordHash:
        "$2y$10$wmBG22QiniW6P1QdjIcVseFXxMryimspYMwN6i2kdJoF/61/PuODK",
      passwordSalt: "",
    },
  });
}

seed();
