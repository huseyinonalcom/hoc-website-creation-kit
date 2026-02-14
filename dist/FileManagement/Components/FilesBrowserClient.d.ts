import type { CreateDirectoryInput, CreateDirectoryResponse, FileDirectories, Files, UploadFileInput } from "../types";
import { type UploadFileState } from "../state";
export type FilesBrowserClientProps = {
    files: Files[];
    directories: FileDirectories[];
    onSelect?: (file: Files) => void;
    onSelectionChange?: (ids: string[]) => void;
    onMoveFiles?: (directory_id: string | null, fileIds: string[]) => void;
    onFileCreate?: (file: Files) => void;
    onDirectoryCreate?: (directory: FileDirectories) => void;
    onDirectoryChange?: (directory_id: string | null) => void;
    onUploadFile?: (input: UploadFileInput) => Promise<UploadFileState>;
    onCreateDirectory?: (input: CreateDirectoryInput) => Promise<CreateDirectoryResponse>;
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
export declare function FilesBrowserClient({ files, directories, onSelect, onSelectionChange, onMoveFiles, onFileCreate, onDirectoryCreate, onDirectoryChange, onUploadFile, onCreateDirectory, className, emptyStateMessage, initialdirectory_id, activedirectory_id: controlleddirectory_id, showFiles, showDirectories, showUpload, showDirectoryCreate, multiSelect, enableDragDrop, selectedFileIds, }: FilesBrowserClientProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesBrowserClient.d.ts.map