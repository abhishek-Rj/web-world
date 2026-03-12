import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/token";

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = verifyAccessToken(token) as any;
    if (!decodedToken) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}