import "server-only";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { db } from "../../db/config";
import { r2 } from "./r2";
const bucketName = process.env.R2_BUCKET;
const publicBase = process.env.R2_PUBLIC_URL ? process.env.R2_PUBLIC_URL.replace(/\/+$/, "") : undefined;
if (!bucketName || !publicBase) {
    // warn early; callers should handle the error
    console.warn("R2_BUCKET or R2_PUBLIC_URL not configured; createFile will fail until set.");
}
const sanitizeFolder = (folder) => {
    if (!folder)
        return "uploads";
    // remove leading/trailing slashes and disallow path traversal
    const cleaned = folder
        .replace(/(^\/+|\/+$)/g, "")
        .split("/")
        .filter((s) => s && s !== "." && s !== "..")
        .join("/");
    return cleaned.length > 0 ? cleaned : "uploads";
};
const sanitizeName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
export const createFile = async ({ buffer, originalName, storageFolder, directoryId, uploaderId, contentType, }) => {
    if (!bucketName || !publicBase)
        throw new Error("R2_BUCKET and R2_PUBLIC_URL must be configured");
    const folder = sanitizeFolder(storageFolder ?? undefined);
    const date = new Date().toISOString().slice(0, 10);
    const id = randomUUID();
    const safeName = sanitizeName(originalName || "file");
    const objectKey = `${folder}/${date}/${id}-${safeName}`;
    const cmd = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
        Body: buffer,
        ContentType: contentType ?? "application/octet-stream",
    });
    await r2.send(cmd);
    const url = `${publicBase}/${objectKey}`;
    const inserted = await db
        .insertInto("files")
        .values({ url, directory_id: directoryId ?? null, tag: originalName ?? null, uploaded_by_user_id: uploaderId ?? null })
        .returningAll()
        .executeTakeFirstOrThrow();
    return { file: inserted };
};
export default createFile;
//# sourceMappingURL=createFile.js.map