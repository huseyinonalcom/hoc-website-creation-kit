import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.R2_ENDPOINT ?? "";
const region = process.env.R2_REGION ?? "auto";

if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET || !process.env.R2_PUBLIC_URL) {
  console.warn("R2 env variables are not fully configured. Ensure R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET and R2_PUBLIC_URL are set.");
}

export const r2 = new S3Client({
  region,
  endpoint,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
});

export default r2;

/*
Environment variables available for R2 configuration:
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET
R2_ENDPOINT
R2_REGION
R2_PUBLIC_URL
*/
