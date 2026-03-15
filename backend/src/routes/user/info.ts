import { Request, Response } from "express";

export default function Info(req: Request, res: Response): void {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.json({ user });
}
