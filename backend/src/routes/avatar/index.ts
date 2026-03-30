import { Router } from "express";
import newCharacter from "./upload";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.post("/uploadCharacter", verifyToken, newCharacter);

export { router as characterRouter };
