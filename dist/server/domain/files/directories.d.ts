import "server-only";
import type { Selectable } from "kysely";
import { FileDirectories } from "../../types/dbtypes";
export type DirectoryRecord = Selectable<FileDirectories>;
export declare const getDirectories: () => Promise<{
    result: {
        id: string;
        name: string;
        created_at: Date;
        parent_id: string | null;
        updated_at: Date;
    }[];
    total: number;
}>;
export declare const createDirectory: ({ name, parentId, }: {
    name: string;
    parentId?: string | null;
}) => Promise<{
    result: {
        id: string;
        name: string;
        created_at: Date;
        parent_id: string | null;
        updated_at: Date;
    };
    total: number;
}>;
export declare const deleteDirectory: ({ id, }: {
    id: string;
}) => Promise<{
    deletedIds: string[];
}>;
export declare const updateDirectory: ({ id, name, parentId, }: {
    id: string;
    name?: string | null;
    parentId?: string | null;
}) => Promise<{
    result: DirectoryRecord;
}>;
//# sourceMappingURL=directories.d.ts.map