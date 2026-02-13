import { NextRequest } from "next/server";

import { RequestUser } from "../domain/users/types";

export type AuthenticatedRequest = NextRequest & {
  user: RequestUser;
};
