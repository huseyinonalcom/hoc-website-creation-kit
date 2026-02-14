import "server-only";
import { NextResponse } from "next/server";
export declare function GET(): Promise<NextResponse<{
    result: {
        id: string;
        url: string;
        label: string | null;
        deleted_at: Date | null;
        directory_id: string | null;
        is_deleted: boolean;
        tag: string | null;
        uploaded_at: Date;
        uploaded_by_user_id: string | null;
    }[];
    total: number;
}>>;
//# sourceMappingURL=route.d.ts.map