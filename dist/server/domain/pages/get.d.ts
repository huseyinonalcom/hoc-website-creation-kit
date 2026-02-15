import "server-only";
export declare const getPageById: ({ id }: {
    id: string;
}) => Promise<{
    result: {
        status: string;
        id: string;
        content: import("../../types/dbtypes").JsonValue;
        updated_by_user_id: string | null;
        created_at: Date;
        updated_at: Date;
        created_by_user_id: string | null;
        site_map_id: string | null;
    };
    total: number;
}>;
//# sourceMappingURL=get.d.ts.map