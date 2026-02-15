import "server-only";
export declare const getUsers: ({ nameFilter, count, page, }: {
    nameFilter?: string;
    kidemNoFilter?: string;
    count?: number;
    page?: number;
}) => Promise<{
    result: {
        status: string;
        role: string;
        id: string;
        email: string;
        created_at: Date;
        updated_at: Date;
        full_name: string;
        last_login_at: Date | null;
        verified_at: Date | null;
    }[];
    total: number;
}>;
//# sourceMappingURL=get_users.d.ts.map