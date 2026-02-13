export default function checkAuthState(): Promise<{
    result: string;
    error: string;
    role?: undefined;
} | {
    result: string;
    role: "admin";
    error?: undefined;
}>;
//# sourceMappingURL=checkAuthState.d.ts.map