import { Selectable } from "kysely";
import "server-only";
import { UploadFileState } from "./state";
import { FileDirectories, Files } from "../server/types/dbtypes";
type UploadFileActionInput = {
    file: File | null;
    directory_id?: string | null;
    storageFolder?: string | null;
};
type UpdateFileActionInput = {
    id: string;
    label?: string | null;
    directory_id?: string | null;
};
type UpdateFileActionOutput = {
    file: Selectable<Files>;
};
type SoftDeleteFileActionInput = {
    id: string;
};
type SoftDeleteFileActionOutput = {
    fileId: string;
};
type CreateDirectoryActionInput = {
    name: string;
    parentId?: string | null;
};
type CreateDirectoryActionOutput = {
    directory: Selectable<FileDirectories>;
};
type DeleteDirectoryActionInput = {
    id: string;
};
type DeleteDirectoryActionOutput = {
    deletedIds: string[];
};
type UpdateDirectoryActionInput = {
    id: string;
    name?: string | null;
    parentId?: string | null;
};
type UpdateDirectoryActionOutput = {
    directory: Selectable<FileDirectories>;
};
export type UploadFileInput = UploadFileActionInput;
export type UpdateFileInput = UpdateFileActionInput;
export type UpdateFileResponse = UpdateFileActionOutput;
export type CreateDirectoryInput = CreateDirectoryActionInput;
export type CreateDirectoryResponse = CreateDirectoryActionOutput;
export type DeleteDirectoryInput = DeleteDirectoryActionInput;
export type DeleteDirectoryResponse = DeleteDirectoryActionOutput;
export type UpdateDirectoryInput = UpdateDirectoryActionInput;
export type UpdateDirectoryResponse = UpdateDirectoryActionOutput;
export type DeleteFileInput = SoftDeleteFileActionInput;
export type DeleteFileResponse = SoftDeleteFileActionOutput;
export type ActionUpdateFileOutput = UpdateFileActionOutput;
export declare const uploadFileAction: (data: UploadFileActionInput) => Promise<import("../utils/serverActions/helpers").ActionState<UploadFileState>>;
export declare const updateFileAction: (data: UpdateFileActionInput) => Promise<import("../utils/serverActions/helpers").ActionState<UpdateFileActionOutput>>;
export declare const softDeleteFileAction: (data: SoftDeleteFileActionInput) => Promise<import("../utils/serverActions/helpers").ActionState<SoftDeleteFileActionOutput>>;
export declare const createDirectoryAction: (data: CreateDirectoryActionInput) => Promise<import("../utils/serverActions/helpers").ActionState<CreateDirectoryActionOutput>>;
export declare const deleteDirectoryAction: (data: DeleteDirectoryActionInput) => Promise<import("../utils/serverActions/helpers").ActionState<DeleteDirectoryActionOutput>>;
export declare const updateDirectoryAction: (data: UpdateDirectoryActionInput) => Promise<import("../utils/serverActions/helpers").ActionState<UpdateDirectoryActionOutput>>;
export declare const getFilesAction: (data: {
    includeDeleted?: boolean;
}) => Promise<import("../utils/serverActions/helpers").ActionState<{
    result: Selectable<Files>[];
}>>;
export declare const getDirectoriesAction: (data: {
    name?: string;
}) => Promise<import("../utils/serverActions/helpers").ActionState<{
    result: Selectable<FileDirectories>[];
}>>;
export {};
//# sourceMappingURL=actions.d.ts.map