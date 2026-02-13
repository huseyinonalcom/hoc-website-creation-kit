import "server-only";
export declare const listFiles: ({ includeDeleted }?: {
    includeDeleted?: boolean | undefined;
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
    }[];
}>;
export default listFiles;
//# sourceMappingURL=listFiles.d.ts.map