import { Router } from "express";
import { Login } from "./login";
import { Signup } from "./signup";
import { Refresh } from "./refresh";

const authRouter = Router();

authRouter.post("/login", Login);
authRouter.post("/signup", Signup);
authRouter.post("/refresh", Refresh);

export { authRouter };