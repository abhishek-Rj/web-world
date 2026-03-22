import { Request, Response } from "express";
import { client } from "./";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function uploadCharacter(req: Request, res: Response) {
  const { name, type } = req.body;
  const uploadParams = {
    Bucket: process.env.S3_BUCKET!,
    Key: `characters/${name}`,
    ContentType: type,
  };
  const command = new PutObjectCommand(uploadParams);
  const url = await getSignedUrl(client, command, { expiresIn: 60 * 10 });
  try {
    await client.send(command);
    res.json({ message: "Character uploaded successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}
