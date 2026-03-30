import { Request, Response } from "express";
import { client } from "./awsClient";
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
    const characters = data.CommonPrefixes?.map((prefix) =>
      prefix.Prefix?.replace("characters/", "").replace("/", ""),
    );
    res.status(200).json(characters);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
}
