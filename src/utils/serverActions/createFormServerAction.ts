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
import { formDataToObject } from "../formDataToObject";

/**
 * Wrapper for server action to be used with useActionState.
 * Automatically parses FormData into an object.
 */
export default function createFormServerAction<
  TOutput extends Record<string, any>,
>({
  allowedRoles,
  actionFn,
}: {
  allowedRoles?: UserRoles[];
  actionFn: (context: ActionContext<Record<string, any>>) => Promise<TOutput>;
}) {
  return async (
    _initialState: ActionState<TOutput>,
    formData: FormData,
  ): Promise<ActionState<TOutput>> => {
    const rawData = formDataToObject(formData);

    const auth = await checkAuth(allowedRoles);
    if (!auth.success) {
      return {
        ...rawData,
        result: "error",
        error: auth.error!,
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
      ...(resultData as TOutput),
      result: "success",
      error: "",
    } as ActionState<TOutput>;
  };
}
