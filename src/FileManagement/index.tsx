import "server-only";

import {
  FilesBrowserClient,
  type FilesBrowserClientProps,
} from "./Components/FilesBrowserClient";
import { getDirectories } from "../server/domain/files/directories";
import { getFiles } from "../server/domain/files/get";

export type FilesBrowserProps = Omit<
  FilesBrowserClientProps,
  "directories" | "files" | "onFileCreate" | "onDirectoryCreate"
>;

export default async function FilesBrowser(props: FilesBrowserProps) {
  const filesResponse = await getFiles();
  const files = filesResponse.result ?? [];
  const directoriesResponse = await getDirectories();
  const directories = directoriesResponse.result;

  return (
    <FilesBrowserClient {...props} directories={directories} files={files} />
  );
}

// Re-export provider, hooks and public types so the package root can import them
export { default as FilesDataProvider } from "./Providers/FilesDataProvider";
export { useFilesData } from "./Providers/FilesDataProvider";

export type { ActionResultState } from "../utils/serverActions/types";
export type { UploadFileState } from "./state";

export type {
  UploadFileInput,
  UpdateFileInput,
  UpdateFileResponse,
  CreateDirectoryInput,
  CreateDirectoryResponse,
  DeleteDirectoryInput,
  DeleteDirectoryResponse,
  UpdateDirectoryInput,
  UpdateDirectoryResponse,
  DeleteFileInput,
  DeleteFileResponse,
} from "./actions";

export type { FileDirectories, Files } from "../server/types/dbtypes";
