import z from "zod";

import { insert, update } from "@/server/db/query";

export const updateMetaSchema = z.object({
  name: z.string(),
  content: z.any(),
});

export const updateMetaByName = async (
  data: z.infer<typeof updateMetaSchema>,
) => {
  const parsedData = updateMetaSchema.parse(data);

  const { name, ...updateData } = parsedData;

  const updated = await update("meta")
    .where("name", "=", name)
    .set(updateData)
    .returningAll()
    .executeTakeFirst();

  if (updated) {
    return { result: updated, total: 1 };
  }

  const inserted = await insert("meta")
    .values({ name, ...updateData })
    .returningAll()
    .executeTakeFirstOrThrow();

  return { result: inserted, total: 1 };
};
