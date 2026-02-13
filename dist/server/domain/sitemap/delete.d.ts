import "server-only";
export declare const deleteRoute: ({ id }: {
    id: string;
}) => Promise<{
    result: {
        active_page_id: string | null;
        created_at: import("../../types/dbtypes").Generated<import("../../types/dbtypes").Timestamp>;
        id: import("../../types/dbtypes").Generated<string>;
        is_active: import("../../types/dbtypes").Generated<boolean>;
        updated_at: import("../../types/dbtypes").Generated<import("../../types/dbtypes").Timestamp>;
        updated_by_user_id: string | null;
        url: string;
    }[];
}>;
//# sourceMappingURL=delete.d.ts.map