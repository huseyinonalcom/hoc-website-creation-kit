import "server-only";
import { get } from "../../../db/query";
export const getUserByMail = async ({ email, includePasswordHash, }) => {
    const includeHash = includePasswordHash ?? false;
    const userData = await get("users")
        .where("email", "=", email)
        .selectAll()
        .executeTakeFirstOrThrow();
    if (includeHash) {
        return {
            result: userData,
            total: 1,
        };
    }
    const { password_hash: _password_hash, ...userWithoutPassword } = userData;
    return {
        result: userWithoutPassword,
        total: 1,
    };
};
//# sourceMappingURL=get_user_by_mail.js.map