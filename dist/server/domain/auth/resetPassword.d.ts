import "server-only";
export declare const resetPassword: ({ token, newPassword, }: {
    token: string;
    newPassword: string;
}) => Promise<{
    result: string;
}>;
export declare const requestPasswordReset: ({ email, host, }: {
    email: string;
    host: string;
}) => Promise<{
    result: string;
}>;
//# sourceMappingURL=resetPassword.d.ts.map