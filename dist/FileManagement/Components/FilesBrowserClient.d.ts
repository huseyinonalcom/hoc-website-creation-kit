import { Selectable } from "kysely";
import { FileDirectories, Files } from "../../server/types/dbtypes";
export type FilesBrowserClientProps = {
    files: Selectable<Files>[];
    directories: Selectable<FileDirectories>[];
    onSelect?: (file: Selectable<Files>) => void;
    onSelectionChange?: (ids: string[]) => void;
    onMoveFiles?: (directory_id: string | null, fileIds: string[]) => void;
    onFileCreate?: (file: Selectable<Files>) => void;
    onDirectoryCreate?: (directory: Selectable<FileDirectories>) => void;
    onDirectoryChange?: (directory_id: string | null) => void;
    className?: string;
    emptyStateMessage?: string;
    initialdirectory_id?: string | null;
    activedirectory_id?: string | null;
    showFiles?: boolean;
    showDirectories?: boolean;
    showUpload?: boolean;
    showDirectoryCreate?: boolean;
    multiSelect?: boolean;
    enableDragDrop?: boolean;
    selectedFileIds?: string[];
};
export declare function FilesBrowserClient({ files, directories, onSelect, onSelectionChange, onMoveFiles, onFileCreate, onDirectoryCreate, onDirectoryChange, className, emptyStateMessage, initialdirectory_id, activedirectory_id: controlleddirectory_id, showFiles, showDirectories, showUpload, showDirectoryCreate, multiSelect, enableDragDrop, selectedFileIds, }: FilesBrowserClientProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesBrowserClient.d.ts.map