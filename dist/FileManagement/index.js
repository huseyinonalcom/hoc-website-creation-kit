import { jsx as _jsx } from "react/jsx-runtime";
import "server-only";
import { FilesBrowserClient, } from "./Components/FilesBrowserClient";
import { getDirectories } from "../server/domain/files/directories";
import { getFiles } from "../server/domain/files/get";
export default async function FilesBrowser(props) {
    const filesResponse = await getFiles();
    const files = filesResponse.result ?? [];
    const directoriesResponse = await getDirectories();
    const directories = directoriesResponse.result;
    return (_jsx(FilesBrowserClient, { ...props, directories: directories, files: files }));
}
// Re-export provider, hooks and public types so the package root can import them
export { default as FilesDataProvider } from "./Providers/FilesDataProvider";
export { useFilesData } from "./Providers/FilesDataProvider";
//# sourceMappingURL=index.js.map