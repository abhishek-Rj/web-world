import Router from "express";
import { join } from "./network/join";

const router = Router();

router.get("/create-join", join);

export { router };
