import "server-only";
import React from "react";

import FilesDataProvider from "../Providers/FilesDataProvider";
import { listFiles } from "@/server/domain/files/listFiles";
import { listDirectories } from "@/server/domain/files/listDirectories";

const mapDbFileToSerializable = (row: any) => ({
  id: row.id,
  url: row.url,
  label: row.label ?? null,
  directoryId: row.directory_id ?? null,
  isDeleted: Boolean(row.is_deleted),
  uploadedAt: row.uploaded_at?.toString?.() ?? null,
  deletedAt: row.deleted_at?.toString?.() ?? null,
});

const mapDbDirToSerializable = (row: any) => ({
  id: row.id,
  name: row.name,
  parentId: row.parent_id ?? null,
  createdAt: row.created_at?.toString?.() ?? null,
  updatedAt: row.updated_at?.toString?.() ?? null,
});

export default async function ServerFilesProvider({ children }: { children: React.ReactNode }) {
  const filesRes = await listFiles({ includeDeleted: true });
  const dirsRes = await listDirectories();

  const files = (filesRes.result ?? []).map(mapDbFileToSerializable);
  const directories = (dirsRes.result ?? []).map(mapDbDirToSerializable);

  return (
    // FilesDataProvider is a client component
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <FilesDataProvider initialFiles={files} initialDirectories={directories}>
      {children}
    </FilesDataProvider>
  );
}
