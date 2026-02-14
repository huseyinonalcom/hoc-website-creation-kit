import "server-only";
export declare const createFile: ({ buffer, originalName, storageFolder, directory_id, uploaderId, contentType, }: {
    buffer: Buffer | Uint8Array;
    originalName: string;
    storageFolder?: string | null;
    directory_id?: string | null;
    uploaderId?: string | null;
    contentType?: string | undefined;
}) => Promise<{
    file: {
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
}>;
export default createFile;
//# sourceMappingURL=createFile.d.ts.map