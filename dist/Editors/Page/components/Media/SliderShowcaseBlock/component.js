"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RichTextRenderer } from "../../../../Text/Renderer";
import Lightbox from "../Lightbox";
const SIDE_CARD_HEIGHT_RATIO = 0.78;
const MIN_HEIGHT_REM = 20;
const CENTER_CARD_WIDTH_PERCENT = 65;
const SIDE_CARD_WIDTH_PERCENT = 55;
const normalizeHeight = (value, fallback) => {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        return Math.max(MIN_HEIGHT_REM, value);
    }
    return fallback;
};
export default function SliderShowcase({ slides = [], autoPlay = false, autoPlayInterval = 6000, imageMode = "cover", desktopHeight, mobileHeight, }) {
    const normalizedSlides = slides
        .map((slide) => ({
        imageUrl: slide.imageUrl?.trim() ?? "",
        text: slide.text,
    }))
        .filter((slide) => Boolean(slide.imageUrl));
    const desktopStageHeight = normalizeHeight(desktopHeight, 50);
    const sideCardHeight = Number((desktopStageHeight * SIDE_CARD_HEIGHT_RATIO).toFixed(2));
    const mobileStageHeight = normalizeHeight(mobileHeight, 45);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const totalSlides = normalizedSlides.length;
    const currentSlide = normalizedSlides[activeIndex] ?? normalizedSlides[0];
    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
    const toPlainText = (html) => typeof html === "string"
        ? html
            .replace(/<[^>]+>/g, "")
            .replace(/&nbsp;/g, " ")
            .trim()
        : "";
    const lightboxItems = normalizedSlides.map((slide) => {
        const textContent = toPlainText(slide.text);
        return {
            imageUrl: slide.imageUrl,
            alt: textContent || slide.imageUrl,
            title: textContent,
        };
    });
    useEffect(() => {
        if (!autoPlay || totalSlides <= 1 || isHovered || lightboxIndex != null) {
            return undefined;
        }
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalSlides);
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, isHovered, lightboxIndex, totalSlides]);
    const goToSlide = (nextIndex) => {
        if (!totalSlides) {
            return;
        }
        setActiveIndex((nextIndex + totalSlides) % totalSlides);
    };
    const openLightbox = (index) => {
        if (!totalSlides || index < 0 || index >= totalSlides) {
            return;
        }
        setLightboxIndex(index);
    };
    const showLightboxNext = () => {
        if (!totalSlides) {
            return;
        }
        setLightboxIndex((prev) => {
            if (prev == null) {
                return 0;
            }
            return (prev + 1) % totalSlides;
        });
    };
    const showLightboxPrevious = () => {
        if (!totalSlides) {
            return;
        }
        setLightboxIndex((prev) => {
            if (prev == null) {
                return totalSlides - 1;
            }
            return (prev - 1 + totalSlides) % totalSlides;
        });
    };
    if (!totalSlides) {
        return _jsx(_Fragment, {});
    }
    const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (activeIndex + 1) % totalSlides;
    return (_jsx("section", { className: "mb-16 w-full text-slate-900", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: _jsxs("div", { className: "mx-auto w-full max-w-6xl space-y-8 px-4", children: [_jsxs("div", { className: "hidden w-full sm:block", children: [_jsx("div", { className: "relative w-full overflow-hidden", style: { height: `${desktopStageHeight}rem` }, children: normalizedSlides.map((slide, index) => {
                                const isCenter = index === activeIndex;
                                const isPrev = totalSlides > 1 && index === prevIndex;
                                const isNext = totalSlides > 1 && index === nextIndex;
                                const isSide = isPrev || isNext;
                                const isHidden = !isCenter && !isSide;
                                const positionClasses = isCenter ? "z-30" : isSide ? "z-20" : "z-10";
                                const transformValue = (() => {
                                    if (isCenter) {
                                        return "translate(-50%, -50%) scale(1)";
                                    }
                                    if (isPrev) {
                                        return "translate(-95%, -50%) scale(0.9)";
                                    }
                                    if (isNext) {
                                        return "translate(-5%, -50%) scale(0.9)";
                                    }
                                    return "translate(-50%, -50%) scale(0.85)";
                                })();
                                const opacityValue = isCenter ? 1 : isSide ? 0.85 : 0;
                                const widthValue = isCenter ? `${CENTER_CARD_WIDTH_PERCENT}%` : `${SIDE_CARD_WIDTH_PERCENT}%`;
                                const heightValue = isCenter ? `${desktopStageHeight}rem` : `${sideCardHeight}rem`;
                                return (_jsx("button", { "aria-current": isCenter, "aria-hidden": isHidden, "aria-label": slide.text ? `Görsel ${index + 1}` : slide.imageUrl, className: `group absolute overflow-hidden bg-slate-100/60 transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 ${positionClasses}`, disabled: isHidden, style: {
                                        left: "50%",
                                        top: "50%",
                                        transform: transformValue,
                                        opacity: opacityValue,
                                        width: widthValue,
                                        height: heightValue,
                                        pointerEvents: isHidden ? "none" : undefined,
                                    }, type: "button", onClick: () => {
                                        if (isCenter) {
                                            openLightbox(index);
                                        }
                                        else {
                                            goToSlide(index);
                                        }
                                    }, children: _jsx("div", { className: "relative h-full w-full", children: _jsx(Image, { fill: true, alt: slide.text ?? slide.imageUrl, className: `${objectFitClass} transition duration-500 group-hover:scale-105`, priority: isCenter, sizes: "(max-width: 1280px) 60vw, 900px", src: slide.imageUrl }) }) }, `showcase-slide-${index}-${slide.imageUrl}`));
                            }) }), currentSlide?.text ? (_jsx("div", { className: "flex w-full justify-center", children: _jsx("div", { className: "bg-black px-6 py-4 text-sm text-white shadow-xl", style: { width: `${CENTER_CARD_WIDTH_PERCENT}%` }, children: _jsx("div", { className: "richtext text-current **:text-current", children: _jsx(RichTextRenderer, { html: currentSlide.text }) }) }) })) : null] }), _jsxs("div", { className: "sm:hidden", children: [_jsx("div", { className: "relative w-full overflow-hidden", style: { height: `${mobileStageHeight}rem` }, children: _jsx(Image, { fill: true, priority: true, alt: currentSlide.text ?? currentSlide.imageUrl, className: `${objectFitClass}`, sizes: "90vw", src: currentSlide.imageUrl }) }), currentSlide.text ? (_jsx("div", { className: "w-full", children: _jsx("div", { className: "bg-black px-4 py-3 text-sm text-white shadow-xl", children: _jsx("div", { className: "richtext text-current **:text-current", children: _jsx(RichTextRenderer, { html: currentSlide.text }) }) }) })) : null] }), _jsxs("div", { className: "flex flex-row items-center justify-center gap-4 text-slate-500", children: [_jsx("button", { "aria-label": "\u00D6nceki g\u00F6rsel", className: "text-3xl transition hover:text-slate-900", type: "button", onClick: () => goToSlide(activeIndex - 1), children: "\u2039" }), _jsxs("span", { className: "mt-1.5 text-base font-semibold", children: [activeIndex + 1, " / ", totalSlides] }), _jsx("button", { "aria-label": "Sonraki g\u00F6rsel", className: "text-3xl transition hover:text-slate-900", type: "button", onClick: () => goToSlide(activeIndex + 1), children: "\u203A" })] }), _jsx(Lightbox, { activeIndex: lightboxIndex, items: lightboxItems, onClose: () => setLightboxIndex(null), onNext: showLightboxNext, onPrevious: showLightboxPrevious })] }) }));
}
//# sourceMappingURL=Component.js.map