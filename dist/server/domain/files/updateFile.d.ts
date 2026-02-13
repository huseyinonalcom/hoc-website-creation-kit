import "server-only";
export declare const updateFile: ({ id, label, directoryId }: {
    id: string;
    label?: string | null;
    directoryId?: string | null;
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
export default updateFile;
//# sourceMappingURL=updateFile.d.ts.map