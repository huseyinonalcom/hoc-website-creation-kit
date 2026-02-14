import { ReactNode } from "react";
import { Selectable } from "kysely";
import { FileDirectories, Files } from "../../server/types/dbtypes";
export declare function useFilesData(): {
    files: Selectable<Files>[];
    directories: Selectable<FileDirectories>[];
    addFile: (file: Selectable<Files>) => void;
    updateFile: (file: Selectable<Files>) => void;
    removeFile: (fileId: string) => void;
    addDirectory: (directory: Selectable<FileDirectories>) => void;
    updateDirectory: (directory: Selectable<FileDirectories>) => void;
    removeDirectory: (directory_id: string) => void;
};
export default function FilesDataProvider({ children, }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesDataProvider.d.ts.map