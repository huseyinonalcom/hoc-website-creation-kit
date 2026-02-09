"use client";

import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import cn from "../utils/classnames";

import Lightbox from "./Lightbox";

export type GalleryBlockItemSize = "1x1" | "2x1" | "1x2" | "2x2";
export type GalleryGridSize = 2 | 3 | 4;
export type GalleryImageMode = "cover" | "contain";

export type GalleryBlockItem = {
  title?: string;
  date?: string;
  imageUrl?: string;
  size?: GalleryBlockItemSize;
  href?: string;
  imageMode?: GalleryImageMode;
};

type NormalizedGalleryItem = {
  title: string;
  date: string;
  imageUrl: string;
  size: GalleryBlockItemSize;
  href: string;
  imageMode: GalleryImageMode | undefined;
};

type GalleryProps = {
  items?: GalleryBlockItem[];
  gridSize?: GalleryGridSize;
  imageMode?: GalleryImageMode;
};

const sizeClassNames: Record<GalleryBlockItemSize, string> = {
  "1x1": "",
  "2x1": "lg:col-span-2",
  "1x2": "lg:row-span-2",
  "2x2": "lg:col-span-2 lg:row-span-2",
};

const isValidGallerySize = (value: unknown): value is GalleryBlockItemSize => value === "1x1" || value === "2x1" || value === "1x2" || value === "2x2";

const isGalleryImageMode = (value: unknown): value is GalleryImageMode => value === "cover" || value === "contain";

const defaultGridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

const gridClassNamesBySize: Record<GalleryGridSize, string> = {
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  3: defaultGridClassName,
  2: "grid-cols-1 lg:grid-cols-2",
};

export default function Gallery({ items, gridSize, imageMode }: GalleryProps) {
  const normalizedItems = useMemo<NormalizedGalleryItem[]>(() => {
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
        } satisfies NormalizedGalleryItem;
      })
      .filter((item): item is NormalizedGalleryItem => Boolean(item));

    return sanitized.length ? sanitized : [];
  }, [items]);

  const galleryImageMode = isGalleryImageMode(imageMode) ? imageMode : "cover";

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const lightboxItems = useMemo(
    () =>
      normalizedItems.map((item) => ({
        imageUrl: item.imageUrl,
        alt: item.title || "Galeri görseli",
        title: item.title,
        subtitle: item.date,
      })),
    [normalizedItems],
  );

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

  return (
    <div>
      <Lightbox activeIndex={activeIndex} items={lightboxItems} onClose={() => setActiveIndex(null)} onNext={showNextImage} onPrevious={showPreviousImage} />
      <div className={cn("grid gap-10", gridClassNamesBySize[gridSize ?? 3] ?? defaultGridClassName)}>
        {normalizedItems.map((item, index) => {
          const spanClass = sizeClassNames[item.size];
          const hasHref = Boolean(item.href);
          const resolvedImageMode = item.imageMode ?? galleryImageMode;
          const objectFitClass = resolvedImageMode === "contain" ? "object-contain" : "object-cover";

          return (
            <div key={`${item.imageUrl}-${index}`} className={cn("group flex flex-col gap-2", spanClass)}>
              <div className="relative h-full min-h-64 w-full">
                <Image
                  fill
                  alt={item.title || "Galeri görseli"}
                  className={cn("mb-2 h-full w-full", objectFitClass)}
                  priority={index < 4}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={item.imageUrl}
                />
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      aria-label="Görseli büyüt"
                      className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black/80"
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setActiveIndex(index);
                      }}
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                    {hasHref ? (
                      <Link
                        aria-label="Bağlantıyı aç"
                        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-lg transition hover:bg-white"
                        href={item.href}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
