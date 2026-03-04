import { Request, Response } from "express";
import { verifyRefreshToken, generateAccessToken } from "../../../lib/token";

export async function Refresh(req: Request, res: Response): Promise<void> {
  console.log(req.cookies)
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    res.status(401).json({message: "No refresh token provided"})
    return;
  }
  try {
    const decodedToken = verifyRefreshToken(refreshToken) as {
      id: string;
      username: string;
      email: string
    }
    if (!decodedToken) {
      res.status(401).json({message: "Invalid refresh token"})
      return;
    }
    const accessToken = generateAccessToken(decodedToken)
    console.log(accessToken)
    res.json({accessToken})
    return;
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
    return;
  }
}