import { UploadFileInput, CreateDirectoryInput, CreateDirectoryResponse, UpdateFileInput, UpdateFileResponse, DeleteFileInput, DeleteFileResponse, UpdateDirectoryInput, UpdateDirectoryResponse, DeleteDirectoryInput, DeleteDirectoryResponse } from "../types";
import { UploadFileState } from "../state";
export type FilesManagerClientProps = {
    onUploadFile?: (input: UploadFileInput) => Promise<UploadFileState>;
    onCreateDirectory?: (input: CreateDirectoryInput) => Promise<CreateDirectoryResponse>;
    onUpdateFile?: (input: UpdateFileInput) => Promise<UpdateFileResponse>;
    onDeleteFile?: (input: DeleteFileInput) => Promise<DeleteFileResponse>;
    onUpdateDirectory?: (input: UpdateDirectoryInput) => Promise<UpdateDirectoryResponse>;
    onDeleteDirectory?: (input: DeleteDirectoryInput) => Promise<DeleteDirectoryResponse>;
};
export declare function FilesManagerClient({ onUploadFile, onCreateDirectory, onUpdateFile, onDeleteFile, onUpdateDirectory, onDeleteDirectory, }: FilesManagerClientProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilesManagerClient.d.ts.map