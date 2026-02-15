import "server-only";
export declare const createRoute: ({ url }: {
    url: string;
}) => Promise<{
    result: {
        id: string;
        url: string;
        updated_by_user_id: string | null;
        created_at: Date;
        updated_at: Date;
        active_page_id: string | null;
        is_active: boolean;
    };
    total: number;
}>;
//# sourceMappingURL=create_route.d.ts.map