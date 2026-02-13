import z from "zod";
import "server-only";
declare const updateRouteSchema: z.ZodObject<{
    id: z.ZodUUID;
    url: z.ZodOptional<z.ZodURL>;
    active_page_id: z.ZodOptional<z.ZodUUID>;
    is_active: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateRoute: ({ data, }: {
    data: z.infer<typeof updateRouteSchema>;
}) => Promise<{
    result: {
        active_page_id: string | null;
        created_at: import("kysely").ColumnType<Date, string | Date | undefined, string | Date> & Date;
        id: import("kysely").ColumnType<string, string | undefined, string> & string;
        is_active: (import("kysely").ColumnType<false, false | undefined, false> | import("kysely").ColumnType<true, true | undefined, true>) & boolean;
        updated_at: import("kysely").ColumnType<Date, string | Date | undefined, string | Date> & Date;
        updated_by_user_id: string | null;
        url: string;
    };
    total: number;
}>;
export {};
//# sourceMappingURL=update_route.d.ts.map