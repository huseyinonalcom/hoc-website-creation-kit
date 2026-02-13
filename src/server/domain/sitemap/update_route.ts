import z from "zod";
import "server-only";

import { update } from "../../db/query";

const updateRouteSchema = z.object({
  id: z.uuidv4(),
  url: z.url().optional(),
  active_page_id: z.uuidv4().optional(),
  is_active: z.boolean().optional(),
});

export const updateRoute = async ({
  data,
}: {
  data: z.infer<typeof updateRouteSchema>;
}) => {
  const parsedData = updateRouteSchema.parse(data);

  const { id, ...updateData } = parsedData;

  return {
    result: await update("site_map")
      .where("id", "=", id)
      .set(updateData)
      .returningAll()
      .executeTakeFirstOrThrow(),
    total: 1,
  };
};
