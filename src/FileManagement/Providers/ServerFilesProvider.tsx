import "server-only";
import React from "react";

import listDirectories from "../../server/domain/directories/listDirectories";
import FilesDataProvider from "../Providers/FilesDataProvider";
import { getFiles } from "../../server/domain/files/get";

const mapDbFileToSerializable = (row) => ({
  id: row.id,
  url: row.url,
  label: row.label ?? null,
  directoryId: row.directory_id ?? null,
  isDeleted: Boolean(row.is_deleted),
  uploadedAt: row.uploaded_at?.toString?.() ?? null,
  deletedAt: row.deleted_at?.toString?.() ?? null,
});

const mapDbDirToSerializable = (row) => ({
  id: row.id,
  name: row.name,
  parentId: row.parent_id ?? null,
  createdAt: row.created_at?.toString?.() ?? null,
  updatedAt: row.updated_at?.toString?.() ?? null,
});

export default async function ServerFilesProvider({
  children,
}: {ƒ
  children: React.ReactNode;
}) {
  const filesRes = await getFiles({ includeDeleted: true });
  const dirsRes = await listDirectories();

  const files = (filesRes.result ?? []).map(mapDbFileToSerializable);
  const directories = (dirsRes.result ?? []).map(mapDbDirToSerializable);

  return (
    // FilesDataProvider is a client component
     
    <FilesDataProvider initialFiles={files} initialDirectories={directories}>
      {children}
    </FilesDataProvider>
  );
}
