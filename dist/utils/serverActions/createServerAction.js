/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import "server-only";
import { checkAuth, handleActionError, } from "./helpers";
/**
 * Wrapper for direct function call server actions (onClick, API-like, effects).
 * Accepts a plain object/JSON.
 */
export default function createServerAction({ allowedRoles, actionFn, }) {
    return async (data) => {
        const rawData = data;
        const auth = await checkAuth(allowedRoles);
        if (!auth.success) {
            return {
                result: "error",
                error: auth.error,
                ...rawData,
            };
        }
        let redirectUrl = null;
        let resultData = null;
        try {
            resultData = await actionFn({ data: rawData, user: auth.user });
            if (resultData && typeof resultData.redirectUrl === "string") {
                redirectUrl = resultData.redirectUrl;
            }
        }
        catch (error) {
            return handleActionError(error, rawData);
        }
        if (redirectUrl) {
            redirect(redirectUrl);
        }
        return {
            result: "success",
            error: "",
            ...resultData,
        };
    };
}
//# sourceMappingURL=createServerAction.js.map