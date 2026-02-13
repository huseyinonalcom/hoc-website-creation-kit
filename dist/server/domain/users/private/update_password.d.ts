import z from "zod";
import "server-only";
declare const userSchema: z.ZodObject<{
    id: z.ZodUUID;
    password: z.ZodString;
}, z.core.$strip>;
export declare const updateUserPassword: (data: z.infer<typeof userSchema>) => Promise<{
    id: string;
    role: string;
    status: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    full_name: string;
    last_login_at: Date | null;
    password_hash: string;
    verified_at: Date | null;
}>;
export {};
//# sourceMappingURL=update_password.d.ts.map