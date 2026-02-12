import "server-only";
type CreateFileInput = {
    file?: FormDataEntryValue | null;
    directoryId?: FormDataEntryValue | null;
    storageFolder?: FormDataEntryValue | null;
    uploaderId?: FormDataEntryValue | null;
};
export type CreateFileResult = {
    fileUrl: string;
    objectKey: string;
    originalName: string;
    contentType: string;
    size: number;
    directoryId: string | null;
    storageFolder: string;
    uploaderId: string | null;
};
export declare const createFile: ({ fileData }: {
    fileData: CreateFileInput;
}) => Promise<CreateFileResult>;
export {};
//# sourceMappingURL=create_file.d.ts.map