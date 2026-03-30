import { Router } from "express";
import { verifyToken } from "../../middleware/auth.middleware";
import updateUser from "./udpate";

const router = Router();

router.post("/update", verifyToken, updateUser);

export { router as userRouter };
