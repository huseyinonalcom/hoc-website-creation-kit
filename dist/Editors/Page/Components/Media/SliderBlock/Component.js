"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RichTextRenderer } from "../../../../Text/Renderer";
export default function Slider({ slides = [], autoPlay = false, autoPlayInterval = 6000, imageMode = "cover", }) {
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
    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
    useEffect(() => {
        if (!autoPlay || totalSlides <= 1 || isHovered) {
            return undefined;
        }
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalSlides);
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, isHovered, totalSlides]);
    const goToSlide = (nextIndex) => {
        setActiveIndex((nextIndex + totalSlides) % totalSlides);
    };
    if (!normalizedSlides.length) {
        return _jsx(_Fragment, {});
    }
    return (_jsx("section", { className: "w-full text-slate-900", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: _jsxs("div", { className: "mx-auto flex w-full max-w-7xl flex-col-reverse items-center lg:flex-row", children: [_jsxs("div", { className: "z-10 -mt-16 w-full px-8 lg:m-0 lg:-mr-48 lg:h-100 lg:w-112.5 lg:px-0", children: [_jsx("div", { className: "h-3 bg-[#f5c302]" }), _jsxs("div", { className: "bg-white px-8 py-9", children: [currentSlide.text ? (_jsx("div", { className: "richtext text-slate-900 **:text-current", children: _jsx(RichTextRenderer, { content: currentSlide.text }) })) : null, _jsxs("div", { className: "mt-10 flex flex-row items-end justify-end gap-4 text-slate-500", children: [_jsxs("span", { className: "mb-0.5 text-base font-semibold", children: [activeIndex + 1, " / ", totalSlides] }), _jsx("button", { "aria-label": "\u00D6nceki g\u00F6rsel", className: "text-4xl transition hover:border-slate-900 hover:text-slate-900", type: "button", onClick: () => goToSlide(activeIndex - 1), children: "\u2039" }), _jsx("button", { "aria-label": "Sonraki g\u00F6rsel", className: "text-4xl transition hover:border-slate-900 hover:text-slate-900", type: "button", onClick: () => goToSlide(activeIndex + 1), children: "\u203A" })] })] })] }), _jsx("div", { className: "w-full overflow-hidden", children: _jsx("ul", { "aria-live": "polite", className: "flex h-130 w-full transition-transform duration-700 ease-in-out", role: "list", style: { transform: `translateX(-${activeIndex * 100}%)` }, children: normalizedSlides.map((slide) => (_jsx("li", { className: "relative h-full w-full shrink-0", children: _jsx(Image, { fill: true, alt: slide.text ?? slide.imageUrl, className: objectFitClass, priority: normalizedSlides.indexOf(slide) == 0, sizes: "(max-width: 1200px) 100vw, (max-width: 1280px) 850px, 950px", src: slide.imageUrl }) }, slide.imageUrl))) }) })] }) }));
}
//# sourceMappingURL=Component.js.map