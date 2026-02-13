import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";

import { updateFile as updateFileHelper } from "@/server/domain/files/updateFile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id, label, directoryId } = req.body ?? {};
    const updated = await updateFileHelper({ id, label, directoryId });
    res.status(200).json({ result: "success", file: updated.file });
  } catch (err: any) {
    res.status(400).json({ result: "error", error: err?.message || String(err) });
  }
}
