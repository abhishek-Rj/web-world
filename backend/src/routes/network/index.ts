import Router from "express";
import { join } from "./join";

const joinRouter = Router();

joinRouter.get("/create-join", join);

export { joinRouter };
