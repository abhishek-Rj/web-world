import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export default async function updateUser(req: Request, res: Response) {
  const { characterId } = req.body;

  try {
    const user = req.user;
    await prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        characterId,
      },
    });
    res.status(200).json({ message: "Avatar Assigned" });
  } catch (E) {
    console.log("Error updating user", E);
    res.status(500).json({ message: "Internal server error" });
  }
}
