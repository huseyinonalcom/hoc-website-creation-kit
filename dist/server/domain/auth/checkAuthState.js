import { cookies } from "next/headers";
import { verifyAccessToken } from "./utils/jwt";
export default async function checkAuthState() {
    const authToken = (await cookies()).get("access-token")?.value;
    if (!authToken) {
        return { result: "error", error: "No auth token" };
    }
    const accessTokenPayload = await verifyAccessToken(authToken);
    return { result: "success", role: accessTokenPayload.role };
}
//# sourceMappingURL=checkAuthState.js.map