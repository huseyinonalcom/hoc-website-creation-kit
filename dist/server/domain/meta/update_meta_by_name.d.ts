import z from "zod";
export declare const updateMetaSchema: z.ZodObject<{
    name: z.ZodString;
    content: z.ZodAny;
}, z.core.$strip>;
export declare const updateMetaByName: (data: z.infer<typeof updateMetaSchema>) => Promise<{
    result: {
        id: string;
        name: string;
        content: import("../../types/dbtypes").JsonValue;
        updated_by_user_id: string | null;
    };
    total: number;
}>;
//# sourceMappingURL=update_meta_by_name.d.ts.map