"use server";
import "server-only";
import { createDirectory, deleteDirectory, getDirectories, updateDirectory, } from "../server/domain/files/directories";
import createServerAction from "../utils/serverActions/createServerAction";
import { uploadFileInitialState } from "./state";
import { throwCustomError } from "../utils/errors/customerrors";
import { createFile } from "../server/domain/files/create_file";
import { getFiles } from "../server/domain/files/get";
import { update } from "../server/db/query";
export const uploadFileAction = createServerAction({
    allowedRoles: ["admin"],
    actionFn: async ({ data, user }) => {
        const maybeFile = data.file;
        const isValidFile = typeof File !== "undefined" &&
            maybeFile instanceof File &&
            maybeFile.size > 0;
        if (!isValidFile) {
            throwCustomError("Lütfen yüklemek için bir dosya seçin.");
        }
        const directory_idValue = typeof data.directory_id === "string"
            ? data.directory_id.trim().length > 0
                ? data.directory_id.trim()
                : null
            : undefined;
        const storageFolderValue = typeof data.storageFolder === "string" &&
            data.storageFolder.trim().length > 0
            ? data.storageFolder.trim()
            : undefined;
        const fileEntry = maybeFile;
        const created = await createFile({
            fileData: {
                file: fileEntry,
                directory_id: directory_idValue,
                storageFolder: storageFolderValue,
                uploaderId: user?.id ?? null,
            },
        });
        const uploadedFile = created.result;
        const nextState = {
            ...uploadFileInitialState,
            result: "success",
            uploadedFile,
        };
        return nextState;
    },
});
export const updateFileAction = createServerAction({
    allowedRoles: ["admin"],
    actionFn: async ({ data }) => {
        if (!data.id) {
            throwCustomError("Güncellenecek dosya bulunamadı.");
        }
        const labelValue = typeof data.label === "string"
            ? data.label.trim().length > 0
                ? data.label.trim()
                : null
            : undefined;
        const directory_idValue = typeof data.directory_id === "string" &&
            data.directory_id.trim().length > 0
            ? data.directory_id.trim()
            : null;
        const updatePayload = {};
        if (labelValue !== undefined) {
            updatePayload.tag = labelValue;
        }
        if (directory_idValue !== undefined) {
            updatePayload.directory_id = directory_idValue;
        }
        const updated = await update("files", { id: data.id })
            .set(updatePayload)
            .returningAll()
            .executeTakeFirstOrThrow();
        return { file: updated };
    },
});
export const softDeleteFileAction = createServerAction({
    allowedRoles: ["admin"],
    actionFn: async ({ data }) => {
        if (!data.id) {
            throwCustomError("Silinecek dosya bulunamadı.");
        }
        await update("files", { id: data.id })
            .set({ is_deleted: true, deleted_at: new Date() })
            .execute();
        return { fileId: data.id };
    },
});
export const createDirectoryAction = createServerAction({
    allowedRoles: ["admin"],
    actionFn: async ({ data }) => {
        const name = typeof data.name === "string" ? data.name : "";
        const parentId = typeof data.parentId === "string" && data.parentId.trim().length > 0
            ? data.parentId.trim()
            : null;
        const created = await createDirectory({ name, parentId });
        return { directory: created.result };
    },
});
export const deleteDirectoryAction = createServerAction({
    allowedRoles: ["admin"],
    actionFn: async ({ data }) => {
        if (!data.id) {
            throwCustomError("Silinecek klasör bulunamadı.");
        }
        return await deleteDirectory({ id: data.id });
    },
});
export const updateDirectoryAction = createServerAction({
    allowedRoles: ["admin"],
    actionFn: async ({ data }) => {
        if (!data.id) {
            throwCustomError("Güncellenecek klasör bulunamadı.");
        }
        const nameValue = typeof data.name === "string" ? data.name.trim() : undefined;
        const parentValue = typeof data.parentId === "string"
            ? data.parentId.trim().length > 0
                ? data.parentId.trim()
                : null
            : undefined;
        const updated = await updateDirectory({
            id: data.id,
            name: nameValue,
            parentId: parentValue,
        });
        return { directory: updated.result };
    },
});
export const getFilesAction = createServerAction({
    allowedRoles: ["admin"],
    actionFn: async ({ data }) => {
        const includeDeleted = data?.includeDeleted ?? true;
        const { result } = await getFiles({ includeDeleted });
        return { result };
    },
});
export const getDirectoriesAction = createServerAction({
    allowedRoles: ["admin"],
    actionFn: async () => {
        const { result } = await getDirectories();
        return { result };
    },
});
//# sourceMappingURL=actions.js.map