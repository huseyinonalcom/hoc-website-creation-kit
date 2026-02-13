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
        id: string;
        url: string;
        created_at: Date;
        updated_at: Date;
        updated_by_user_id: string | null;
        active_page_id: string | null;
        is_active: boolean;
    };
    total: number;
}>;
export {};
//# sourceMappingURL=update_route.d.ts.map