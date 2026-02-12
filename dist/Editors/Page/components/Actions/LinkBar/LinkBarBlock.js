"use client";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "../../../../../utils/classnames";
const normalizePath = (path) => {
    if (!path)
        return "/";
    try {
        const url = new URL(path, "");
        return url.pathname.replace(/\/+$/, "") || "/";
    }
    catch {
        const cleaned = path.startsWith("/") ? path : `/${path}`;
        return cleaned.replace(/\/+$/, "") || "/";
    }
};
export function LinkBarBlock({ links = [] }) {
    const pathname = normalizePath(usePathname() ?? "/");
    if (!links.length) {
        return _jsx(_Fragment, {});
    }
    return (_jsx("nav", { className: "hidden w-full flex-row items-center justify-center gap-6 bg-white pt-4 md:flex dark:bg-gray-800", children: links
            .filter((link) => link.path && link.label)
            .map((link, idx) => {
            const targetPath = normalizePath(link.path);
            const isActive = pathname === targetPath;
            return (_jsx(Link, { className: cn("border-b-3 pb-4 text-lg font-semibold transition-colors", isActive ? "border-blue-600 text-blue-600" : "border-transparent hover:border-blue-600 hover:text-blue-600"), href: link.path, children: link.label }, `${link.path}-${idx}`));
        }) }));
}
//# sourceMappingURL=LinkBarBlock.js.map