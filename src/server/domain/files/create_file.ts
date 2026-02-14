import "server-only";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";

import { insert } from "../../db/query";
import { r2 } from "./r2";

const DEFAULT_UPLOAD_FOLDER = "uploads";
const bucketName = getRequiredEnv("R2_BUCKET");
const publicBaseUrl = getRequiredEnv("R2_PUBLIC_URL").replace(/\/+$/, "");

type CreateFileInput = {
  file?: FormDataEntryValue | null;
  directory_id?: FormDataEntryValue | null;
  storageFolder?: FormDataEntryValue | null;
  uploaderId?: FormDataEntryValue | null;
};

type FileLike = Blob & { name?: string };

type NormalizedFilePayload = {
  file: FileLike;
  directory_id: string | null;
  storageFolder: string;
  uploaderId: string | null;
  originalName: string;
};

export const createFile = async ({
  fileData,
}: {
  fileData: CreateFileInput;
}) => {
  const parsedFileData = normalizePayload(fileData);

  const objectKey = await uploadToObjectStorage(parsedFileData);
  const uploadedFileUrl = `${publicBaseUrl}/${objectKey}`;

  const fileToSave = {
    url: uploadedFileUrl,
    directory_id: parsedFileData.directory_id,
    tag: parsedFileData.originalName,
    uploaded_by_user_id: parsedFileData.uploaderId,
  };

  return {
    result: await insert("files")
      .values(fileToSave)
      .returningAll()
      .executeTakeFirstOrThrow(),
    total: 1,
    uploadedFileUrl,
    objectKey,
  };
};

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is not defined`);
  }

  return value;
}

const isFileLike = (value: unknown): value is FileLike =>
  typeof Blob !== "undefined" && value instanceof Blob;

const normalizePayload = (fileData: CreateFileInput): NormalizedFilePayload => {
  const maybeFile = fileData.file ?? null;

  if (!isFileLike(maybeFile) || maybeFile.size === 0) {
    throw new Error("Yüklenecek geçerli bir dosya bulunamadı");
  }

  const directory_idValue =
    typeof fileData.directory_id === "string"
      ? fileData.directory_id.trim()
      : "";
  const storageFolderValue =
    typeof fileData.storageFolder === "string"
      ? fileData.storageFolder
      : undefined;
  const uploaderIdValue =
    typeof fileData.uploaderId === "string" ? fileData.uploaderId.trim() : "";

  return {
    file: maybeFile,
    directory_id: directory_idValue.length > 0 ? directory_idValue : null,
    storageFolder: sanitizeFolder(storageFolderValue),
    uploaderId: uploaderIdValue.length > 0 ? uploaderIdValue : null,
    originalName: getOriginalFileName(maybeFile),
  };
};

// Keeps uploads scoped to known folder structure and avoids path traversal.
const sanitizeFolder = (folder?: string) => {
  if (!folder) return DEFAULT_UPLOAD_FOLDER;

  const normalized = folder
    .replace(/\\/g, "/")
    .split("/")
    .map((segment) =>
      segment
        .trim()
        .replace(/[^a-zA-Z0-9._-]/g, "-")
        .replace(/-+/g, "-"),
    )
    .filter((segment) => segment && segment !== "." && segment !== "..")
    .join("/");

  return normalized || DEFAULT_UPLOAD_FOLDER;
};

const getOriginalFileName = (file: FileLike) => {
  if (typeof file.name === "string" && file.name.trim().length > 0) {
    return file.name.trim();
  }

  return "upload";
};

const determineExtension = (file: FileLike, originalName: string) => {
  const fromName = extname(originalName);
  if (fromName) {
    return fromName.toLowerCase();
  }

  if (file.type && file.type.includes("/")) {
    const [, subtype] = file.type.split("/");
    if (subtype) {
      return `.${subtype}`;
    }
  }

  return "";
};

const buildObjectKey = (payload: NormalizedFilePayload) => {
  const extension = determineExtension(payload.file, payload.originalName);
  const uniqueName = `${Date.now()}-${randomUUID()}${extension}`;
  return [payload.storageFolder, uniqueName].filter(Boolean).join("/");
};

const uploadToObjectStorage = async (
  payload: NormalizedFilePayload,
): Promise<string> => {
  const objectKey = buildObjectKey(payload);
  const fileBuffer = Buffer.from(await payload.file.arrayBuffer());

  await r2.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: fileBuffer,
      ContentLength: fileBuffer.byteLength,
      ContentType: getContentType(payload.file),
    }),
  );

  return objectKey;
};

const getContentType = (file: FileLike) =>
  file.type && file.type.trim().length > 0
    ? file.type
    : "application/octet-stream";
