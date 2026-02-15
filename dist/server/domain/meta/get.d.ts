import "server-only";
export declare const getMeta: () => Promise<{
    result: {
        id: string;
        content: import("../../types/dbtypes").JsonValue;
        name: string;
        updated_by_user_id: string | null;
    }[];
    total: number;
}>;
//# sourceMappingURL=get.d.ts.map