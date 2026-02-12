export type SerializableFileRecord = {
  id: string;
  url: string;
  label?: string | null;
  directoryId?: string | null;
  isDeleted?: boolean;
  uploadedAt?: string;
  deletedAt?: string | null;
};

export type SerializableDirectoryRecord = {
  id: string;
  name: string;
  parentId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UploadFileInput = {
  file: File;
  directoryId?: string | null;
  storageFolder?: string | null;
};

export type CreateDirectoryInput = {
  name: string;
  parentId?: string | null;
};

export type UpdateFileInput = {
  id: string;
  label?: string | null;
  directoryId?: string | null;
};

export type UpdateDirectoryInput = {
  id: string;
  name?: string | null;
  parentId?: string | null;
};

export type DeleteFileInput = {
  id: string;
};

export type DeleteDirectoryInput = {
  id: string;
};

export type CreateDirectoryResponse = { result: "success"; directory: SerializableDirectoryRecord } | { result: "error"; error?: string };

export type UpdateDirectoryResponse = { result: "success"; directory: SerializableDirectoryRecord } | { result: "error"; error?: string };

export type UpdateFileResponse = { result: "success"; file: SerializableFileRecord } | { result: "error"; error?: string };

export type DeleteDirectoryResponse = { result: "success"; deletedIds: string[] } | { result: "error"; error?: string };

export type DeleteFileResponse = { result: "success"; fileId: string } | { result: "error"; error?: string };
