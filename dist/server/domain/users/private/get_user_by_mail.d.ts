import "server-only";
import { GetUserOptions, GetUserResponse } from "../types";
export declare const getUserByMail: <T extends GetUserOptions = {
    includePasswordHash?: false;
}>({ email, includePasswordHash, }: {
    email: string;
} & T) => Promise<GetUserResponse<T>>;
//# sourceMappingURL=get_user_by_mail.d.ts.map