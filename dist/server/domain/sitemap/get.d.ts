import "server-only";
import type { Data } from "hoc-website-creation-kit";
export declare const getSitemap: ({ getAll }: {
    getAll?: boolean;
}) => Promise<{
    result: {
        id: string;
        url: string;
        created_at: Date;
        updated_at: Date;
        updated_by_user_id: string | null;
        active_page_id: string | null;
        is_active: boolean;
    }[];
    total: number;
}>;
export declare const getRouteByUrl: ({ url }: {
    url: string;
}) => Promise<{
    result: {
        id: string;
        url: string;
        created_at: Date;
        updated_at: Date;
        updated_by_user_id: string | null;
        active_page_id: string | null;
        is_active: boolean;
    };
    total: number;
}>;
export declare const getPageByRouteUrl: ({ url, ignoreStatus, returnPlaceholder, }: {
    url: string;
    ignoreStatus?: boolean;
    returnPlaceholder?: boolean;
}) => Promise<{
    result: {
        id: string;
        status: string;
        content: Data;
    };
    total: number;
} | {
    result: null;
    total: number;
} | {
    result: {
        id: string;
        content: import("../../types/dbtypes").JsonValue;
        status: string;
        created_at: Date;
        updated_at: Date;
        updated_by_user_id: string | null;
        created_by_user_id: string | null;
        site_map_id: string | null;
    };
    total: number;
}>;
//# sourceMappingURL=get.d.ts.map