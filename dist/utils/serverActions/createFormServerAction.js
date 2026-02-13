/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import "server-only";
import { checkAuth, handleActionError, } from "./helpers";
import { formDataToObject } from "../formDataToObject";
/**
 * Wrapper for server action to be used with useActionState.
 * Automatically parses FormData into an object.
 */
export default function createFormServerAction({ allowedRoles, actionFn, }) {
    return async (_initialState, formData) => {
        const rawData = formDataToObject(formData);
        const auth = await checkAuth(allowedRoles);
        if (!auth.success) {
            return {
                ...rawData,
                result: "error",
                error: auth.error,
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
            ...resultData,
            result: "success",
            error: "",
        };
    };
}
//# sourceMappingURL=createFormServerAction.js.map