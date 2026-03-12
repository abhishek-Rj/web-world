import { Router } from "express";
import { Login } from "./login";
import { Signup } from "./signup";
import { Refresh } from "./refresh";
import { Character } from "./character";

const authRouter = Router();

authRouter.post("/login", Login);
authRouter.post("/signup", Signup);
authRouter.post("/refresh", Refresh);
authRouter.post("/character", Character);

export { authRouter };