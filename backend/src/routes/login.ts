import { Request, Response } from "express";

export function Login(req: Request, res: Response) {
  const {username, password} : {username: string, password: string} = req.body;
  
}