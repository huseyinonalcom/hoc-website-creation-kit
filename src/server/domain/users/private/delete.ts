import { Updateable } from "kysely";
import z from "zod";
import "server-only";

import { Users } from "@/server/dbtypes";
import { del } from "@/server/db/query";

const userSchema = z.object({
  id: z.uuidv4({ error: "Kullanıcı ID'si Geçersiz" }),
});

export const deleteUser = async (data: Updateable<Users>) => {
  const user = userSchema.parse(data);

  await del("users", { id: user.id }).execute();

  return true;
};
