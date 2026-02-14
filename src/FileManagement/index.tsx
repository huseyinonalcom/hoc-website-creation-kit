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
