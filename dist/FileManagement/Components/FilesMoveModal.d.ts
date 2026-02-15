import { Selectable } from "kysely";
import { FileDirectories } from "../../server/types/dbtypes";
export type FilesMoveModalProps = {
    open: boolean;
    directories: Selectable<FileDirectories>[];
    onClose: () => void;
    onConfirm: (directory_id: string | null) => void;
    initialdirectory_id?: string | null;
    title?: string;
};
export declare function FilesMoveModal({ open, directories, onClose, onConfirm, initialdirectory_id, title, }: FilesMoveModalProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesMoveModal.d.ts.map