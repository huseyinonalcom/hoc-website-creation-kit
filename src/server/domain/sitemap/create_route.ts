import z from "zod";
import "server-only";

import { insert } from "@/server/db/query";

const NULL_OR_BACKSLASH = new RegExp(`[${String.fromCharCode(0)}\\\\]`, "g");

const createRouteSchema = z.string().transform((val) => {
  const cleanString = val.replace(NULL_OR_BACKSLASH, "");

  return cleanString
    .split("/")
    .filter((segment) => {
      if (segment === "") return false;
      if (segment === "." || segment === "..") return false;
      return true;
    })
    .map((segment) => encodeURIComponent(segment))
    .join("/");
});

export const createRoute = async ({ url }: { url: string }) => {
  const parsedUrl = createRouteSchema.parse(url);

  return {
    result: await insert("site_map")
      .values({
        url: parsedUrl,
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
    total: 1,
  };
};
