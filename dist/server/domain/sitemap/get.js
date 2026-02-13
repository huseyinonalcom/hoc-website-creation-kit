import "server-only";
import { getPageById } from "../pages/get";
import { get } from "../../db/query";
export const getSitemap = async ({ getAll }) => {
    const query = get("site_map").selectAll();
    if (getAll) {
        return {
            result: await query.execute(),
            total: 1,
        };
    }
    else {
        const result = await query.where("is_active", "=", true).execute();
        return { result, total: result.length };
    }
};
export const getRouteByUrl = async ({ url }) => {
    return {
        result: await get("site_map")
            .where("url", "=", url)
            .selectAll()
            .executeTakeFirstOrThrow(),
        total: 1,
    };
};
export const getPageByRouteUrl = async ({ url, ignoreStatus = false, returnPlaceholder = false, }) => {
    const emptyReturn = () => {
        if (returnPlaceholder) {
            return {
                result: pagePlaceholder,
                total: 1,
            };
        }
        else {
            return {
                result: null,
                total: 0,
            };
        }
    };
    const normalizedUrl = normalizeRoutePath(url);
    const encodedUrl = encodeRoutePath(normalizedUrl);
    const candidateUrls = buildRouteLookupCandidates(url, normalizedUrl, encodedUrl);
    let route;
    for (const candidate of candidateUrls) {
        route = await getRouteRecordByExactUrl(candidate);
        if (route) {
            break;
        }
    }
    if (!route) {
        route = await findDynamicRouteByUrl(normalizedUrl);
    }
    if (route &&
        (route.is_active == true || ignoreStatus) &&
        route.active_page_id) {
        return {
            result: (await getPageById({ id: route.active_page_id })).result,
            total: 1,
        };
    }
    return emptyReturn();
};
const pagePlaceholder = {
    id: "placeholder",
    status: "draft",
    content: {},
};
const getRouteRecordByExactUrl = async (url) => {
    if (url == null) {
        return undefined;
    }
    return get("site_map").selectAll().where("url", "=", url).executeTakeFirst();
};
const findDynamicRouteByUrl = async (url) => {
    if (url == null) {
        return undefined;
    }
    const routes = await get("site_map").selectAll().execute();
    const target = normalizeRoutePath(url);
    return routes.find((route) => {
        const pattern = decodeRoutePath(route.url ?? "");
        return isDynamicRoutePattern(pattern) && routeMatchesUrl(pattern, target);
    });
};
const dynamicSegmentRegex = /\[(?:\.\.\.)?[^\]]+\]/;
const dynamicRouteRegexCache = new Map();
const normalizeRoutePath = (path) => (path ?? "").trim().replace(/^\/+/, "").replace(/\/+$/, "");
const buildRouteLookupCandidates = (...values) => {
    const seen = new Set();
    const candidates = [];
    values.forEach((value) => {
        if (value == null) {
            return;
        }
        const candidate = value;
        if (seen.has(candidate)) {
            return;
        }
        seen.add(candidate);
        candidates.push(candidate);
    });
    return candidates;
};
const encodeRoutePath = (path) => {
    const segments = splitRouteSegments(path);
    if (segments.length === 0) {
        return "";
    }
    return segments.map((segment) => encodeURIComponent(segment)).join("/");
};
const decodeRoutePath = (path) => {
    const normalized = normalizeRoutePath(path);
    if (!normalized) {
        return "";
    }
    return normalized
        .split("/")
        .map((segment) => {
        try {
            return decodeURIComponent(segment);
        }
        catch {
            return segment;
        }
    })
        .join("/");
};
const splitRouteSegments = (path) => normalizeRoutePath(path)
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
const isDynamicRoutePattern = (pattern) => pattern.length > 0 && dynamicSegmentRegex.test(pattern);
const routeMatchesUrl = (pattern, url) => {
    if (!isDynamicRoutePattern(pattern)) {
        return pattern === url;
    }
    let regex = dynamicRouteRegexCache.get(pattern);
    if (!regex) {
        regex = buildRouteRegex(pattern);
        dynamicRouteRegexCache.set(pattern, regex);
    }
    return regex.test(url);
};
const buildRouteRegex = (pattern) => {
    const normalizedPattern = normalizeRoutePath(pattern);
    if (!normalizedPattern) {
        return /^$/i;
    }
    const segments = normalizedPattern.split("/");
    let source = "^";
    segments.forEach((segment, index) => {
        const prefix = index === 0 ? "" : "/";
        const trimmed = segment.trim();
        if (/^\[\[\.\.\.[^\]]+\]\]$/.test(trimmed)) {
            source += `(?:${prefix}(?:.+))?`;
            return;
        }
        if (/^\[\.\.\.[^\]]+\]$/.test(trimmed)) {
            source += `${prefix}(?:.+)`;
            return;
        }
        if (/^\[[^\]]+\]$/.test(trimmed)) {
            source += `${prefix}(?:[^/]+)`;
            return;
        }
        source += `${prefix}${escapeRegex(trimmed)}`;
    });
    source += "$";
    return new RegExp(source, "i");
};
const escapeRegex = (value) => value.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
//# sourceMappingURL=get.js.map