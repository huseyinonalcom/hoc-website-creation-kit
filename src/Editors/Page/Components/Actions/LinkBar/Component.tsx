"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import cn from "../../../../../utils/classnames";
import { LinkBarProps } from "./type";

const normalizePath = (path: string) => {
  if (!path) return "/";
  try {
    const url = new URL(path, "");
    return url.pathname.replace(/\/+$/, "") || "/";
  } catch {
    const cleaned = path.startsWith("/") ? path : `/${path}`;
    return cleaned.replace(/\/+$/, "") || "/";
  }
};

export function LinkBarBlock({ links = [] }: LinkBarProps) {
  const pathname = normalizePath(usePathname() ?? "/");

  if (!links.length) {
    return <></>;
  }

  return (
    <nav className="hidden w-full flex-row items-center justify-center gap-6 bg-white pt-4 md:flex dark:bg-gray-800">
      {links
        .filter((link) => link.path && link.label)
        .map((link, idx) => {
          const targetPath = normalizePath(link.path!);
          const isActive = pathname === targetPath;
          return (
            <Link
              key={`${link.path}-${idx}`}
              className={cn(
                "border-b-3 pb-4 text-lg font-semibold transition-colors",
                isActive ? "border-blue-600 text-blue-600" : "border-transparent hover:border-blue-600 hover:text-blue-600",
              )}
              href={link.path!}
            >
              {link.label}
            </Link>
          );
        })}
    </nav>
  );
}
