import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../lib/token";

const signupSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_-]+$/),
  email: z.email(),
  password: z.string().min(8),
});

export type SignupInput = z.infer<typeof signupSchema>;

export async function Signup(req: Request, res: Response) {
  const user = signupSchema.safeParse(req.body);

  if (!user.success) {
    res.status(400).json({ error: user.error.message });
    return;
  }

  const { username, email, password } = user.data;

  const existingUser = await prisma.user.findUnique({ where: { username } });

  if (existingUser) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      res.status(500).json({ error: "Failed to create user" });
      return;
    }
    const payload = {id: newUser.id, username: newUser.username, email: newUser.email};

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/refresh",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.json({accessToken});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
    return;
  }
}