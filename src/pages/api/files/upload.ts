import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";

import { createFile as createFileHelper } from "@/server/domain/files/createFile";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { base64, originalName, storageFolder, directoryId, uploaderId, contentType } = req.body ?? {};

    if (!base64 || !originalName) {
      return res.status(400).json({ result: "error", error: "Missing file data" });
    }

    const buffer = Buffer.from(base64, "base64");

    const created = await createFileHelper({
      buffer,
      originalName,
      storageFolder,
      directoryId,
      uploaderId,
      contentType,
    });

    res.status(200).json({ result: "success", file: created.file });
  } catch (err: any) {
    res.status(500).json({ result: "error", error: err?.message || String(err) });
  }
}
