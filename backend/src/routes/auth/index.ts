import { Router } from "express";
import { Login } from "./login";
import { Signup } from "./signup";

const authRouter = Router();

authRouter.post("/login", Login);
authRouter.post("/signup", Signup);

export { authRouter };