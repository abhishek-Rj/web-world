import { Router } from "express";
import { listCharacters } from "./list";
import { uploadCharacter } from "./upload";

const s3Router = Router();

s3Router.get("/list-characters", listCharacters);
s3Router.post("/upload-character", uploadCharacter);

export { s3Router };
