import z from "zod";
import "server-only";

import { insert } from "@/server/db/query";

export const createPageSchema = z.object({
  site_map_id: z.uuidv4("Site haritası ID'si geçerli değil").optional(),
  status: z
    .enum(["draft", "published"], "Durum geçerli değil")
    .default("draft"),
  content: z.any().default({}),
});

export const createPage = async ({
  pageData,
}: {
  pageData: z.infer<typeof createPageSchema>;
}) => {
  const parsedPageData = createPageSchema.parse(pageData);

  return {
    result: await insert("pages")
      .values(parsedPageData)
      .returningAll()
      .executeTakeFirstOrThrow(),
    total: 1,
  };
};
