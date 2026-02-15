import "server-only";
import { ActionContext, ActionState } from "./helpers";
import { UserRoles } from "../../server/domain/users/types";
/**
 * Wrapper for server action to be used with useActionState.
 * Automatically parses FormData into an object.
 */
export default function createFormServerAction<TOutput extends Record<string, any>>({ allowedRoles, actionFn, }: {
    allowedRoles?: UserRoles[];
    actionFn: (context: ActionContext<Record<string, any>>) => Promise<TOutput>;
}): (_initialState: ActionState<TOutput>, formData: FormData) => Promise<ActionState<TOutput>>;
//# sourceMappingURL=createFormServerAction.d.ts.map