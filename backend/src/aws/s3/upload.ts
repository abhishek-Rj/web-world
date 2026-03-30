import "dotenv/config";
import { Request, Response } from "express";
import { client } from "./awsClient";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function uploadCharacter(req: Request, res: Response) {
  const { characterName, files } = req.body;

  try {
    const urls = await Promise.all(
      files.map(async (file: any) => {
        const uploadParams = {
          Bucket: process.env.S3_BUCKET!,
          Key: `characters/${characterName}/${file.fileName}.png`,
          ContentType: file.type,
        };
        const command = new PutObjectCommand(uploadParams);
        const url = await getSignedUrl(client, command, { expiresIn: 60 * 3 });
        return { url, fileName: file.fileName };
      }),
    );

    res.status(200).json({
      urls,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
}
