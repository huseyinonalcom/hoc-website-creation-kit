import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";

import { updateDirectory as updateDirectoryHelper } from "@/server/domain/files/updateDirectory";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id, name, parentId } = req.body ?? {};
    const updated = await updateDirectoryHelper({ id, name, parentId });
    res.status(200).json({ result: "success", directory: updated.result });
  } catch (err: any) {
    res.status(400).json({ result: "error", error: err?.message || String(err) });
  }
}
