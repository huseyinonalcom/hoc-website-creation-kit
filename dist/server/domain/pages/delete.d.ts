import "server-only";
export declare const deletePage: ({ id }: {
    id: string;
}) => Promise<{
    result: {
        content: import("../../types/dbtypes").Json | null;
        created_at: import("../../types/dbtypes").Generated<import("../../types/dbtypes").Timestamp>;
        created_by_user_id: string | null;
        id: import("../../types/dbtypes").Generated<string>;
        site_map_id: string | null;
        status: import("../../types/dbtypes").Generated<string>;
        updated_at: import("../../types/dbtypes").Generated<import("../../types/dbtypes").Timestamp>;
        updated_by_user_id: string | null;
    }[];
    total: number;
}>;
//# sourceMappingURL=delete.d.ts.map