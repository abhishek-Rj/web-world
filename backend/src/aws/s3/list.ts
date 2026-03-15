import { Request, Response } from "express";
import { client } from "./";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function listCharacters(req: Request, res: Response) {
  const listParams = {
    Bucket: process.env.S3_BUCKET!,
    Prefix: "characters/",
    Delimiter: "/",
  };
  try {
    const command = new ListObjectsV2Command(listParams);
    const data = await client.send(command);
    res.json(
      data.Contents?.map((item) => {
        if (item.Key !== "characters/") return item.Key;
      }),
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
}
