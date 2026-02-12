import { ReactNode } from "react";
import type { SerializableDirectoryRecord, SerializableFileRecord } from "../types";
export declare function useFilesData(): {
    files: SerializableFileRecord[];
    directories: SerializableDirectoryRecord[];
    addFile: (file: SerializableFileRecord) => void;
    updateFile: (file: SerializableFileRecord) => void;
    removeFile: (fileId: string) => void;
    addDirectory: (directory: SerializableDirectoryRecord) => void;
    updateDirectory: (directory: SerializableDirectoryRecord) => void;
    removeDirectory: (directoryId: string) => void;
};
export default function FilesDataProvider({ initialFiles, initialDirectories, children, }: {
    initialFiles: SerializableFileRecord[];
    initialDirectories: SerializableDirectoryRecord[];
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesDataProvider.d.ts.map