import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";

import { listFiles } from "@/server/domain/files/listFiles";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { result } = await listFiles({ includeDeleted: true });
    res.status(200).json({ result });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || String(err) });
  }
}
