import "server-only";
export declare const createDirectory: ({ name, parentId, }: {
    name: string;
    parentId?: string | null;
}) => Promise<{
    result: {
        id: string;
        name: string;
        created_at: Date;
        parent_id: string | null;
        updated_at: Date;
    };
}>;
export default createDirectory;
//# sourceMappingURL=createDirectory.d.ts.map