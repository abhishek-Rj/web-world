import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import { client } from "./";

export async function uploadCharacter(req: Request, res: Response) {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET!,
    Key: `characters/${req.body.name}`,
    Body: req.body.image,
  };
  const command = new PutObjectCommand(uploadParams);
  try {
    await client.send(command);
    res.json({ message: "Character uploaded successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}
