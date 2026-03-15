import { S3Client } from "@aws-sdk/client-s3";
import { Router } from "express";
import { listCharacters } from "./list";
import { uploadCharacter } from "./upload";

const client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const s3Router = Router();

s3Router.get("/list-characters", listCharacters);
s3Router.post("/upload-character", uploadCharacter);

export { client, s3Router };
