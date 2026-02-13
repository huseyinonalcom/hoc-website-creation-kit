import { Insertable } from "kysely";
import "server-only";
import z from "zod";

import { usersEmpty } from "@/instrumentation";
import { insert } from "@/server/db/query";
import { Users } from "@/server/dbtypes";

import { hashPassword } from "../../auth/utils/pwd";

const firstAdminUserSchema = z.object({
  full_name: z
    .string({ error: "Ad Soyad Geçersiz" })
    .min(2, { error: "Ad Soyad en az 2 karakter olmalıdır" })
    .max(128, { error: "Ad Soyad en fazla 128 karakter olabilir" }),
  email: z
    .email({ error: "Geçersiz Eposta" })
    .max(255, { error: "Eposta en fazla 255 karakter olabilir" }),
  password: z
    .string()
    .min(8, { error: "Şifre en az 8 karakter olmalıdır" })
    .max(64, { error: "Şifre en fazla 64 karakter olabilir" }),
});

export const createFirstAdminUser = async (
  data: Insertable<Users> & { password: string },
) => {
  try {
    const noUsers = await usersEmpty();

    if (!noUsers) {
      return new Error(
        "İlk yönetici kullanıcı yalnızca boş bir veritabanında oluşturulabilir.",
      );
    }

    const rawFirstAdminUserData = firstAdminUserSchema.parse(data);

    const { password, ...firstAdminUserDataWithoutPassword } =
      rawFirstAdminUserData;

    const dataToInsert: Insertable<Users> = {
      ...firstAdminUserDataWithoutPassword,
      password_hash: await hashPassword(password),
      status: "active",
      role: "admin",
    };

    await insert("users").values(dataToInsert).execute();

    return true;
  } catch (error) {
    return error;
  }
};
