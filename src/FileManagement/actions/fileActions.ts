"use server";

import "server-only";

import createDirectory from "../../server/domain/directories/createDirectory";
import updateDirectory from "../../server/domain/directories/updateDirectory";
import deleteDirectory from "../../server/domain/directories/deleteDirectory";
import { createFile } from "../../server/domain/files/create_file";
import { update as dbUpdate } from "../../server/db/query";

export async function createDirectoryAction(data: {
  name: string;
  parentId?: string | null;
}) {
  return createDirectory(data);
}

export async function updateDirectoryAction(data: {
  id: string;
  name?: string | null;
  parentId?: string | null;
}) {
  return updateDirectory(data);
}

export async function deleteDirectoryAction(data: { id: string }) {
  return deleteDirectory(data);
}

export async function uploadFileAction(
  file: File,
  options?: { storageFolder?: string | null; directoryId?: string | null },
) {
  return createFile({ fileData: { file, storageFolder: options?.storageFolder, directoryId: options?.directoryId } });
}

export async function updateFileAction(data: { id: string; label?: string | null; directoryId?: string | null }) {
  const payload: Record<string, unknown> = {};
  if (data.label !== undefined) payload.label = data.label;
  if (data.directoryId !== undefined) payload.directory_id = data.directoryId ?? null;

  return dbUpdate("files", { id: data.id })
    .set(payload)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteFileAction(data: { id: string }) {
  return dbUpdate("files", { id: data.id })
    .set({ is_deleted: true, deleted_at: new Date().toISOString() })
    .returningAll()
    .executeTakeFirstOrThrow();
}
