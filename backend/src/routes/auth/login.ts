import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../lib/token";

const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;

export async function Login(req: Request, res: Response): Promise<void> {
  const user = loginSchema.safeParse(req.body);
  if (!user.success) {
    res.status(400).json({ error: user.error.message});
    return;
  }
  
  const {username, password} = user.data;
  const existingUser = await prisma.user.findUnique({where: {username}});

  if (!existingUser) {
    res.status(401).json({ error: "User not found"});
    return;
  }
  try {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password"});
      return;
    }
    const payload = {id: existingUser.id, username: existingUser.username, email: existingUser.email};

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/refresh",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({accessToken});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login" });
    return;
  }
}