"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "../../../../../utils/classnames";
import Lightbox from "../Lightbox";
const sizeClassNames = {
    "1x1": "",
    "2x1": "lg:col-span-2",
    "1x2": "lg:row-span-2",
    "2x2": "lg:col-span-2 lg:row-span-2",
};
const isValidGallerySize = (value) => value === "1x1" || value === "2x1" || value === "1x2" || value === "2x2";
const isGalleryImageMode = (value) => value === "cover" || value === "contain";
const defaultGridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
const gridClassNamesBySize = {
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    3: defaultGridClassName,
    2: "grid-cols-1 lg:grid-cols-2",
};
export default function Gallery({ items, gridSize, imageMode }) {
    const normalizedItems = useMemo(() => {
        if (!Array.isArray(items)) {
            return [];
        }
        const sanitized = items
            .map((item) => {
            const imageUrl = typeof item?.imageUrl === "string" ? item.imageUrl.trim() : "";
            if (!imageUrl) {
                return null;
            }
            return {
                title: item?.title?.trim() ?? "",
                date: item?.date?.trim() ?? "",
                imageUrl,
                size: isValidGallerySize(item?.size) ? item.size : "1x1",
                href: typeof item?.href === "string" ? item.href.trim() : "",
                imageMode: isGalleryImageMode(item?.imageMode) ? item.imageMode : undefined,
            };
        })
            .filter((item) => Boolean(item));
        return sanitized.length ? sanitized : [];
    }, [items]);
    const galleryImageMode = isGalleryImageMode(imageMode) ? imageMode : "cover";
    const [activeIndex, setActiveIndex] = useState(null);
    const lightboxItems = useMemo(() => normalizedItems.map((item) => ({
        imageUrl: item.imageUrl,
        alt: item.title || "Galeri görseli",
        title: item.title,
        subtitle: item.date,
    })), [normalizedItems]);
    const showNextImage = () => {
        if (!normalizedItems.length) {
            setActiveIndex(null);
            return;
        }
        setActiveIndex((prev) => (prev == null ? 0 : (prev + 1) % normalizedItems.length));
    };
    const showPreviousImage = () => {
        if (!normalizedItems.length) {
            setActiveIndex(null);
            return;
        }
        setActiveIndex((prev) => (prev == null ? normalizedItems.length - 1 : (prev - 1 + normalizedItems.length) % normalizedItems.length));
    };
    return (_jsxs("div", { children: [_jsx(Lightbox, { activeIndex: activeIndex, items: lightboxItems, onClose: () => setActiveIndex(null), onNext: showNextImage, onPrevious: showPreviousImage }), _jsx("div", { className: cn("grid gap-10", gridClassNamesBySize[gridSize ?? 3] ?? defaultGridClassName), children: normalizedItems.map((item, index) => {
                    const spanClass = sizeClassNames[item.size];
                    const hasHref = Boolean(item.href);
                    const resolvedImageMode = item.imageMode ?? galleryImageMode;
                    const objectFitClass = resolvedImageMode === "contain" ? "object-contain" : "object-cover";
                    return (_jsx("div", { className: cn("group flex flex-col gap-2", spanClass), children: _jsxs("div", { className: "relative h-full min-h-64 w-full", children: [_jsx(Image, { fill: true, alt: item.title || "Galeri görseli", className: cn("mb-2 h-full w-full", objectFitClass), priority: index < 4, sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw", src: item.imageUrl }), _jsx("div", { className: "pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition group-hover:opacity-100", children: _jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsx("button", { "aria-label": "G\u00F6rseli b\u00FCy\u00FCt", className: "pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black/80", type: "button", onClick: (event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    setActiveIndex(index);
                                                }, children: _jsx(MagnifyingGlassIcon, { className: "h-5 w-5" }) }), hasHref ? (_jsx(Link, { "aria-label": "Ba\u011Flant\u0131y\u0131 a\u00E7", className: "pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-lg transition hover:bg-white", href: item.href, onClick: (event) => event.stopPropagation(), children: _jsx(LinkIcon, { className: "h-4 w-4" }) })) : null] }) })] }) }, `${item.imageUrl}-${index}`));
                }) })] }));
}
//# sourceMappingURL=Gallery.js.map