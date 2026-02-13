import { Insertable } from "kysely";
import "server-only";
import { Users } from "../../../types/dbtypes";
export declare const createFirstAdminUser: (data: Insertable<Users> & {
    password: string;
}) => Promise<unknown>;
//# sourceMappingURL=create_first_user.d.ts.map