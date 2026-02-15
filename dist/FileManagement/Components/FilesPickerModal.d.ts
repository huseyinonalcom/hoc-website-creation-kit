import { Selectable } from "kysely";
import { FileDirectories, Files } from "../../server/types/dbtypes";
export type FilesPickerModalProps = {
    open: boolean;
    onClose: () => void;
    files: Selectable<Files>[];
    directories: Selectable<FileDirectories>[];
    onSelect: (file: Selectable<Files>) => void;
    onFileCreate?: (file: Selectable<Files>) => void;
    onDirectoryCreate?: (directory: Selectable<FileDirectories>) => void;
    title?: string;
    closeOnSelect?: boolean;
};
export declare function FilesPickerModal({ open, onClose, files, directories, onSelect, onFileCreate, onDirectoryCreate, title, closeOnSelect, }: FilesPickerModalProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesPickerModal.d.ts.map