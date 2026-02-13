import z from "zod";
import "server-only";
declare const userSchema: z.ZodObject<{
    id: z.ZodUUID;
    password: z.ZodString;
}, z.core.$strip>;
export declare const updateUserPassword: (data: z.infer<typeof userSchema>) => Promise<{
    created_at: import("kysely").ColumnType<Date, string | Date | undefined, string | Date> & Date;
    email: string;
    full_name: string;
    id: import("kysely").ColumnType<string, string | undefined, string> & string;
    last_login_at: (import("../../../types/dbtypes").Timestamp & Date) | null;
    password_hash: string;
    role: import("kysely").ColumnType<string, string | undefined, string> & string;
    status: import("kysely").ColumnType<string, string | undefined, string> & string;
    updated_at: import("kysely").ColumnType<Date, string | Date | undefined, string | Date> & Date;
    verified_at: (import("../../../types/dbtypes").Timestamp & Date) | null;
}>;
export {};
//# sourceMappingURL=update_password.d.ts.map