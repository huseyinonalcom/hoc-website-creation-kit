import "server-only";
import { ActionContext, ActionState } from "./helpers";
import { UserRoles } from "../../server/domain/users/types";
/**
 * Wrapper for direct function call server actions (onClick, API-like, effects).
 * Accepts a plain object/JSON.
 */
export default function createServerAction<TInput extends Record<string, any>, TOutput extends Record<string, any>>({ allowedRoles, actionFn, }: {
    allowedRoles?: UserRoles[];
    actionFn: (context: ActionContext<TInput>) => Promise<TOutput>;
}): (data: TInput) => Promise<ActionState<TOutput>>;
//# sourceMappingURL=createServerAction.d.ts.map