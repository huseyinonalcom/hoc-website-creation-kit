import z from "zod";
import "server-only";
export declare const createPageSchema: z.ZodObject<{
    site_map_id: z.ZodOptional<z.ZodUUID>;
    status: z.ZodDefault<z.ZodEnum<{
        draft: "draft";
        published: "published";
    }>>;
    content: z.ZodDefault<z.ZodAny>;
}, z.core.$strip>;
export declare const createPage: ({ pageData, }: {
    pageData: z.infer<typeof createPageSchema>;
}) => Promise<{
    result: {
        id: string;
        content: import("../../types/dbtypes").JsonValue;
        status: string;
        created_at: Date;
        updated_at: Date;
        updated_by_user_id: string | null;
        created_by_user_id: string | null;
        site_map_id: string | null;
    };
    total: number;
}>;
//# sourceMappingURL=create_page.d.ts.map