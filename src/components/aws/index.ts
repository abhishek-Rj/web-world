import { S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: import.meta.env.VITE_S3_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID!,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY!,
  },
});

export { client };
