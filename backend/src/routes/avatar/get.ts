import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export default async function getCharacters(req: Request, res: Response) {
  try {
    const characters = await prisma.character.findMany();
    res.status(200).json(characters);
  } catch (E) {
    console.log("Error fetching characters", E);
    res.status(500).json({ message: "Internal server error" });
  }
}
