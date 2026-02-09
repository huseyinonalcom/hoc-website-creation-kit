"use client";

import Image from "next/image";

export type LightboxItem = {
  imageUrl: string;
  alt?: string;
  title?: string;
  subtitle?: string;
};

type LightboxProps = {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function Lightbox({ items, activeIndex, onClose, onNext, onPrevious }: LightboxProps) {
  if (!items.length || activeIndex == null || activeIndex < 0 || activeIndex >= items.length) {
    return null;
  }

  const currentItem = items[activeIndex];
  const altText = currentItem.alt || currentItem.title || "Galeri görseli";

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 flex w-full bg-black/80 p-6" role="dialog">
      <div className="pointer-events-none flex w-full items-center justify-center">
        <div className="pointer-events-auto relative min-h-[80vh] w-full max-w-5xl">
          <Image fill alt={altText} className="object-contain" sizes="80vw" src={currentItem.imageUrl} />

          {(currentItem.title || currentItem.subtitle) && (
            <div className="absolute bottom-6 left-6 max-w-xl rounded-lg bg-black/60 px-4 py-3 text-white shadow-lg backdrop-blur">
              {currentItem.title ? <p className="text-base font-semibold">{currentItem.title}</p> : null}
              {currentItem.subtitle ? <p className="text-sm text-white/80">{currentItem.subtitle}</p> : null}
            </div>
          )}

          <div className="absolute -bottom-16 flex w-full justify-center gap-4">
            <button
              aria-label="Kapat"
              className="rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
            >
              Kapat
            </button>
            <button
              aria-label="Önceki görsel"
              className="rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onPrevious();
              }}
            >
              Önceki
            </button>
            <button
              aria-label="Sonraki görsel"
              className="rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onNext();
              }}
            >
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
