import "server-only";
export declare const listDirectories: () => Promise<{
    result: {
        id: string;
        name: string;
        created_at: Date;
        parent_id: string | null;
        updated_at: Date;
    }[];
}>;
export default listDirectories;
//# sourceMappingURL=listDirectories.d.ts.map