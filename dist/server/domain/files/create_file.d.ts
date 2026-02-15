import "server-only";
type CreateFileInput = {
    file?: FormDataEntryValue | null;
    directory_id?: FormDataEntryValue | null;
    storageFolder?: FormDataEntryValue | null;
    uploaderId?: FormDataEntryValue | null;
};
export declare const createFile: ({ fileData, }: {
    fileData: CreateFileInput;
}) => Promise<{
    result: {
        id: string;
        url: string;
        label: string | null;
        deleted_at: Date | null;
        directory_id: string | null;
        is_deleted: boolean;
        tag: string | null;
        uploaded_at: Date;
        uploaded_by_user_id: string | null;
    };
    total: number;
    uploadedFileUrl: string;
    objectKey: string;
}>;
export {};
//# sourceMappingURL=create_file.d.ts.map