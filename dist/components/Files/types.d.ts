export type SerializableFileRecord = {
    id: string;
    dosya_url: string;
    etiket?: string | null;
    dizin_id?: string | null;
    silindi_mi?: boolean;
    yukleme_tarihi?: string;
    silinme_tarihi?: string | null;
};
export type SerializableDirectoryRecord = {
    id: string;
    ad: string;
    ebeveyn_id?: string | null;
    olusturma_tarihi?: string;
    guncelleme_tarihi?: string;
};
export type UploadFileInput = {
    file: File;
    directoryId?: string | null;
    storageFolder?: string | null;
};
export type CreateDirectoryInput = {
    name: string;
    parentId?: string | null;
};
export type UpdateFileInput = {
    id: string;
    label?: string | null;
    directoryId?: string | null;
};
export type UpdateDirectoryInput = {
    id: string;
    name?: string | null;
    parentId?: string | null;
};
export type DeleteFileInput = {
    id: string;
};
export type DeleteDirectoryInput = {
    id: string;
};
export type CreateDirectoryResponse = {
    result: "success";
    directory: SerializableDirectoryRecord;
} | {
    result: "error";
    error?: string;
};
export type UpdateDirectoryResponse = {
    result: "success";
    directory: SerializableDirectoryRecord;
} | {
    result: "error";
    error?: string;
};
export type UpdateFileResponse = {
    result: "success";
    file: SerializableFileRecord;
} | {
    result: "error";
    error?: string;
};
export type DeleteDirectoryResponse = {
    result: "success";
    deletedIds: string[];
} | {
    result: "error";
    error?: string;
};
export type DeleteFileResponse = {
    result: "success";
    fileId: string;
} | {
    result: "error";
    error?: string;
};
//# sourceMappingURL=types.d.ts.map