import type { CreateDirectoryInput, CreateDirectoryResponse, UploadFileInput } from "../../../FileManagement/types";
import type { UploadFileState } from "../../../FileManagement/state";
export type EditorImageProps = {
    value?: string;
    onChange: (next: string) => void;
    onUploadFile?: (input: UploadFileInput) => Promise<UploadFileState>;
    onCreateDirectory?: (input: CreateDirectoryInput) => Promise<CreateDirectoryResponse>;
};
export declare function EditorImage({ value, onChange, onUploadFile, onCreateDirectory }: EditorImageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EditorImage.d.ts.map