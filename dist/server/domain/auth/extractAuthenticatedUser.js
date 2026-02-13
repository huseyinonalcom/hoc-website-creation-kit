import "server-only";
import { verifyAccessToken } from "./utils/jwt";
export async function extractAuthenticatedUser(token) {
    if (!token)
        throw new Error("Unauthorized");
    const payload = await verifyAccessToken(token);
    return {
        user: {
            userId: payload.userId,
            role: payload.role,
        },
    };
}
//# sourceMappingURL=extractAuthenticatedUser.js.map