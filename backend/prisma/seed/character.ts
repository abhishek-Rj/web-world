import { prisma } from "../../lib/prisma";

async function main() {
  const character = await prisma.character.create({
    data: {
      name: "Tennyson",
      image:
        "https://web-world-assests.s3.ap-south-1.amazonaws.com/characters/Tennyson",
    },
  });
  console.log(character);
}

main();
