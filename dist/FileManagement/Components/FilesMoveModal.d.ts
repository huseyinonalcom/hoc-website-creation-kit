import { FileDirectories } from "../types";
export type FilesMoveModalProps = {
    open: boolean;
    directories: FileDirectories[];
    onClose: () => void;
    onConfirm: (directory_id: string | null) => void;
    initialdirectory_id?: string | null;
    title?: string;
};
export declare function FilesMoveModal({ open, directories, onClose, onConfirm, initialdirectory_id, title, }: FilesMoveModalProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesMoveModal.d.ts.map