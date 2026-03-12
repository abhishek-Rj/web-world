import { Request, Response } from "express";
import { prisma } from "../../../lib/prisma";

export async function Character(req: Request, res: Response): Promise<void> {
  const { AvatarId } = req.body;
  if (!AvatarId) {
    res.status(400).json({ message: "AvatarId is required" });
    return;
  }
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const character = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        character: AvatarId,
      },
    });
    res.json({ success: true, character });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}