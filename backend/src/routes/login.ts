import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;

export async function Login(req: Request, res: Response) {
  const user = loginSchema.safeParse(req.body);
  if (!user.success) {
    return res.status(400).json({ error: user.error.message});
  }
  
  const {username, password} = user.data;
  const existingUser = await prisma.user.findUnique({where: {username}});

  if (!existingUser) {
    return res.status(401).json({ error: "User not found"});
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password"});
  }

  const token = jwt.sign({id: existingUser.id}, process.env.JWT_SECRET!, {expiresIn: "1h"});
  res.json({token});  
  
}
