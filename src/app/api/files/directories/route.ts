import "server-only";
import { NextResponse } from "next/server";

import listDirectories from "../../../../server/domain/directories/listDirectories";

export async function GET() {
  const res = await listDirectories();
  return NextResponse.json(res);
}
