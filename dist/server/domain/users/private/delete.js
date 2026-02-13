import z from "zod";
import "server-only";
import { del } from "../../../db/query";
const userSchema = z.object({
    id: z.uuidv4({ error: "Kullanıcı ID'si Geçersiz" }),
});
export const deleteUser = async (data) => {
    const user = userSchema.parse(data);
    await del("users", { id: user.id }).execute();
    return true;
};
//# sourceMappingURL=delete.js.map