import { Request, Response } from "express";
import { verifyRefreshToken, generateAccessToken } from "../../../lib/token";

export async function Refresh(req: Request, res: Response): Promise<void> {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token provided" });
    return;
  }
  try {
    const decodedToken = verifyRefreshToken(refreshToken) as any;
    if (!decodedToken) {
      res.status(401).json({ message: "Invalid refresh token" });
      return;
    }
    const accessToken = generateAccessToken({
      id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email,
    });
    res.json({ accessToken, user: decodedToken });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
