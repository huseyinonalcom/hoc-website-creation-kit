"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { SliderProps } from "./type";

import { RichTextRenderer } from "../../../../Text/Renderer";

export default function Slider({
  slides = [],
  autoPlay = false,
  autoPlayInterval = 6000,
  imageMode = "cover",
}: SliderProps) {
  const normalizedSlides = slides
    .map((slide) => ({
      imageUrl: slide.imageUrl?.trim() ?? "",
      text: slide.text,
    }))
    .filter((slide) => Boolean(slide.imageUrl));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalSlides = normalizedSlides.length;
  const currentSlide = normalizedSlides[activeIndex] ?? normalizedSlides[0];
  const objectFitClass =
    imageMode === "contain" ? "object-contain" : "object-cover";

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1 || isHovered) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, totalSlides]);

  const goToSlide = (nextIndex: number) => {
    setActiveIndex((nextIndex + totalSlides) % totalSlides);
  };

  if (!normalizedSlides.length) {
    return <></>;
  }

  return (
    <section
      className="w-full text-slate-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center lg:flex-row">
        <div className="z-10 -mt-16 w-full px-8 lg:m-0 lg:-mr-48 lg:h-100 lg:w-112.5 lg:px-0">
          <div className="h-3 bg-[#f5c302]" />
          <div className="bg-white px-8 py-9">
            {currentSlide.text ? (
              <div className="richtext text-slate-900 **:text-current">
                <RichTextRenderer content={currentSlide.text} />
              </div>
            ) : null}

            <div className="mt-10 flex flex-row items-end justify-end gap-4 text-slate-500">
              <span className="mb-0.5 text-base font-semibold">
                {activeIndex + 1} / {totalSlides}
              </span>
              <button
                aria-label="Önceki görsel"
                className="text-4xl transition hover:border-slate-900 hover:text-slate-900"
                type="button"
                onClick={() => goToSlide(activeIndex - 1)}
              >
                ‹
              </button>
              <button
                aria-label="Sonraki görsel"
                className="text-4xl transition hover:border-slate-900 hover:text-slate-900"
                type="button"
                onClick={() => goToSlide(activeIndex + 1)}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <ul
            aria-live="polite"
            className="flex h-130 w-full transition-transform duration-700 ease-in-out"
            role="list"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {normalizedSlides.map((slide) => (
              <li
                key={slide.imageUrl}
                className="relative h-full w-full shrink-0"
              >
                <Image
                  fill
                  alt={slide.text ?? slide.imageUrl}
                  className={objectFitClass}
                  priority={normalizedSlides.indexOf(slide) == 0}
                  sizes="(max-width: 1200px) 100vw, (max-width: 1280px) 850px, 950px"
                  src={slide.imageUrl}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
