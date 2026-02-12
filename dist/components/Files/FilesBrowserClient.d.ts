import type { CreateDirectoryInput, CreateDirectoryResponse, SerializableDirectoryRecord, SerializableFileRecord, UploadFileInput } from "./types";
import { type UploadFileState } from "./state";
export type FilesBrowserClientProps = {
    files: SerializableFileRecord[];
    directories: SerializableDirectoryRecord[];
    onSelect?: (file: SerializableFileRecord) => void;
    onSelectionChange?: (ids: string[]) => void;
    onMoveFiles?: (directoryId: string | null, fileIds: string[]) => void;
    onFileCreate?: (file: SerializableFileRecord) => void;
    onDirectoryCreate?: (directory: SerializableDirectoryRecord) => void;
    onDirectoryChange?: (directoryId: string | null) => void;
    onUploadFile?: (input: UploadFileInput) => Promise<UploadFileState>;
    onCreateDirectory?: (input: CreateDirectoryInput) => Promise<CreateDirectoryResponse>;
    className?: string;
    emptyStateMessage?: string;
    initialDirectoryId?: string | null;
    activeDirectoryId?: string | null;
    showFiles?: boolean;
    showDirectories?: boolean;
    showUpload?: boolean;
    showDirectoryCreate?: boolean;
    multiSelect?: boolean;
    enableDragDrop?: boolean;
    selectedFileIds?: string[];
};
export declare function FilesBrowserClient({ files, directories, onSelect, onSelectionChange, onMoveFiles, onFileCreate, onDirectoryCreate, onDirectoryChange, onUploadFile, onCreateDirectory, className, emptyStateMessage, initialDirectoryId, activeDirectoryId: controlledDirectoryId, showFiles, showDirectories, showUpload, showDirectoryCreate, multiSelect, enableDragDrop, selectedFileIds, }: FilesBrowserClientProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesBrowserClient.d.ts.map