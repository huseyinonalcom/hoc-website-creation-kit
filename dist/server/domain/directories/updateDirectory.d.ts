import "server-only";
export declare const updateDirectory: ({ id, name, parentId, }: {
    id: string;
    name?: string | null;
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
export default updateDirectory;
//# sourceMappingURL=updateDirectory.d.ts.map