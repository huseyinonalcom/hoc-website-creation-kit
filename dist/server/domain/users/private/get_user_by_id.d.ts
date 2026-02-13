import "server-only";
import { GetUserOptions, GetUserResponse } from "../types";
export declare const getUserById: <T extends GetUserOptions = {
    includePasswordHash?: false;
}>(id: string, options?: T) => Promise<GetUserResponse<T>>;
export declare const getUserByIdForAuth: <T extends GetUserOptions = {
    includePasswordHash?: false;
}>(id: string, options?: T) => Promise<GetUserResponse<T>>;
//# sourceMappingURL=get_user_by_id.d.ts.map