import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";

import { deleteFile as deleteFileHelper } from "@/server/domain/files/deleteFile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id } = req.body ?? {};
    const deleted = await deleteFileHelper({ id });
    res.status(200).json({ result: "success", fileId: deleted.file.id });
  } catch (err: any) {
    res.status(400).json({ result: "error", error: err?.message || String(err) });
  }
}
