import "server-only";
import { NextResponse } from "next/server";
import { getFiles } from "../../../../server/domain/files/get";
export async function GET() {
    const res = await getFiles({ includeDeleted: true });
    return NextResponse.json(res);
}
//# sourceMappingURL=route.js.map