import "server-only";
import { z } from "zod";
import { getUserByMail } from "../users/private/get_user_by_mail";
import { createAccessToken } from "./utils/jwt";
import { verifyPassword } from "./utils/pwd";
const loginSchema = z.object({
    email: z.email("E-posta geçersiz"),
    password: z.string().min(8, "Şifre geçersiz"),
});
export const login = async (data) => {
    const { email, password } = loginSchema.parse(data);
    const userData = (await getUserByMail({
        email,
        includePasswordHash: true,
    })).result;
    if (!userData.status || userData.status !== "active") {
        throw new Error("Unauthorized");
    }
    if (!("password_hash" in userData)) {
        throw new Error("Password hash unavailable");
    }
    const passwordHash = userData.password_hash;
    if (!passwordHash || !(await verifyPassword(password, passwordHash))) {
        throw new Error("Unauthorized");
    }
    return {
        result: "success",
        accessToken: await createAccessToken({
            userId: userData.id,
            role: userData.role,
        }),
    };
};
//# sourceMappingURL=login.js.map