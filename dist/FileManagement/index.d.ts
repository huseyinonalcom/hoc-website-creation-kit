import "server-only";
import { type FilesBrowserClientProps } from "./Components/FilesBrowserClient";
export type FilesBrowserProps = Omit<FilesBrowserClientProps, "directories" | "files" | "onFileCreate" | "onDirectoryCreate">;
export default function FilesBrowser(props: FilesBrowserProps): Promise<import("react/jsx-runtime").JSX.Element>;
export { default as FilesDataProvider } from "./Providers/FilesDataProvider";
export { useFilesData } from "./Providers/FilesDataProvider";
export type { ActionResultState } from "../utils/serverActions/types";
export type { UploadFileState } from "./state";
export type { UploadFileInput, UpdateFileInput, UpdateFileResponse, CreateDirectoryInput, CreateDirectoryResponse, DeleteDirectoryInput, DeleteDirectoryResponse, UpdateDirectoryInput, UpdateDirectoryResponse, DeleteFileInput, DeleteFileResponse, } from "./actions";
export type { FileDirectories, Files } from "../server/types/dbtypes";
//# sourceMappingURL=index.d.ts.map