/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from "next/navigation";
import "server-only";

import {
  ActionContext,
  ActionState,
  checkAuth,
  handleActionError,
} from "./helpers";
import { UserRoles } from "../../server/domain/users/types";

/**
 * Wrapper for direct function call server actions (onClick, API-like, effects).
 * Accepts a plain object/JSON.
 */
export default function createServerAction<
  TInput extends Record<string, any>,
  TOutput extends Record<string, any>,
>({
  allowedRoles,
  actionFn,
}: {
  allowedRoles?: UserRoles[];
  actionFn: (context: ActionContext<TInput>) => Promise<TOutput>;
}) {
  return async (data: TInput): Promise<ActionState<TOutput>> => {
    const rawData = data;

    const auth = await checkAuth(allowedRoles);
    if (!auth.success) {
      return {
        result: "error",
        error: auth.error!,
        ...rawData,
      } as ActionState<TOutput>;
    }

    let redirectUrl: string | null = null;
    let resultData: TOutput | null = null;

    try {
      resultData = await actionFn({ data: rawData, user: auth.user });

      if (resultData && typeof resultData.redirectUrl === "string") {
        redirectUrl = resultData.redirectUrl;
      }
    } catch (error) {
      return handleActionError(error, rawData);
    }

    if (redirectUrl) {
      redirect(redirectUrl);
    }

    return {
      result: "success",
      error: "",
      ...(resultData as TOutput),
    } as ActionState<TOutput>;
  };
}
