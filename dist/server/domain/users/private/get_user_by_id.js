import "server-only";
import { generatePlaceholderUser } from "../placeholder";
import { authCheckMiddleware } from "../../auth/acCheck";
import { get } from "../../../db/query";
const getUserByIdInternal = async (id, options) => {
    const includePasswordHash = options?.includePasswordHash ?? false;
    if (id === "0") {
        const placeholderUser = generatePlaceholderUser();
        if (includePasswordHash) {
            return {
                result: placeholderUser,
                total: 1,
            };
        }
        const { password_hash: _password_hash, ...userWithoutPassword } = placeholderUser;
        return {
            result: userWithoutPassword,
            total: 1,
        };
    }
    const query = get("users", { id });
    const result = await query.selectAll().executeTakeFirstOrThrow();
    if (includePasswordHash) {
        return {
            result,
            total: 1,
        };
    }
    const { password_hash: _password_hash, ...userWithoutPassword } = result;
    return {
        result: userWithoutPassword,
        total: 1,
    };
};
export const getUserById = authCheckMiddleware({
    allowedRoles: ["admin"],
    fn: getUserByIdInternal,
});
export const getUserByIdForAuth = getUserByIdInternal;
//# sourceMappingURL=get_user_by_id.js.map