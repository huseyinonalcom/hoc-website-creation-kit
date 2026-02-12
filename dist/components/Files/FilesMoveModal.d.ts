import type { SerializableDirectoryRecord } from "./types";
export type FilesMoveModalProps = {
    open: boolean;
    directories: SerializableDirectoryRecord[];
    onClose: () => void;
    onConfirm: (directoryId: string | null) => void;
    initialDirectoryId?: string | null;
    title?: string;
};
export declare function FilesMoveModal({ open, directories, onClose, onConfirm, initialDirectoryId, title }: FilesMoveModalProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesMoveModal.d.ts.map