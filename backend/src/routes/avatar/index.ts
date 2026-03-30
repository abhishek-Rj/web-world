import { Router } from "express";
import newCharacter from "./upload";
import { verifyToken } from "../../middleware/auth.middleware";
import getCharacters from "./get";

const router = Router();

router.post("/uploadCharacter", verifyToken, newCharacter);
router.get("/getCharacters", verifyToken, getCharacters);

export { router as characterRouter };
