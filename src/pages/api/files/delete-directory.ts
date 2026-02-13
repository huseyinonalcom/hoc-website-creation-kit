import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";

import { deleteDirectory as deleteDirectoryHelper } from "@/server/domain/files/deleteDirectory";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id } = req.body ?? {};
    const deleted = await deleteDirectoryHelper({ id });
    res.status(200).json({ result: "success", deletedIds: deleted.deletedIds });
  } catch (err: any) {
    res.status(400).json({ result: "error", error: err?.message || String(err) });
  }
}
