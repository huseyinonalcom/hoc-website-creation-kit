import z from "zod";
import "server-only";

import { update } from "@/server/db/query";

import { hashPassword } from "../../auth/utils/pwd";

const userSchema = z.object({
  id: z.uuidv4({ error: "Kullanıcı ID'si Geçersiz" }),
  password: z.string().min(8, { error: "Şifre en az 8 karakter olmalıdır" }),
});

export const updateUserPassword = async (data: z.infer<typeof userSchema>) => {
  const userDetailsData = userSchema.parse(data);

  const hashedPassword = await hashPassword(userDetailsData.password);

  const inserted = await update("users", { id: userDetailsData.id })
    .set({ password_hash: hashedPassword })
    .returningAll()
    .executeTakeFirstOrThrow(() => new Error("Üye detayları güncellenemedi"));
  return inserted;
};
