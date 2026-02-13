import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";

import { createDirectory as createDir } from "@/server/domain/files/createDirectory";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { name, parentId } = req.body ?? {};
    const result = await createDir({ name, parentId });
    res.status(200).json({ result: { result: "success", directory: result.result } });
  } catch (err: any) {
    res.status(400).json({ result: "error", error: err?.message || String(err) });
  }
}
