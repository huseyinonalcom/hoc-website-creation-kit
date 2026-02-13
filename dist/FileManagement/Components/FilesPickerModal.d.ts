import { CreateDirectoryInput, CreateDirectoryResponse, SerializableDirectoryRecord, SerializableFileRecord, UploadFileInput } from "../types";
import { UploadFileState } from "../state";
export type FilesPickerModalProps = {
    open: boolean;
    onClose: () => void;
    files: SerializableFileRecord[];
    directories: SerializableDirectoryRecord[];
    onSelect: (file: SerializableFileRecord) => void;
    onFileCreate?: (file: SerializableFileRecord) => void;
    onDirectoryCreate?: (directory: SerializableDirectoryRecord) => void;
    onUploadFile?: (input: UploadFileInput) => Promise<UploadFileState>;
    onCreateDirectory?: (input: CreateDirectoryInput) => Promise<CreateDirectoryResponse>;
    title?: string;
    closeOnSelect?: boolean;
};
export declare function FilesPickerModal({ open, onClose, files, directories, onSelect, onFileCreate, onDirectoryCreate, onUploadFile, onCreateDirectory, title, closeOnSelect, }: FilesPickerModalProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesPickerModal.d.ts.map