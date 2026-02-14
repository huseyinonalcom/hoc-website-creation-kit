import "server-only";
import { NextResponse } from "next/server";
export declare function GET(): Promise<NextResponse<{
    result: {
        id: string;
        name: string;
        created_at: Date;
        parent_id: string | null;
        updated_at: Date;
    }[];
}>>;
//# sourceMappingURL=route.d.ts.map