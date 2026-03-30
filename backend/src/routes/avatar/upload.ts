import { Response, Request } from "express";
import { prisma } from "../../../lib/prisma";

export default async function newCharacter(req: Request, res: Response) {
  const { characterName, key } = req.body;

  const BASE_URL = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`;

  try {
    await prisma.character.create({
      data: {
        name: characterName,
        image: `${BASE_URL}/${key}`,
      },
    });
    res.status(200).json({ msg: "Character created successfully" });
  } catch (E) {
    console.log(E);
    res.status(500).json({ msg: "Internal server error" });
  }
}
