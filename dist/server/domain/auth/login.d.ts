import "server-only";
import { z } from "zod";
declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const login: (data: z.infer<typeof loginSchema>) => Promise<{
    result: string;
    accessToken: string;
}>;
export {};
//# sourceMappingURL=login.d.ts.map