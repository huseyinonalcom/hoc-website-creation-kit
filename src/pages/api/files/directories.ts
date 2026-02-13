import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";

import { listDirectories } from "@/server/domain/files/listDirectories";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { result } = await listDirectories();
    res.status(200).json({ result });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || String(err) });
  }
}
