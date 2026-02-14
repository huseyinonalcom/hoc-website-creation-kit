import { ReactNode } from "react";
import type { FileDirectories, Files } from "../types";
export declare function useFilesData(): {
    files: Files[];
    directories: FileDirectories[];
    addFile: (file: Files) => void;
    updateFile: (file: Files) => void;
    removeFile: (fileId: string) => void;
    addDirectory: (directory: FileDirectories) => void;
    updateDirectory: (directory: FileDirectories) => void;
    removeDirectory: (directory_id: string) => void;
};
export default function FilesDataProvider({ initialFiles, initialDirectories, children, }: {
    initialFiles: Files[];
    initialDirectories: FileDirectories[];
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesDataProvider.d.ts.map