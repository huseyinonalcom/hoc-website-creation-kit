import { Updateable } from "kysely";
import z from "zod";
import "server-only";

import { Users } from "../../../types/dbtypes";
import { update } from "../../../db/query";
import { userStatuses } from "../types";

const userSchema = z.object({
  id: z.uuidv4({ error: "Kullanıcı ID'si Geçersiz" }),
  full_name: z.string({ error: "Ad Soyad Geçersiz" }),
  email: z.email({ error: "Geçersiz Eposta" }),
  status: z.enum(userStatuses),
});

export const updateUserDetails = async (data: Updateable<Users>) => {
  const userDetailsData = userSchema.parse(data);

  const payload: Updateable<Users> = {
    ...userDetailsData,
  };

  await update("users", { id: userDetailsData.id })
    .set(payload)
    .returningAll()
    .executeTakeFirstOrThrow(() => new Error("Üye detayları güncellenemedi"));

  return true;
};
