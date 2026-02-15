import "server-only";
import { cookies } from "next/headers";
import { extractAuthenticatedUser } from "./extractAuthenticatedUser";
import { isUserRole } from "../users/types";
export function authCheckMiddleware({ allowedRoles, fn, }) {
    return (async (...args) => {
        try {
            await ensureAccess({
                cookies: await cookies(),
                allowedRoles,
            });
            return fn(...args);
        }
        catch {
            throw {
                result: "error",
                error: "Giriş yetkiniz yok",
            };
        }
    });
}
const ensureAccess = async ({ cookies, allowedRoles, }) => {
    const user = (await extractAuthenticatedUser(cookies.get("access-token")?.value)).user;
    if (!isUserRole(user.role) || !allowedRoles.includes(user.role)) {
        throw new Error("Unauthorized");
    }
};
//# sourceMappingURL=acCheck.js.map