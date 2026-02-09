// src/components/AccordionBlock.tsx
import { useMemo, useState } from "react";

// src/utils/classnames.ts
import { twMerge } from "tailwind-merge";
function cn(...classes) {
  return twMerge(classes.filter(Boolean).join(" "));
}

// src/components/AccordionBlock.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function AccordionBlock({
  sections = [],
  isEditing = false
}) {
  const sanitizedSections = useMemo(() => {
    return sections.filter(
      (section) => Boolean(section)
    );
  }, [sections]);
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenIndex((prev) => prev === index ? null : index);
  };
  if (!sanitizedSections.length) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  return /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden", children: sanitizedSections.map((section, index) => {
    const isOpen = openIndex === index || isEditing;
    const title = section.title?.trim() || `B\xF6l\xFCm ${index + 1}`;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn("border-b-2 border-gray-500 *:last:border-b-0"),
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              "aria-expanded": isOpen,
              className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
              type: "button",
              onClick: () => handleToggle(index),
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-base font-bold", children: title }),
                /* @__PURE__ */ jsx(
                  ArrowIcon,
                  {
                    className: cn(
                      "h-5 w-5 transition-transform",
                      isOpen && "rotate-180"
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "grid overflow-hidden px-5 transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              ),
              children: /* @__PURE__ */ jsx("div", { className: "min-h-0", children: section.children ? section.children : /* @__PURE__ */ jsx("p", { className: "text-sm" }) })
            }
          )
        ]
      },
      `accordion-section-${index}-${title}`
    );
  }) });
}
function ArrowIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      className,
      fill: "none",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M6 9l6 6 6-6",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "1.5"
        }
      )
    }
  );
}

// src/components/Button.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var baseClasses = "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
var variantClasses = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400",
  secondary: "bg-gray-900 text-white hover:bg-gray-800 focus-visible:outline-gray-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:outline-gray-300 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
  ghost: "text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-200 dark:text-white dark:hover:bg-white/10",
  danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
  subtle: "bg-white text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-200 dark:bg-white/10 dark:text-white dark:inset-ring-white/10 dark:hover:bg-white/15"
};
function Button({
  variant = "primary",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "button",
    {
      className: cn(baseClasses, variantClasses[variant], className),
      ...props
    }
  );
}
function ButtonLink({
  variant = "outline",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "a",
    {
      className: cn(baseClasses, variantClasses[variant], className),
      ...props
    }
  );
}

// src/components/Gallery.tsx
import { LinkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMemo as useMemo2, useState as useState2 } from "react";
import Image2 from "next/image";
import Link from "next/link";

// src/components/Lightbox.tsx
import Image from "next/image";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Lightbox({
  items,
  activeIndex,
  onClose,
  onNext,
  onPrevious
}) {
  if (!items.length || activeIndex == null || activeIndex < 0 || activeIndex >= items.length) {
    return null;
  }
  const currentItem = items[activeIndex];
  const altText = currentItem.alt || currentItem.title || "Galeri g\xF6rseli";
  return /* @__PURE__ */ jsx3(
    "div",
    {
      "aria-modal": "true",
      className: "fixed inset-0 z-50 flex w-full bg-black/80 p-6",
      role: "dialog",
      children: /* @__PURE__ */ jsx3("div", { className: "pointer-events-none flex w-full items-center justify-center", children: /* @__PURE__ */ jsxs2("div", { className: "pointer-events-auto relative min-h-[80vh] w-full max-w-5xl", children: [
        /* @__PURE__ */ jsx3(
          Image,
          {
            fill: true,
            alt: altText,
            className: "object-contain",
            sizes: "80vw",
            src: currentItem.imageUrl
          }
        ),
        (currentItem.title || currentItem.subtitle) && /* @__PURE__ */ jsxs2("div", { className: "absolute bottom-6 left-6 max-w-xl rounded-lg bg-black/60 px-4 py-3 text-white shadow-lg backdrop-blur", children: [
          currentItem.title ? /* @__PURE__ */ jsx3("p", { className: "text-base font-semibold", children: currentItem.title }) : null,
          currentItem.subtitle ? /* @__PURE__ */ jsx3("p", { className: "text-sm text-white/80", children: currentItem.subtitle }) : null
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "absolute -bottom-16 flex w-full justify-center gap-4", children: [
          /* @__PURE__ */ jsx3(
            "button",
            {
              "aria-label": "Kapat",
              className: "rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20",
              type: "button",
              onClick: (event) => {
                event.stopPropagation();
                onClose();
              },
              children: "Kapat"
            }
          ),
          /* @__PURE__ */ jsx3(
            "button",
            {
              "aria-label": "\xD6nceki g\xF6rsel",
              className: "rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20",
              type: "button",
              onClick: (event) => {
                event.stopPropagation();
                onPrevious();
              },
              children: "\xD6nceki"
            }
          ),
          /* @__PURE__ */ jsx3(
            "button",
            {
              "aria-label": "Sonraki g\xF6rsel",
              className: "rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur transition hover:bg-white/20",
              type: "button",
              onClick: (event) => {
                event.stopPropagation();
                onNext();
              },
              children: "Sonraki"
            }
          )
        ] })
      ] }) })
    }
  );
}

// src/components/Gallery.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var sizeClassNames = {
  "1x1": "",
  "2x1": "lg:col-span-2",
  "1x2": "lg:row-span-2",
  "2x2": "lg:col-span-2 lg:row-span-2"
};
var isValidGallerySize = (value) => value === "1x1" || value === "2x1" || value === "1x2" || value === "2x2";
var isGalleryImageMode = (value) => value === "cover" || value === "contain";
var defaultGridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
var gridClassNamesBySize = {
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  3: defaultGridClassName,
  2: "grid-cols-1 lg:grid-cols-2"
};
function Gallery({ items, gridSize, imageMode }) {
  const normalizedItems = useMemo2(() => {
    if (!Array.isArray(items)) {
      return [];
    }
    const sanitized = items.map((item) => {
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
        imageMode: isGalleryImageMode(item?.imageMode) ? item.imageMode : void 0
      };
    }).filter((item) => Boolean(item));
    return sanitized.length ? sanitized : [];
  }, [items]);
  const galleryImageMode = isGalleryImageMode(imageMode) ? imageMode : "cover";
  const [activeIndex, setActiveIndex] = useState2(null);
  const lightboxItems = useMemo2(
    () => normalizedItems.map((item) => ({
      imageUrl: item.imageUrl,
      alt: item.title || "Galeri g\xF6rseli",
      title: item.title,
      subtitle: item.date
    })),
    [normalizedItems]
  );
  const showNextImage = () => {
    if (!normalizedItems.length) {
      setActiveIndex(null);
      return;
    }
    setActiveIndex(
      (prev) => prev == null ? 0 : (prev + 1) % normalizedItems.length
    );
  };
  const showPreviousImage = () => {
    if (!normalizedItems.length) {
      setActiveIndex(null);
      return;
    }
    setActiveIndex(
      (prev) => prev == null ? normalizedItems.length - 1 : (prev - 1 + normalizedItems.length) % normalizedItems.length
    );
  };
  return /* @__PURE__ */ jsxs3("div", { children: [
    /* @__PURE__ */ jsx4(
      Lightbox,
      {
        activeIndex,
        items: lightboxItems,
        onClose: () => setActiveIndex(null),
        onNext: showNextImage,
        onPrevious: showPreviousImage
      }
    ),
    /* @__PURE__ */ jsx4(
      "div",
      {
        className: cn(
          "grid gap-10",
          gridClassNamesBySize[gridSize ?? 3] ?? defaultGridClassName
        ),
        children: normalizedItems.map((item, index) => {
          const spanClass = sizeClassNames[item.size];
          const hasHref = Boolean(item.href);
          const resolvedImageMode = item.imageMode ?? galleryImageMode;
          const objectFitClass = resolvedImageMode === "contain" ? "object-contain" : "object-cover";
          return /* @__PURE__ */ jsx4(
            "div",
            {
              className: cn("group flex flex-col gap-2", spanClass),
              children: /* @__PURE__ */ jsxs3("div", { className: "relative h-full min-h-64 w-full", children: [
                /* @__PURE__ */ jsx4(
                  Image2,
                  {
                    fill: true,
                    alt: item.title || "Galeri g\xF6rseli",
                    className: cn("mb-2 h-full w-full", objectFitClass),
                    priority: index < 4,
                    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
                    src: item.imageUrl
                  }
                ),
                /* @__PURE__ */ jsx4("div", { className: "pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition group-hover:opacity-100", children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-center gap-3", children: [
                  /* @__PURE__ */ jsx4(
                    "button",
                    {
                      "aria-label": "G\xF6rseli b\xFCy\xFCt",
                      className: "pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black/80",
                      type: "button",
                      onClick: (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setActiveIndex(index);
                      },
                      children: /* @__PURE__ */ jsx4(MagnifyingGlassIcon, { className: "h-5 w-5" })
                    }
                  ),
                  hasHref ? /* @__PURE__ */ jsx4(
                    Link,
                    {
                      "aria-label": "Ba\u011Flant\u0131y\u0131 a\xE7",
                      className: "pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow-lg transition hover:bg-white",
                      href: item.href,
                      onClick: (event) => event.stopPropagation(),
                      children: /* @__PURE__ */ jsx4(LinkIcon, { className: "h-4 w-4" })
                    }
                  ) : null
                ] }) })
              ] })
            },
            `${item.imageUrl}-${index}`
          );
        })
      }
    )
  ] });
}

// src/components/HeadingBlock.defaults.ts
var HEADING_TEXT_COLOR_LIGHT = "#111827";
var HEADING_TEXT_COLOR_DARK = "#f8fafc";
var HEADING_DECORATION_COLOR_LIGHT = "#f5c302";
var HEADING_DECORATION_COLOR_DARK = "#f5c302";
var headingDefaultValues = {
  level: "h2",
  textAlign: "left",
  fontSize: 48,
  fontWeight: 600,
  italic: false,
  textColorLight: HEADING_TEXT_COLOR_LIGHT,
  textColorDark: HEADING_TEXT_COLOR_DARK,
  decorationEnabled: false,
  decorationWidth: 96,
  decorationThickness: 8,
  decorationSpacing: 12,
  decorationColorLight: HEADING_DECORATION_COLOR_LIGHT,
  decorationColorDark: HEADING_DECORATION_COLOR_DARK,
  underlineMode: "inline",
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 8
};

// src/components/HeadingBlock.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var headingAlignmentMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};
var headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];
var MIN_FONT_SIZE = 12;
var DEFAULT_FONT_SIZE = headingDefaultValues.fontSize;
var DEFAULT_FONT_WEIGHT = headingDefaultValues.fontWeight;
var MIN_DECORATION_WIDTH = 12;
var MIN_DECORATION_THICKNESS = 1;
var DEFAULT_DECORATION_WIDTH = headingDefaultValues.decorationWidth;
var DEFAULT_DECORATION_THICKNESS = headingDefaultValues.decorationThickness;
var DEFAULT_DECORATION_SPACING = headingDefaultValues.decorationSpacing;
var normalizeNumber = (value, fallback, min) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }
  const normalized = min !== void 0 ? Math.max(value, min) : value;
  return Number.isFinite(normalized) ? normalized : fallback;
};
var resolveColor = (value, fallback) => {
  const next = typeof value === "string" ? value.trim() : "";
  if (next.length > 0) {
    return next;
  }
  const fallbackValue = typeof fallback === "string" ? fallback.trim() : "";
  if (fallbackValue.length > 0) {
    return fallbackValue;
  }
  return HEADING_TEXT_COLOR_LIGHT;
};
function HeadingBlock({
  text,
  level = headingDefaultValues.level,
  textAlign = headingDefaultValues.textAlign,
  fontSize = DEFAULT_FONT_SIZE,
  fontWeight = DEFAULT_FONT_WEIGHT,
  italic = headingDefaultValues.italic,
  textColor,
  textColorLight = headingDefaultValues.textColorLight,
  textColorDark = headingDefaultValues.textColorDark,
  decorationEnabled = headingDefaultValues.decorationEnabled,
  decorationWidth = DEFAULT_DECORATION_WIDTH,
  decorationThickness = DEFAULT_DECORATION_THICKNESS,
  decorationSpacing = DEFAULT_DECORATION_SPACING,
  decorationColor,
  decorationColorLight = headingDefaultValues.decorationColorLight,
  decorationColorDark = headingDefaultValues.decorationColorDark,
  underlineMode = headingDefaultValues.underlineMode,
  marginTop = headingDefaultValues.marginTop,
  marginRight = headingDefaultValues.marginRight,
  marginBottom = headingDefaultValues.marginBottom,
  marginLeft = headingDefaultValues.marginLeft
}) {
  const rawText = typeof text === "string" ? text : "";
  const hasText = rawText.trim().length > 0;
  const resolvedLevel = headingLevels.includes(level) ? level : "h2";
  const HeadingTag = resolvedLevel;
  const resolvedFontSize = normalizeNumber(
    fontSize,
    DEFAULT_FONT_SIZE,
    MIN_FONT_SIZE
  );
  const resolvedFontWeight = normalizeNumber(
    fontWeight,
    DEFAULT_FONT_WEIGHT,
    100
  );
  const resolvedTextColorLight = resolveColor(
    textColorLight ?? textColor,
    HEADING_TEXT_COLOR_LIGHT
  );
  const resolvedTextColorDark = resolveColor(
    textColorDark ?? textColor,
    HEADING_TEXT_COLOR_DARK
  );
  const baseDecorationColorLight = decorationColorLight ?? decorationColor ?? resolvedTextColorLight;
  const baseDecorationColorDark = decorationColorDark ?? decorationColor ?? resolvedTextColorDark;
  const resolvedDecorationColorLight = resolveColor(
    baseDecorationColorLight,
    HEADING_DECORATION_COLOR_LIGHT
  );
  const resolvedDecorationColorDark = resolveColor(
    baseDecorationColorDark,
    HEADING_DECORATION_COLOR_DARK
  );
  const resolvedDecorationWidth = normalizeNumber(
    decorationWidth,
    DEFAULT_DECORATION_WIDTH,
    MIN_DECORATION_WIDTH
  );
  const resolvedDecorationThickness = normalizeNumber(
    decorationThickness,
    DEFAULT_DECORATION_THICKNESS,
    MIN_DECORATION_THICKNESS
  );
  const resolvedDecorationSpacing = normalizeNumber(
    decorationSpacing,
    DEFAULT_DECORATION_SPACING,
    0
  );
  const containerAlign = headingAlignmentMap[textAlign] ?? "flex-start";
  const containerStyle = {
    alignItems: containerAlign,
    "--heading-text-color-light": resolvedTextColorLight,
    "--heading-text-color-dark": resolvedTextColorDark,
    "--heading-decoration-color-light": resolvedDecorationColorLight,
    "--heading-decoration-color-dark": resolvedDecorationColorDark
  };
  if (!hasText && !decorationEnabled) {
    return null;
  }
  const resolvedMargins = {
    marginTop: normalizeNumber(marginTop, headingDefaultValues.marginTop, 0),
    marginRight: normalizeNumber(
      marginRight,
      headingDefaultValues.marginRight,
      0
    ),
    marginBottom: normalizeNumber(
      marginBottom,
      headingDefaultValues.marginBottom,
      0
    ),
    marginLeft: normalizeNumber(marginLeft, headingDefaultValues.marginLeft, 0)
  };
  const headingStyles = {
    fontSize: `${resolvedFontSize}px`,
    fontStyle: italic ? "italic" : "normal",
    fontWeight: resolvedFontWeight,
    marginTop: `${resolvedMargins.marginTop}px`,
    marginRight: `${resolvedMargins.marginRight}px`,
    marginBottom: `${resolvedMargins.marginBottom}px`,
    marginLeft: `${resolvedMargins.marginLeft}px`,
    textAlign,
    borderBottom: decorationEnabled && underlineMode === "inline" ? `${resolvedDecorationThickness}px solid var(--heading-decoration-color-light)` : void 0,
    borderImageSlice: decorationEnabled && underlineMode === "inline" ? 1 : void 0
  };
  const headingDarkBorderClass = decorationEnabled && underlineMode === "inline" ? "dark:border-[var(--heading-decoration-color-dark)]" : void 0;
  const decorationStyles = {
    alignSelf: containerAlign,
    borderRadius: `0px`,
    height: `${resolvedDecorationThickness}px`,
    marginTop: `${resolvedDecorationSpacing}px`,
    width: `${underlineMode === "inline" ? "100%" : `${resolvedDecorationWidth}px`}`
  };
  const headingColorClass = "text-[var(--heading-text-color-light)] dark:text-[var(--heading-text-color-dark)]";
  const decorationColorClass = "bg-[var(--heading-decoration-color-light)] dark:bg-[var(--heading-decoration-color-dark)]";
  return /* @__PURE__ */ jsxs4("div", { className: "flex flex-col", style: containerStyle, children: [
    hasText ? /* @__PURE__ */ jsx5(
      HeadingTag,
      {
        className: [headingColorClass, headingDarkBorderClass].filter(Boolean).join(" "),
        style: headingStyles,
        children: rawText
      }
    ) : null,
    decorationEnabled && underlineMode === "separate" ? /* @__PURE__ */ jsx5(
      "span",
      {
        "aria-hidden": "true",
        className: decorationColorClass,
        style: decorationStyles
      }
    ) : null
  ] });
}
var HeadingBlock_default = HeadingBlock;

// src/components/LinkBarBlock.tsx
import { usePathname } from "next/navigation";
import Link2 from "next/link";
import { jsx as jsx6 } from "react/jsx-runtime";
var normalizePath = (path) => {
  if (!path) return "/";
  try {
    const url = new URL(path, "");
    return url.pathname.replace(/\/+$/, "") || "/";
  } catch {
    const cleaned = path.startsWith("/") ? path : `/${path}`;
    return cleaned.replace(/\/+$/, "") || "/";
  }
};
function LinkBarBlock({ links = [] }) {
  const pathname = normalizePath(usePathname() ?? "/");
  if (!links.length) {
    return null;
  }
  return /* @__PURE__ */ jsx6("nav", { className: "hidden w-full flex-row items-center justify-center gap-6 bg-white pt-4 md:flex dark:bg-gray-800", children: links.filter((link) => link.path && link.label).map((link, idx) => {
    const targetPath = normalizePath(link.path);
    const isActive = pathname === targetPath;
    return /* @__PURE__ */ jsx6(
      Link2,
      {
        className: cn(
          "border-b-3 pb-4 text-lg font-semibold transition-colors",
          isActive ? "border-blue-600 text-blue-600" : "border-transparent hover:border-blue-600 hover:text-blue-600"
        ),
        href: link.path,
        children: link.label
      },
      `${link.path}-${idx}`
    );
  }) });
}

// src/components/SingleAccordionBlock.tsx
import { useEffect, useState as useState3 } from "react";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function SingleAccordionBlock({
  title,
  children,
  defaultOpen = false
}) {
  const [isOpen, setIsOpen] = useState3(Boolean(defaultOpen));
  useEffect(() => {
    setIsOpen(Boolean(defaultOpen));
  }, [defaultOpen]);
  const resolvedTitle = title?.trim() || "B\xF6l\xFCm";
  return /* @__PURE__ */ jsx7("div", { className: "w-full overflow-hidden rounded-2xl border border-gray-200 bg-white", children: /* @__PURE__ */ jsxs5("div", { className: "border-b border-gray-200 last:border-b-0", children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        "aria-expanded": isOpen,
        className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
        type: "button",
        onClick: () => setIsOpen((prev) => !prev),
        children: [
          /* @__PURE__ */ jsx7("span", { className: "text-base font-semibold text-gray-900", children: resolvedTitle }),
          /* @__PURE__ */ jsx7(
            ArrowIcon2,
            {
              className: cn(
                "h-5 w-5 text-gray-600 transition-transform",
                isOpen && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx7(
      "div",
      {
        className: cn(
          "grid overflow-hidden px-5 transition-[grid-template-rows] duration-300",
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        ),
        children: /* @__PURE__ */ jsx7("div", { className: "min-h-0", children: children ? children : /* @__PURE__ */ jsx7("p", { className: "text-sm text-gray-500", children: "Bu b\xF6l\xFCm i\xE7in i\xE7erik ekleyin." }) })
      }
    )
  ] }) });
}
function ArrowIcon2({ className }) {
  return /* @__PURE__ */ jsx7(
    "svg",
    {
      "aria-hidden": "true",
      className,
      fill: "none",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx7(
        "path",
        {
          d: "M6 9l6 6 6-6",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "1.5"
        }
      )
    }
  );
}

// src/components/Slider.tsx
import { useEffect as useEffect2, useState as useState4 } from "react";
import Image3 from "next/image";

// src/components/TextEditor/Renderer.tsx
import DOMPurify from "isomorphic-dompurify";
import { jsx as jsx8 } from "react/jsx-runtime";
function RichTextRenderer({ html }) {
  const cleanHtml = DOMPurify.sanitize(html);
  return /* @__PURE__ */ jsx8("div", { className: "ql-snow ql-container w-full border-none!", children: /* @__PURE__ */ jsx8(
    "div",
    {
      dangerouslySetInnerHTML: { __html: cleanHtml },
      className: "ql-editor w-full"
    }
  ) });
}

// src/components/Slider.tsx
import { Fragment as Fragment2, jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
function Slider({
  slides = [],
  autoPlay = false,
  autoPlayInterval = 6e3,
  imageMode = "cover"
}) {
  const normalizedSlides = slides.map((slide) => ({
    imageUrl: slide.imageUrl?.trim() ?? "",
    text: slide.text
  })).filter((slide) => Boolean(slide.imageUrl));
  const [activeIndex, setActiveIndex] = useState4(0);
  const [isHovered, setIsHovered] = useState4(false);
  const totalSlides = normalizedSlides.length;
  const currentSlide = normalizedSlides[activeIndex] ?? normalizedSlides[0];
  const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
  useEffect2(() => {
    if (!autoPlay || totalSlides <= 1 || isHovered) {
      return void 0;
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
    return /* @__PURE__ */ jsx9(Fragment2, {});
  }
  return /* @__PURE__ */ jsx9(
    "section",
    {
      className: "w-full text-slate-900",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: /* @__PURE__ */ jsxs6("div", { className: "mx-auto flex w-full max-w-7xl flex-col-reverse items-center lg:flex-row", children: [
        /* @__PURE__ */ jsxs6("div", { className: "z-10 -mt-16 w-full px-8 lg:m-0 lg:-mr-48 lg:h-100 lg:w-112.5 lg:px-0", children: [
          /* @__PURE__ */ jsx9("div", { className: "h-3 bg-[#f5c302]" }),
          /* @__PURE__ */ jsxs6("div", { className: "bg-white px-8 py-9", children: [
            currentSlide.text ? /* @__PURE__ */ jsx9("div", { className: "richtext text-slate-900 **:text-current", children: /* @__PURE__ */ jsx9(RichTextRenderer, { html: currentSlide.text }) }) : null,
            /* @__PURE__ */ jsxs6("div", { className: "mt-10 flex flex-row items-end justify-end gap-4 text-slate-500", children: [
              /* @__PURE__ */ jsxs6("span", { className: "mb-0.5 text-base font-semibold", children: [
                activeIndex + 1,
                " / ",
                totalSlides
              ] }),
              /* @__PURE__ */ jsx9(
                "button",
                {
                  "aria-label": "\xD6nceki g\xF6rsel",
                  className: "text-4xl transition hover:border-slate-900 hover:text-slate-900",
                  type: "button",
                  onClick: () => goToSlide(activeIndex - 1),
                  children: "\u2039"
                }
              ),
              /* @__PURE__ */ jsx9(
                "button",
                {
                  "aria-label": "Sonraki g\xF6rsel",
                  className: "text-4xl transition hover:border-slate-900 hover:text-slate-900",
                  type: "button",
                  onClick: () => goToSlide(activeIndex + 1),
                  children: "\u203A"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx9("div", { className: "w-full overflow-hidden", children: /* @__PURE__ */ jsx9(
          "ul",
          {
            "aria-live": "polite",
            className: "flex h-130 w-full transition-transform duration-700 ease-in-out",
            role: "list",
            style: { transform: `translateX(-${activeIndex * 100}%)` },
            children: normalizedSlides.map((slide) => /* @__PURE__ */ jsx9(
              "li",
              {
                className: "relative h-full w-full shrink-0",
                children: /* @__PURE__ */ jsx9(
                  Image3,
                  {
                    fill: true,
                    alt: slide.text ?? slide.imageUrl,
                    className: objectFitClass,
                    priority: normalizedSlides.indexOf(slide) == 0,
                    sizes: "(max-width: 1200px) 100vw, (max-width: 1280px) 850px, 950px",
                    src: slide.imageUrl
                  }
                )
              },
              slide.imageUrl
            ))
          }
        ) })
      ] })
    }
  );
}

// src/components/SliderShowcase.tsx
import { useEffect as useEffect3, useState as useState5 } from "react";
import Image4 from "next/image";
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var SIDE_CARD_HEIGHT_RATIO = 0.78;
var MIN_HEIGHT_REM = 20;
var CENTER_CARD_WIDTH_PERCENT = 65;
var SIDE_CARD_WIDTH_PERCENT = 55;
var normalizeHeight = (value, fallback) => {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return Math.max(MIN_HEIGHT_REM, value);
  }
  return fallback;
};
function SliderShowcase({
  slides = [],
  autoPlay = false,
  autoPlayInterval = 6e3,
  imageMode = "cover",
  desktopHeight,
  mobileHeight
}) {
  const normalizedSlides = slides.map((slide) => ({
    imageUrl: slide.imageUrl?.trim() ?? "",
    text: slide.text
  })).filter((slide) => Boolean(slide.imageUrl));
  const desktopStageHeight = normalizeHeight(desktopHeight, 50);
  const sideCardHeight = Number(
    (desktopStageHeight * SIDE_CARD_HEIGHT_RATIO).toFixed(2)
  );
  const mobileStageHeight = normalizeHeight(mobileHeight, 45);
  const [activeIndex, setActiveIndex] = useState5(0);
  const [isHovered, setIsHovered] = useState5(false);
  const [lightboxIndex, setLightboxIndex] = useState5(null);
  const totalSlides = normalizedSlides.length;
  const currentSlide = normalizedSlides[activeIndex] ?? normalizedSlides[0];
  const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
  const toPlainText = (html) => typeof html === "string" ? html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim() : "";
  const lightboxItems = normalizedSlides.map((slide) => {
    const textContent = toPlainText(slide.text);
    return {
      imageUrl: slide.imageUrl,
      alt: textContent || slide.imageUrl,
      title: textContent
    };
  });
  useEffect3(() => {
    if (!autoPlay || totalSlides <= 1 || isHovered || lightboxIndex != null) {
      return void 0;
    }
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, lightboxIndex, totalSlides]);
  const goToSlide = (nextIndex2) => {
    if (!totalSlides) {
      return;
    }
    setActiveIndex((nextIndex2 + totalSlides) % totalSlides);
  };
  const openLightbox = (index) => {
    if (!totalSlides || index < 0 || index >= totalSlides) {
      return;
    }
    setLightboxIndex(index);
  };
  const closeLightbox = () => setLightboxIndex(null);
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
    return null;
  }
  const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
  const nextIndex = (activeIndex + 1) % totalSlides;
  return /* @__PURE__ */ jsx10(
    "section",
    {
      className: "mb-16 w-full text-slate-900",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: /* @__PURE__ */ jsxs7("div", { className: "mx-auto w-full max-w-6xl space-y-8 px-4", children: [
        /* @__PURE__ */ jsxs7("div", { className: "hidden w-full sm:block", children: [
          /* @__PURE__ */ jsx10(
            "div",
            {
              className: "relative w-full overflow-hidden",
              style: { height: `${desktopStageHeight}rem` },
              children: normalizedSlides.map((slide, index) => {
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
                return /* @__PURE__ */ jsx10(
                  "button",
                  {
                    "aria-current": isCenter,
                    "aria-hidden": isHidden,
                    "aria-label": slide.text ? `G\xF6rsel ${index + 1}` : slide.imageUrl,
                    className: `group absolute overflow-hidden bg-slate-100/60 transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 ${positionClasses}`,
                    disabled: isHidden,
                    style: {
                      left: "50%",
                      top: "50%",
                      transform: transformValue,
                      opacity: opacityValue,
                      width: widthValue,
                      height: heightValue,
                      pointerEvents: isHidden ? "none" : void 0
                    },
                    type: "button",
                    onClick: () => {
                      if (isCenter) {
                        openLightbox(index);
                      } else {
                        goToSlide(index);
                      }
                    },
                    children: /* @__PURE__ */ jsx10("div", { className: "relative h-full w-full", children: /* @__PURE__ */ jsx10(
                      Image4,
                      {
                        fill: true,
                        alt: slide.text ?? slide.imageUrl,
                        className: `${objectFitClass} transition duration-500 group-hover:scale-105`,
                        priority: isCenter,
                        sizes: "(max-width: 1280px) 60vw, 900px",
                        src: slide.imageUrl
                      }
                    ) })
                  },
                  `showcase-slide-${index}-${slide.imageUrl}`
                );
              })
            }
          ),
          currentSlide?.text ? /* @__PURE__ */ jsx10("div", { className: "flex w-full justify-center", children: /* @__PURE__ */ jsx10(
            "div",
            {
              className: "bg-black px-6 py-4 text-sm text-white shadow-xl",
              style: { width: `${CENTER_CARD_WIDTH_PERCENT}%` },
              children: /* @__PURE__ */ jsx10("div", { className: "richtext text-current **:text-current", children: /* @__PURE__ */ jsx10(RichTextRenderer, { html: currentSlide.text }) })
            }
          ) }) : null
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "sm:hidden", children: [
          /* @__PURE__ */ jsx10(
            "div",
            {
              className: "relative w-full overflow-hidden",
              style: { height: `${mobileStageHeight}rem` },
              children: /* @__PURE__ */ jsx10(
                Image4,
                {
                  fill: true,
                  priority: true,
                  alt: currentSlide.text ?? currentSlide.imageUrl,
                  className: `${objectFitClass}`,
                  sizes: "90vw",
                  src: currentSlide.imageUrl
                }
              )
            }
          ),
          currentSlide.text ? /* @__PURE__ */ jsx10("div", { className: "w-full", children: /* @__PURE__ */ jsx10("div", { className: "bg-black px-4 py-3 text-sm text-white shadow-xl", children: /* @__PURE__ */ jsx10("div", { className: "richtext text-current **:text-current", children: /* @__PURE__ */ jsx10(RichTextRenderer, { html: currentSlide.text }) }) }) }) : null
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-row items-center justify-center gap-4 text-slate-500", children: [
          /* @__PURE__ */ jsx10(
            "button",
            {
              "aria-label": "\xD6nceki g\xF6rsel",
              className: "text-3xl transition hover:text-slate-900",
              type: "button",
              onClick: () => goToSlide(activeIndex - 1),
              children: "\u2039"
            }
          ),
          /* @__PURE__ */ jsxs7("span", { className: "mt-1.5 text-base font-semibold", children: [
            activeIndex + 1,
            " / ",
            totalSlides
          ] }),
          /* @__PURE__ */ jsx10(
            "button",
            {
              "aria-label": "Sonraki g\xF6rsel",
              className: "text-3xl transition hover:text-slate-900",
              type: "button",
              onClick: () => goToSlide(activeIndex + 1),
              children: "\u203A"
            }
          )
        ] }),
        /* @__PURE__ */ jsx10(
          Lightbox,
          {
            activeIndex: lightboxIndex,
            items: lightboxItems,
            onClose: closeLightbox,
            onNext: showLightboxNext,
            onPrevious: showLightboxPrevious
          }
        )
      ] })
    }
  );
}

// src/components/TextEditor/Editor.tsx
import QuillTableBetter from "quill-table-better";
import { useEffect as useEffect4, useRef } from "react";
import Quill from "quill";
import { jsx as jsx11 } from "react/jsx-runtime";
var SIZE_VALUES = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "32px",
  "36px"
];
var buildSizePickerCss = () => {
  const rules = SIZE_VALUES.map((value) => {
    const label = value.replace("px", "");
    return [
      `.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="${value}"]::before { content: "${label}"; }`,
      `.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="${value}"]::before { content: "${label}"; }`
    ].join("\n");
  });
  rules.push(
    `.ql-snow .ql-picker.ql-size .ql-picker-label:not([data-value])::before { content: "12"; }`
  );
  return rules.join("\n");
};
var TextEditor = ({ initialData, onChange }) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);
  const initialDataRef = useRef(initialData);
  const onChangeRef = useRef(onChange);
  useEffect4(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect4(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorRoot = container.ownerDocument.createElement("div");
    container.appendChild(editorRoot);
    const styleId = "quill-size-picker-labels";
    const doc = container.ownerDocument;
    if (!doc.getElementById(styleId)) {
      const styleEl = doc.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = buildSizePickerCss();
      doc.head.appendChild(styleEl);
    }
    const Size = Quill.import("attributors/style/size");
    Size.whitelist = SIZE_VALUES;
    const registerTarget = Size;
    Quill.register(registerTarget, true);
    Quill.register(
      {
        "modules/table-better": QuillTableBetter
      },
      true
    );
    const quill = new Quill(editorRoot, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ size: Size.whitelist }],
          ["link", "bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
            "table-better"
          ],
          [{ script: "sub" }, { script: "super" }],
          ["clean"]
        ],
        "table-better": {
          language: "tr_TR",
          toolbarTable: true
        },
        keyboard: {
          bindings: QuillTableBetter.keyboardBindings
        }
      }
    });
    quill.root.style.fontSize = "12px";
    quill.format("size", "12px");
    quillRef.current = quill;
    if (initialDataRef.current) {
      const delta = quill.clipboard.convert({ html: initialDataRef.current });
      quill.updateContents(delta, Quill.sources.USER);
    }
    const handler = () => {
      const html = quill.root.innerHTML;
      onChangeRef.current(html);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
      quillRef.current = null;
      container.innerHTML = "";
    };
  }, []);
  return /* @__PURE__ */ jsx11("div", { ref: containerRef });
};
var RichTextEditor = ({
  initialData,
  onChange
}) => {
  return /* @__PURE__ */ jsx11(TextEditor, { initialData, onChange });
};

// src/components/PublicRenderer.tsx
import { Render } from "@puckeditor/core";
import { jsx as jsx12 } from "react/jsx-runtime";
function PublicRenderer({ config, data, pagePathSegments }) {
  return /* @__PURE__ */ jsx12(Render, { config, data, metadata: { pagePathSegments } });
}

// src/components/PuckEditor.tsx
import { createUsePuck, Puck } from "@puckeditor/core";
import { Fragment as Fragment3, jsx as jsx13 } from "react/jsx-runtime";
var usePuck = createUsePuck();
function PuckEditor({
  config,
  data,
  height,
  path,
  viewports,
  onPublish,
  renderHeaderActions
}) {
  return /* @__PURE__ */ jsx13(
    Puck,
    {
      config,
      data,
      height,
      overrides: renderHeaderActions ? {
        headerActions: () => {
          const appState = usePuck((state) => state.appState);
          return /* @__PURE__ */ jsx13(Fragment3, { children: renderHeaderActions({ appState, path }) });
        }
      } : void 0,
      viewports,
      onPublish
    }
  );
}

// src/components/Embed/GoogleMapsEmbed.tsx
import { Fragment as Fragment4, jsx as jsx14 } from "react/jsx-runtime";
var DEFAULT_HEIGHT = 450;
var GOOGLE_HOST_REGEX = /(^|\.)google\.[a-z.]+$/i;
var buildEmbedSrc = (rawValue) => {
  if (!rawValue) {
    return void 0;
  }
  const value = rawValue.trim();
  if (!value) {
    return void 0;
  }
  const ensureUrl = (input) => input.startsWith("http://") || input.startsWith("https://") ? input : `https://www.google.com/maps?q=${encodeURIComponent(input)}&output=embed`;
  try {
    const parsedUrl = new URL(ensureUrl(value));
    if (!GOOGLE_HOST_REGEX.test(parsedUrl.hostname)) {
      return void 0;
    }
    if (!parsedUrl.pathname.startsWith("/maps/embed") && !parsedUrl.pathname.startsWith("/maps/d/embed") && parsedUrl.searchParams.get("output") !== "embed") {
      parsedUrl.searchParams.set("output", "embed");
    }
    parsedUrl.protocol = "https:";
    return parsedUrl.toString();
  } catch {
    return `https://www.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
  }
};
var GoogleMapsEmbed = ({
  url,
  title,
  height,
  allowFullScreen
}) => {
  const embedSrc = buildEmbedSrc(url);
  if (!embedSrc) {
    return /* @__PURE__ */ jsx14(Fragment4, {});
  }
  const resolvedHeight = typeof height === "number" && height > 0 ? height : DEFAULT_HEIGHT;
  return /* @__PURE__ */ jsx14(
    "div",
    {
      className: "relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-gray-800/40",
      style: { minHeight: `${resolvedHeight}px` },
      children: /* @__PURE__ */ jsx14(
        "iframe",
        {
          allowFullScreen,
          className: "h-full w-full",
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade",
          src: embedSrc,
          style: { border: 0 },
          title: title?.trim() || "Google Maps konumu"
        }
      )
    }
  );
};

// src/components/Embed/YoutubeEmbed.tsx
import { Fragment as Fragment5, jsx as jsx15 } from "react/jsx-runtime";
var extractVideoId = (rawValue) => {
  if (!rawValue) {
    return void 0;
  }
  const value = rawValue.trim();
  if (!value) {
    return void 0;
  }
  try {
    const parsed = new URL(value);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\//, "").split("/")[0] || void 0;
    }
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v") || void 0;
    }
    const segments = parsed.pathname.split("/").filter(Boolean);
    const embedIndex = segments.indexOf("embed");
    if (embedIndex >= 0 && segments[embedIndex + 1]) {
      return segments[embedIndex + 1];
    }
  } catch {
  }
  const idPattern = /^[a-zA-Z0-9_-]{11}$/;
  return idPattern.test(value) ? value : void 0;
};
var buildEmbedUrl = (videoId, {
  startSeconds,
  autoPlay,
  muted
}) => {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1"
  });
  if (typeof startSeconds === "number" && startSeconds > 0) {
    params.set("start", Math.floor(startSeconds).toString());
  }
  if (autoPlay) {
    params.set("autoplay", "1");
    params.set("mute", muted ? "1" : "0");
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};
var YoutubeEmbed = ({
  url,
  title,
  startSeconds,
  autoPlay,
  muted
}) => {
  const videoId = extractVideoId(url);
  if (!videoId) {
    return /* @__PURE__ */ jsx15(Fragment5, {});
  }
  const embedUrl = buildEmbedUrl(videoId, {
    startSeconds,
    autoPlay,
    muted
  });
  return /* @__PURE__ */ jsx15(
    "div",
    {
      className: "relative w-full overflow-hidden rounded-2xl",
      style: { paddingBottom: "56.25%" },
      children: /* @__PURE__ */ jsx15(
        "iframe",
        {
          allowFullScreen: true,
          allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share",
          className: "absolute inset-0 h-full w-full",
          loading: "lazy",
          referrerPolicy: "strict-origin-when-cross-origin",
          src: embedUrl,
          title: title?.trim() || "YouTube video player"
        }
      )
    }
  );
};

// src/fields/ClipboardFormSection.tsx
import { useEffect as useEffect5, useMemo as useMemo3, useRef as useRef2, useState as useState6 } from "react";
import { jsx as jsx16, jsxs as jsxs8 } from "react/jsx-runtime";
var DEFAULT_STATUS_MESSAGES = {
  copied: "\u0130\xE7erik panoya kopyaland\u0131.",
  pasted: "\u0130\xE7erik ba\u015Far\u0131yla yap\u0131\u015Ft\u0131r\u0131ld\u0131.",
  mismatch: "Panodaki veri bu alanla e\u015Fle\u015Fmiyor.",
  invalid: "Panodaki veri ge\xE7ersiz.",
  error: "Pano i\u015Flemi ba\u015Far\u0131s\u0131z oldu.",
  unsupported: "Taray\u0131c\u0131 pano eri\u015Fimini desteklemiyor."
};
function ClipboardFormSection({
  componentKey,
  title,
  children,
  getValue,
  sanitize,
  onPaste,
  description,
  copyLabel = "Kopyala",
  pasteLabel = "Yap\u0131\u015Ft\u0131r",
  statusMessages
}) {
  const [status, setStatus] = useState6("idle");
  const [clipboardSupported, setClipboardSupported] = useState6(false);
  const [isBusy, setIsBusy] = useState6(false);
  const resetTimerRef = useRef2(null);
  const mergedStatusMessages = useMemo3(
    () => ({ ...DEFAULT_STATUS_MESSAGES, ...statusMessages }),
    [statusMessages]
  );
  useEffect5(() => {
    setClipboardSupported(
      typeof navigator !== "undefined" && Boolean(navigator.clipboard)
    );
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, []);
  const scheduleStatusReset = (next) => {
    setStatus(next);
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => {
      setStatus("idle");
      resetTimerRef.current = null;
    }, 2200);
  };
  const handleCopy = async () => {
    if (!clipboardSupported || typeof navigator === "undefined") {
      scheduleStatusReset("unsupported");
      return;
    }
    setIsBusy(true);
    try {
      const payload = JSON.stringify({
        component: componentKey,
        value: getValue()
      });
      await navigator.clipboard.writeText(payload);
      scheduleStatusReset("copied");
    } catch {
      scheduleStatusReset("error");
    } finally {
      setIsBusy(false);
    }
  };
  const handlePaste = async () => {
    if (!clipboardSupported || typeof navigator === "undefined") {
      scheduleStatusReset("unsupported");
      return;
    }
    setIsBusy(true);
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);
      if (parsed?.component !== componentKey) {
        scheduleStatusReset("mismatch");
        return;
      }
      const sanitized = sanitize(parsed?.value);
      if (sanitized == null) {
        scheduleStatusReset("invalid");
        return;
      }
      onPaste(sanitized);
      scheduleStatusReset("pasted");
    } catch {
      scheduleStatusReset("error");
    } finally {
      setIsBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs8("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs8("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs8("div", { children: [
        /* @__PURE__ */ jsx16("p", { className: "text-sm font-semibold text-gray-800", children: title }),
        status !== "idle" ? /* @__PURE__ */ jsx16("p", { className: "text-xs text-gray-500", children: mergedStatusMessages[status] }) : description ? /* @__PURE__ */ jsx16("p", { className: "text-xs text-gray-500", children: description }) : null
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx16(
          Button,
          {
            disabled: !clipboardSupported || isBusy,
            type: "button",
            variant: "outline",
            onClick: handleCopy,
            children: copyLabel
          }
        ),
        /* @__PURE__ */ jsx16(
          Button,
          {
            disabled: !clipboardSupported || isBusy,
            type: "button",
            variant: "outline",
            onClick: handlePaste,
            children: pasteLabel
          }
        )
      ] })
    ] }),
    children ?? null
  ] });
}

// src/fields/LinkListField.tsx
import { useMemo as useMemo4 } from "react";
import { jsx as jsx17, jsxs as jsxs9 } from "react/jsx-runtime";
function LinkListField({
  value,
  onChange,
  labelPlaceholder = "\xD6rn: Hakk\u0131m\u0131zda",
  pathPlaceholder = "\xD6rn: /hakkimizda"
}) {
  const links = useMemo4(() => value ?? [], [value]);
  const handleUpdate = (index, field, next) => {
    const cloned = [...links];
    const target = cloned[index] ?? { label: "", path: "" };
    cloned[index] = { ...target, [field]: next };
    onChange(cloned);
  };
  const handleAdd = () => {
    onChange([...links, { label: "", path: "" }]);
  };
  const handleRemove = (index) => {
    const cloned = links.filter((_, idx) => idx !== index);
    onChange(cloned);
  };
  const handleMove = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= links.length) {
      return;
    }
    const cloned = [...links];
    const temp = cloned[index];
    cloned[index] = cloned[targetIndex];
    cloned[targetIndex] = temp;
    onChange(cloned);
  };
  return /* @__PURE__ */ jsxs9("div", { className: "space-y-4", children: [
    links.map((link, index) => /* @__PURE__ */ jsxs9(
      "div",
      {
        className: "rounded-2xl border border-gray-200 p-4",
        children: [
          /* @__PURE__ */ jsxs9("div", { className: "grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs9("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx17("label", { className: "text-xs font-medium text-gray-500", children: "Etiket" }),
              /* @__PURE__ */ jsx17(
                "input",
                {
                  className: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm",
                  placeholder: labelPlaceholder,
                  type: "text",
                  value: link.label,
                  onChange: (event) => handleUpdate(index, "label", event.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs9("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx17("label", { className: "text-xs font-medium text-gray-500", children: "Path" }),
              /* @__PURE__ */ jsx17(
                "input",
                {
                  className: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm",
                  placeholder: pathPlaceholder,
                  type: "text",
                  value: link.path,
                  onChange: (event) => handleUpdate(index, "path", event.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs9("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs9("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx17(
                Button,
                {
                  className: "text-sm",
                  disabled: index === 0,
                  type: "button",
                  variant: "ghost",
                  onClick: () => handleMove(index, "up"),
                  children: "Yukar\u0131 Al"
                }
              ),
              /* @__PURE__ */ jsx17(
                Button,
                {
                  className: "text-sm",
                  disabled: index === links.length - 1,
                  type: "button",
                  variant: "ghost",
                  onClick: () => handleMove(index, "down"),
                  children: "A\u015Fa\u011F\u0131 Al"
                }
              )
            ] }),
            /* @__PURE__ */ jsx17(
              Button,
              {
                className: "text-sm text-red-600 hover:text-red-700",
                type: "button",
                variant: "ghost",
                onClick: () => handleRemove(index),
                children: "Ba\u011Flant\u0131y\u0131 Sil"
              }
            )
          ] })
        ]
      },
      `link-${index}`
    )),
    /* @__PURE__ */ jsx17(
      Button,
      {
        className: "w-full",
        type: "button",
        variant: "outline",
        onClick: handleAdd,
        children: "Yeni Ba\u011Flant\u0131 Ekle"
      }
    )
  ] });
}

// src/fields/LinkBarClipboardField.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
var COMPONENT_KEY = "LinkBar";
var sanitizeLinks = (raw) => {
  if (!Array.isArray(raw)) {
    return null;
  }
  return raw.map((link) => ({
    label: typeof link?.label === "string" ? link.label : "",
    path: typeof link?.path === "string" ? link.path : ""
  }));
};
function LinkBarClipboardField({
  value,
  onChange
}) {
  const normalizedValue = sanitizeLinks(value) ?? [];
  return /* @__PURE__ */ jsx18(
    ClipboardFormSection,
    {
      componentKey: COMPONENT_KEY,
      statusMessages: {
        copied: "Ba\u011Flant\u0131lar panoya kopyaland\u0131.",
        pasted: "Ba\u011Flant\u0131lar ba\u015Far\u0131yla yap\u0131\u015Ft\u0131r\u0131ld\u0131.",
        mismatch: "Pano i\xE7eri\u011Fi Link \xC7ubu\u011Fu ile e\u015Fle\u015Fmiyor.",
        invalid: "Pano i\xE7eri\u011Fi ge\xE7ersiz."
      },
      title: "Link \xC7ubu\u011Fu \u0130\xE7eri\u011Fi",
      getValue: () => normalizedValue.map((link) => ({ ...link })),
      onPaste: (next) => onChange(next),
      sanitize: sanitizeLinks,
      children: /* @__PURE__ */ jsx18(LinkListField, { value: normalizedValue, onChange })
    }
  );
}

// src/fields/HeadingClipboardField.tsx
import { createUsePuck as createUsePuck2 } from "@puckeditor/core";
import { useMemo as useMemo5 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var usePuckStore = createUsePuck2();
var COMPONENT_KEY2 = "HeadingBlock.styles";
var HEADING_LEVELS = /* @__PURE__ */ new Set([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6"
]);
var HEADING_ALIGNMENTS = /* @__PURE__ */ new Set([
  "left",
  "center",
  "right"
]);
var UNDERLINE_MODES = /* @__PURE__ */ new Set([
  "inline",
  "separate"
]);
var sanitizeNumber = (value, fallback) => {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
};
var sanitizeBoolean = (value, fallback) => {
  return typeof value === "boolean" ? value : fallback;
};
var sanitizeColor = (value) => {
  if (typeof value !== "string") {
    return void 0;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : void 0;
};
var sanitizeHeadingClipboardValue = (raw) => {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const value = raw;
  return {
    level: HEADING_LEVELS.has(value.level) ? value.level : headingDefaultValues.level,
    textAlign: HEADING_ALIGNMENTS.has(value.textAlign) ? value.textAlign : headingDefaultValues.textAlign,
    fontSize: sanitizeNumber(value.fontSize, headingDefaultValues.fontSize),
    fontWeight: sanitizeNumber(
      value.fontWeight,
      headingDefaultValues.fontWeight
    ),
    italic: sanitizeBoolean(value.italic, headingDefaultValues.italic),
    textColor: sanitizeColor(value.textColor),
    textColorLight: sanitizeColor(value.textColorLight) ?? headingDefaultValues.textColorLight,
    textColorDark: sanitizeColor(value.textColorDark) ?? headingDefaultValues.textColorDark,
    decorationEnabled: sanitizeBoolean(
      value.decorationEnabled,
      headingDefaultValues.decorationEnabled
    ),
    decorationWidth: sanitizeNumber(
      value.decorationWidth,
      headingDefaultValues.decorationWidth
    ),
    decorationThickness: sanitizeNumber(
      value.decorationThickness,
      headingDefaultValues.decorationThickness
    ),
    decorationSpacing: sanitizeNumber(
      value.decorationSpacing,
      headingDefaultValues.decorationSpacing
    ),
    decorationColor: sanitizeColor(value.decorationColor),
    decorationColorLight: sanitizeColor(value.decorationColorLight) ?? headingDefaultValues.decorationColorLight,
    decorationColorDark: sanitizeColor(value.decorationColorDark) ?? headingDefaultValues.decorationColorDark,
    underlineMode: UNDERLINE_MODES.has(
      value.underlineMode
    ) ? value.underlineMode : headingDefaultValues.underlineMode,
    marginTop: sanitizeNumber(value.marginTop, headingDefaultValues.marginTop),
    marginRight: sanitizeNumber(
      value.marginRight,
      headingDefaultValues.marginRight
    ),
    marginBottom: sanitizeNumber(
      value.marginBottom,
      headingDefaultValues.marginBottom
    ),
    marginLeft: sanitizeNumber(
      value.marginLeft,
      headingDefaultValues.marginLeft
    )
  };
};
var defaultClipboardValue = sanitizeHeadingClipboardValue(
  headingDefaultValues
) ?? {
  level: headingDefaultValues.level,
  textAlign: headingDefaultValues.textAlign,
  fontSize: headingDefaultValues.fontSize,
  fontWeight: headingDefaultValues.fontWeight,
  italic: headingDefaultValues.italic,
  textColor: void 0,
  textColorLight: headingDefaultValues.textColorLight,
  textColorDark: headingDefaultValues.textColorDark,
  decorationEnabled: headingDefaultValues.decorationEnabled,
  decorationWidth: headingDefaultValues.decorationWidth,
  decorationThickness: headingDefaultValues.decorationThickness,
  decorationSpacing: headingDefaultValues.decorationSpacing,
  decorationColor: void 0,
  decorationColorLight: headingDefaultValues.decorationColorLight,
  decorationColorDark: headingDefaultValues.decorationColorDark,
  underlineMode: headingDefaultValues.underlineMode,
  marginTop: headingDefaultValues.marginTop,
  marginRight: headingDefaultValues.marginRight,
  marginBottom: headingDefaultValues.marginBottom,
  marginLeft: headingDefaultValues.marginLeft
};
function HeadingClipboardField() {
  const selectedHeading = usePuckStore((state) => {
    if (state.selectedItem?.type === "HeadingBlock") {
      return state.selectedItem;
    }
    return null;
  });
  const dispatch = usePuckStore((state) => state.dispatch);
  const getSelectorForId = usePuckStore((state) => state.getSelectorForId);
  const clipboardValue = useMemo5(() => {
    if (selectedHeading) {
      return sanitizeHeadingClipboardValue(selectedHeading.props) ?? defaultClipboardValue;
    }
    return defaultClipboardValue;
  }, [selectedHeading]);
  const handlePaste = (value) => {
    if (!selectedHeading?.props?.id) {
      return;
    }
    const selector = getSelectorForId(selectedHeading.props.id);
    if (!selector) {
      return;
    }
    dispatch({
      type: "setData",
      data: (previous) => {
        const updateItemProps = (item) => ({
          ...item,
          props: {
            ...item.props,
            ...value
          }
        });
        if (selector.zone && previous.zones?.[selector.zone]) {
          const zoneItems = previous.zones[selector.zone];
          const updatedZone = zoneItems.map(
            (item, index) => index === selector.index ? updateItemProps(item) : item
          );
          return {
            zones: {
              ...previous.zones,
              [selector.zone]: updatedZone
            }
          };
        }
        const updatedContent = previous.content.map(
          (item, index) => index === selector.index ? updateItemProps(item) : item
        );
        return {
          content: updatedContent
        };
      }
    });
  };
  return /* @__PURE__ */ jsx19(
    ClipboardFormSection,
    {
      componentKey: COMPONENT_KEY2,
      statusMessages: {
        copied: "Ba\u015Fl\u0131k stilleri panoya kopyaland\u0131.",
        pasted: "Ba\u015Fl\u0131k stilleri ba\u015Far\u0131yla yap\u0131\u015Ft\u0131r\u0131ld\u0131.",
        mismatch: "Pano i\xE7eri\u011Fi Ba\u015Fl\u0131k ile e\u015Fle\u015Fmiyor.",
        invalid: "Pano i\xE7eri\u011Fi ge\xE7ersiz."
      },
      title: "Ba\u015Fl\u0131k Stilleri",
      getValue: () => clipboardValue,
      onPaste: handlePaste,
      sanitize: sanitizeHeadingClipboardValue
    }
  );
}

// src/fields/SlidesField.tsx
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { jsx as jsx20, jsxs as jsxs10 } from "react/jsx-runtime";
var COMPONENT_KEY3 = "SliderBlock.slides";
var sanitizeSlides = (raw) => {
  if (!Array.isArray(raw)) {
    return null;
  }
  return raw.map((slide) => ({
    imageUrl: typeof slide?.imageUrl === "string" ? slide.imageUrl : "",
    text: typeof slide?.text === "string" ? slide.text : ""
  }));
};
function SlidesField({ value, onChange, ImageField }) {
  const slides = sanitizeSlides(value) ?? [];
  const updateSlide = (index, payload) => {
    const cloned = [...slides];
    const nextSlide = { ...cloned[index], ...payload };
    cloned[index] = nextSlide;
    onChange(cloned);
  };
  const handleAddSlide = () => {
    onChange([...slides, { imageUrl: "", text: "" }]);
  };
  const handleRemoveSlide = (index) => {
    const cloned = slides.filter((_, idx) => idx !== index);
    onChange(cloned);
  };
  const handleMoveSlide = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= slides.length) {
      return;
    }
    const cloned = [...slides];
    const [moved] = cloned.splice(fromIndex, 1);
    cloned.splice(toIndex, 0, moved);
    onChange(cloned);
  };
  return /* @__PURE__ */ jsx20(
    ClipboardFormSection,
    {
      componentKey: COMPONENT_KEY3,
      description: "Slaytlar\u0131 panoya kopyalayabilir ve di\u011Fer bile\u015Fenlerine yap\u0131\u015Ft\u0131rabilirsiniz.",
      getValue: () => slides.map((slide) => ({ ...slide })),
      sanitize: sanitizeSlides,
      statusMessages: {
        copied: "Slaytlar panoya kopyaland\u0131.",
        pasted: "Slaytlar ba\u015Far\u0131yla yap\u0131\u015Ft\u0131r\u0131ld\u0131.",
        mismatch: "Pano i\xE7eri\u011Fi Slider ile e\u015Fle\u015Fmiyor."
      },
      title: "Slider Slaytlar\u0131",
      onPaste: (next) => onChange(next),
      children: /* @__PURE__ */ jsxs10("div", { className: "space-y-4", children: [
        slides.map((slide, index) => /* @__PURE__ */ jsx20(
          "div",
          {
            className: "rounded-2xl border border-gray-200 p-4",
            children: /* @__PURE__ */ jsxs10("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx20("div", { children: /* @__PURE__ */ jsx20(
                ImageField,
                {
                  value: typeof slide.imageUrl === "string" ? slide.imageUrl : "",
                  onChange: (next) => updateSlide(index, { imageUrl: next })
                }
              ) }),
              /* @__PURE__ */ jsx20("div", { children: /* @__PURE__ */ jsx20(
                RichTextEditor,
                {
                  initialData: slide.text ?? "",
                  onChange: (data) => updateSlide(index, { text: data })
                },
                `slider-slide-text-${index}`
              ) }),
              /* @__PURE__ */ jsxs10("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxs10("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx20(
                    Button,
                    {
                      disabled: index === 0,
                      type: "button",
                      variant: "ghost",
                      onClick: () => handleMoveSlide(index, index - 1),
                      children: /* @__PURE__ */ jsx20(ChevronUpIcon, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx20(
                    Button,
                    {
                      disabled: index === slides.length - 1,
                      type: "button",
                      variant: "ghost",
                      onClick: () => handleMoveSlide(index, index + 1),
                      children: /* @__PURE__ */ jsx20(ChevronDownIcon, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx20(
                  Button,
                  {
                    className: "text-sm text-red-600 hover:text-red-700",
                    type: "button",
                    variant: "ghost",
                    onClick: () => handleRemoveSlide(index),
                    children: /* @__PURE__ */ jsx20(TrashIcon, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] })
          },
          `slider-slide-${index}`
        )),
        /* @__PURE__ */ jsx20(
          Button,
          {
            className: "w-full",
            type: "button",
            variant: "outline",
            onClick: handleAddSlide,
            children: /* @__PURE__ */ jsx20(PlusIcon, { className: "h-4 w-4" })
          }
        )
      ] })
    }
  );
}

// src/config/baseEditorConfig.tsx
import {
  ArrowDownTrayIcon,
  BookmarkIcon,
  CheckCircleIcon,
  LinkIcon as LinkIcon2,
  TrashIcon as TrashIcon2
} from "@heroicons/react/24/outline";
import { Fragment as Fragment6, jsx as jsx21, jsxs as jsxs11 } from "react/jsx-runtime";
var BaseFormInputField = ({
  label,
  className,
  ...inputProps
}) => /* @__PURE__ */ jsxs11("label", { className: "flex flex-col gap-2 text-sm font-medium text-gray-700", children: [
  label ? /* @__PURE__ */ jsx21("span", { children: label }) : null,
  /* @__PURE__ */ jsx21(
    "input",
    {
      ...inputProps,
      className: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none ${className ?? ""}`
    }
  )
] });
var EmptyImageField = () => /* @__PURE__ */ jsx21("div", { className: "rounded-md border border-dashed border-gray-300 px-3 py-2 text-xs text-gray-500", children: "Image picker not configured." });
var createButtonToggleField = (label, options, defaultValue) => ({
  label,
  type: "custom",
  render: ({
    value,
    onChange
  }) => {
    const currentValue = value ?? defaultValue ?? options[0]?.value ?? "";
    return /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx21("span", { className: "text-sm font-medium text-gray-700", children: label }),
      /* @__PURE__ */ jsx21("div", { className: "flex gap-3", children: options.map((option) => /* @__PURE__ */ jsx21(
        "button",
        {
          className: `rounded border px-4 py-2 text-left text-sm font-medium transition ${currentValue === option.value ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:border-indigo-400"}`,
          type: "button",
          onClick: () => onChange(option.value),
          children: option.label
        },
        option.value
      )) })
    ] });
  }
});
var imageModeToggleField = createButtonToggleField(
  "G\xF6rsel Modu",
  [
    { label: "Kapla", value: "cover" },
    { label: "S\u0131\u011Fd\u0131r", value: "contain" }
  ],
  "cover"
);
var createNumberInputField = (FormInput, label, options = {}) => ({
  label,
  type: "custom",
  render: ({
    value,
    onChange
  }) => {
    const displayValue = typeof value === "number" ? value : typeof options.defaultValue === "number" ? options.defaultValue : "";
    return /* @__PURE__ */ jsx21(
      FormInput,
      {
        label,
        min: options.min,
        placeholder: options.placeholder,
        step: options.step,
        type: "number",
        value: displayValue,
        onChange: (event) => {
          const rawValue = event.target.value;
          if (rawValue === "") {
            onChange(void 0);
            return;
          }
          const parsedValue = Number(rawValue);
          onChange(Number.isNaN(parsedValue) ? void 0 : parsedValue);
        }
      }
    );
  }
});
var createColorInputField = (FormInput, label, defaultValue) => ({
  label,
  type: "custom",
  render: ({
    value,
    onChange
  }) => /* @__PURE__ */ jsx21(
    FormInput,
    {
      className: "h-10 cursor-pointer px-2",
      label,
      type: "color",
      value: typeof value === "string" && value.trim().length > 0 ? value : defaultValue,
      onChange: (event) => onChange(event.target.value)
    }
  )
});
var buttonIconOptions = [
  { label: "Ba\u011Flant\u0131", value: "link", Icon: LinkIcon2 },
  { label: "Kaydet", value: "save", Icon: CheckCircleIcon },
  { label: "\u0130ndir", value: "download", Icon: ArrowDownTrayIcon },
  { label: "Favori", value: "bookmark", Icon: BookmarkIcon },
  { label: "Sil", value: "trash", Icon: TrashIcon2 }
];
var headingLevelOptions = [
  { label: "H1", value: "h1" },
  { label: "H2", value: "h2" },
  { label: "H3", value: "h3" },
  { label: "H4", value: "h4" },
  { label: "H5", value: "h5" },
  { label: "H6", value: "h6" }
];
var headingAlignmentOptions = [
  { label: "Sola", value: "left" },
  { label: "Ortala", value: "center" },
  { label: "Sa\u011Fa", value: "right" }
];
var headingFontWeightOptions = [
  { label: "\u0130nce (300)", value: 300 },
  { label: "Normal (400)", value: 400 },
  { label: "Orta (500)", value: 500 },
  { label: "Yar\u0131 Kal\u0131n (600)", value: 600 },
  { label: "Kal\u0131n (700)", value: 700 },
  { label: "Ekstra (800)", value: 800 }
];
var gallerySizeOptions = [
  { label: "1 s\xFCtun x 1 sat\u0131r", value: "1x1" },
  { label: "2 s\xFCtun x 1 sat\u0131r", value: "2x1" },
  { label: "1 s\xFCtun x 2 sat\u0131r", value: "1x2" },
  { label: "2 s\xFCtun x 2 sat\u0131r", value: "2x2" }
];
var galleryGridColumnsOptions = [
  { label: "4 s\xFCtun", value: 4 },
  { label: "3 s\xFCtun", value: 3 },
  { label: "2 s\xFCtun", value: 2 }
];
var isGalleryGridSize = (value) => value === 2 || value === 3 || value === 4;
var isGalleryImageMode2 = (value) => value === "cover" || value === "contain";
var galleryItemImageModeField = {
  label: "G\xF6rsel Modu (Bu G\xF6rsel)",
  type: "custom",
  render: ({
    value,
    onChange
  }) => {
    const currentValue = isGalleryImageMode2(value) ? value : void 0;
    const buttonClasses = (isActive) => `rounded border px-4 py-2 text-left text-sm font-medium transition ${isActive ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:border-indigo-400"}`;
    return /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx21("span", { className: "text-sm font-medium text-gray-700", children: "G\xF6rsel Modu (Bu G\xF6rsel)" }),
      /* @__PURE__ */ jsx21("div", { className: "flex gap-3", children: ["cover", "contain"].map((mode) => /* @__PURE__ */ jsx21(
        "button",
        {
          className: buttonClasses(currentValue === mode),
          type: "button",
          onClick: () => onChange(mode),
          children: mode === "cover" ? "Kapla" : "S\u0131\u011Fd\u0131r"
        },
        mode
      )) })
    ] });
  }
};
var createBaseEditorConfig = (options = {}) => {
  const FormInput = options.FormInputField ?? BaseFormInputField;
  const ImageField = options.ImageField ?? EmptyImageField;
  const numberInput = (label, opts) => createNumberInputField(FormInput, label, opts);
  const colorInput = (label, defaultValue) => createColorInputField(FormInput, label, defaultValue);
  return {
    root: {
      defaultProps: {
        title: "",
        description: ""
      },
      fields: {
        title: { label: "Ba\u015Fl\u0131k", type: "text" },
        description: { label: "A\xE7\u0131klama", type: "textarea" }
      }
    },
    categories: {
      content: {
        components: [
          "HeadingBlock",
          "RichTextBlock",
          "AccordionBlock",
          "SingleAccordion"
        ],
        title: "\u0130\xE7erik"
      },
      media: {
        title: "G\xF6rsel",
        components: ["SliderBlock", "SliderShowcaseBlock", "Gallery"]
      },
      actions: {
        components: ["LinkBar", "ButtonLink"],
        title: "Ba\u011Flant\u0131lar"
      },
      embed: {
        title: "G\xF6m\xFCl\xFC \u0130\xE7erik",
        components: ["YoutubeEmbed", "GoogleMapsEmbed"]
      }
    },
    components: {
      HeadingBlock: {
        label: "Ba\u015Fl\u0131k",
        defaultProps: {
          ...headingDefaultValues
        },
        fields: {
          styleClipboard: {
            label: "Stil Kopyalama",
            type: "custom",
            render: () => /* @__PURE__ */ jsx21(HeadingClipboardField, {})
          },
          text: {
            label: "Ba\u015Fl\u0131k Metni",
            type: "text",
            placeholder: "\xD6rn: Dernek Faaliyetleri"
          },
          level: {
            label: "Ba\u015Fl\u0131k D\xFCzeyi",
            type: "radio",
            options: headingLevelOptions
          },
          textAlign: {
            label: "Hizalama",
            type: "radio",
            options: headingAlignmentOptions
          },
          fontSize: numberInput("Yaz\u0131 Boyutu (px)", {
            min: 12,
            placeholder: "\xD6rn: 36",
            defaultValue: headingDefaultValues.fontSize
          }),
          fontWeight: {
            label: "Yaz\u0131 Kal\u0131nl\u0131\u011F\u0131",
            type: "radio",
            options: headingFontWeightOptions
          },
          italic: {
            label: "\u0130talik",
            type: "radio",
            options: [
              { label: "Evet", value: true },
              { label: "Hay\u0131r", value: false }
            ]
          },
          textColorLight: colorInput(
            "Metin Rengi (A\xE7\u0131k Tema)",
            headingDefaultValues.textColorLight
          ),
          textColorDark: colorInput(
            "Metin Rengi (Koyu Tema)",
            headingDefaultValues.textColorDark
          ),
          decorationEnabled: {
            label: "Alt \xC7izgi",
            type: "radio",
            options: [
              { label: "A\xE7\u0131k", value: true },
              { label: "Kapal\u0131", value: false }
            ]
          },
          decorationWidth: numberInput("Alt \xC7izgi Uzunlu\u011Fu (px)", {
            min: 12,
            placeholder: "\xD6rn: 96",
            defaultValue: headingDefaultValues.decorationWidth
          }),
          decorationThickness: numberInput("Alt \xC7izgi Kal\u0131nl\u0131\u011F\u0131 (px)", {
            min: 1,
            placeholder: "\xD6rn: 4",
            defaultValue: headingDefaultValues.decorationThickness
          }),
          decorationSpacing: numberInput("Metin - \xC7izgi Aral\u0131\u011F\u0131 (px)", {
            min: 0,
            placeholder: "\xD6rn: 12",
            defaultValue: headingDefaultValues.decorationSpacing
          }),
          decorationColorLight: colorInput(
            "Alt \xC7izgi Rengi (A\xE7\u0131k Tema)",
            headingDefaultValues.decorationColorLight
          ),
          decorationColorDark: colorInput(
            "Alt \xC7izgi Rengi (Koyu Tema)",
            headingDefaultValues.decorationColorDark
          ),
          underlineMode: {
            label: "Alt \xC7izgi Modu",
            type: "radio",
            options: [
              { label: "Ayr\u0131 Eleman", value: "separate" },
              { label: "Ba\u015Fl\u0131k Alt\u0131", value: "inline" }
            ]
          },
          marginTop: numberInput("\xDCst Bo\u015Fluk (px)", {
            min: 0,
            placeholder: "\xD6rn: 16",
            defaultValue: headingDefaultValues.marginTop
          }),
          marginRight: numberInput("Sa\u011F Bo\u015Fluk (px)", {
            min: 0,
            placeholder: "\xD6rn: 0",
            defaultValue: headingDefaultValues.marginRight
          }),
          marginBottom: numberInput("Alt Bo\u015Fluk (px)", {
            min: 0,
            placeholder: "\xD6rn: 16",
            defaultValue: headingDefaultValues.marginBottom
          }),
          marginLeft: numberInput("Sol Bo\u015Fluk (px)", {
            min: 0,
            placeholder: "\xD6rn: 8",
            defaultValue: headingDefaultValues.marginLeft
          })
        },
        render: (props) => /* @__PURE__ */ jsx21(HeadingBlock_default, { ...props })
      },
      RichTextBlock: {
        label: "Metin",
        fields: {
          content: {
            type: "custom",
            render: ({ value, onChange, id }) => {
              const key = id ?? "richtext";
              return /* @__PURE__ */ jsx21(
                RichTextEditor,
                {
                  initialData: value ?? "",
                  onChange: (data) => {
                    onChange(data);
                  }
                },
                key
              );
            }
          }
        },
        render: ({ content }) => /* @__PURE__ */ jsx21(RichTextRenderer, { html: content ?? "" })
      },
      AccordionBlock: {
        label: "Akordeon Listesi",
        fields: {
          sections: {
            label: "B\xF6l\xFCmler",
            type: "array",
            min: 1,
            defaultItemProps: {
              title: "Yeni B\xF6l\xFCm"
            },
            getItemSummary: (item, index) => item?.title?.trim() || `B\xF6l\xFCm ${typeof index === "number" ? index + 1 : 1}`,
            arrayFields: {
              title: {
                label: "Ba\u015Fl\u0131k",
                type: "text"
              },
              content: {
                label: "\u0130\xE7erik",
                type: "slot"
              }
            }
          }
        },
        render: ({ sections, puck: { isEditing } }) => {
          const normalizedSections = (sections ?? []).map((section) => ({
            title: section?.title ?? "",
            content: section?.content
          }));
          if (normalizedSections.length < 1) {
            return /* @__PURE__ */ jsx21(Fragment6, {});
          }
          return /* @__PURE__ */ jsx21(
            AccordionBlock,
            {
              isEditing,
              sections: normalizedSections
            }
          );
        }
      },
      SingleAccordion: {
        label: "Tekli Akordeon",
        defaultProps: {
          defaultOpen: false
        },
        fields: {
          title: {
            label: "Ba\u015Fl\u0131k",
            type: "text"
          },
          content: {
            label: "\u0130\xE7erik",
            type: "slot"
          },
          defaultOpen: {
            label: "Varsay\u0131lan olarak a\xE7\u0131k",
            type: "radio",
            options: [
              { label: "Evet", value: true },
              { label: "Hay\u0131r", value: false }
            ]
          }
        },
        render: ({ title, content: Content, defaultOpen }) => /* @__PURE__ */ jsx21(
          SingleAccordionBlock,
          {
            defaultOpen: Boolean(defaultOpen),
            title,
            children: Content ? /* @__PURE__ */ jsx21(Content, {}) : null
          }
        )
      },
      LinkBar: {
        label: "Ba\u011Flant\u0131 Listesi",
        fields: {
          links: {
            label: "Ba\u011Flant\u0131lar",
            type: "custom",
            render: ({ value, onChange }) => {
              const items = Array.isArray(value) ? value.map(
                (link) => ({
                  label: link.label ?? "",
                  path: link.path ?? ""
                })
              ) : [];
              return /* @__PURE__ */ jsx21(
                LinkBarClipboardField,
                {
                  value: items,
                  onChange: (next) => onChange(next)
                }
              );
            }
          }
        },
        render: ({ links }) => /* @__PURE__ */ jsx21(LinkBarBlock, { links: links ?? [] })
      },
      ButtonLink: {
        label: "Buton",
        fields: {
          text: {
            label: "Buton Metni",
            type: "custom",
            render: ({ value, onChange, id }) => /* @__PURE__ */ jsx21(
              RichTextEditor,
              {
                initialData: value ?? "",
                onChange
              },
              id ?? "button-link-text"
            )
          },
          url: {
            label: "Ba\u011Flant\u0131 URL'si",
            type: "text",
            placeholder: "https://..."
          },
          icon: {
            label: "\u0130kon",
            type: "custom",
            render: ({ value, onChange }) => /* @__PURE__ */ jsx21(
              "select",
              {
                className: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm",
                value: typeof value === "string" ? value : "link",
                onChange: (event) => onChange(event.target.value),
                children: buttonIconOptions.map((option) => /* @__PURE__ */ jsx21("option", { value: option.value, children: option.label }, option.value))
              }
            )
          },
          color: {
            label: "Arka Plan Rengi",
            type: "custom",
            render: ({ value, onChange }) => /* @__PURE__ */ jsx21(
              FormInput,
              {
                className: "h-10 cursor-pointer px-2",
                label: "Arka Plan Rengi",
                type: "color",
                value: typeof value === "string" ? value : "#4f46e5",
                onChange: (event) => onChange(event.target.value)
              }
            )
          },
          borderRadius: numberInput("K\xF6\u015Fe Yar\u0131\xE7ap\u0131 (px)", {
            min: 0,
            placeholder: "\xD6rn: 12"
          }),
          openInNewTab: {
            label: "Yeni sekmede a\xE7",
            type: "radio",
            options: [
              { label: "Evet", value: true },
              { label: "Hay\u0131r", value: false }
            ]
          }
        },
        render: ({ text, url, icon, openInNewTab, color, borderRadius }) => {
          const normalizedHtml = (text ?? "").trim();
          const IconComponent = buttonIconOptions.find((option) => option.value === icon)?.Icon ?? buttonIconOptions[0].Icon;
          const backgroundColor = typeof color === "string" && color.trim().length > 0 ? color : "#4f46e5";
          const radiusValue = typeof borderRadius === "number" && borderRadius >= 0 ? borderRadius : 12;
          const hasText = normalizedHtml.length > 0;
          const resolvedHref = url && url.trim().length > 0 ? url.trim() : void 0;
          const target = openInNewTab ? "_blank" : void 0;
          const rel = openInNewTab ? "noreferrer noopener" : void 0;
          if (!hasText && !resolvedHref) {
            return /* @__PURE__ */ jsx21(Fragment6, {});
          }
          return /* @__PURE__ */ jsxs11(
            "a",
            {
              className: "inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white",
              href: resolvedHref,
              rel,
              style: {
                backgroundColor,
                borderRadius: `${radiusValue}px`
              },
              target,
              children: [
                IconComponent ? /* @__PURE__ */ jsx21(IconComponent, { className: "h-5 w-5" }) : null,
                hasText ? /* @__PURE__ */ jsx21(RichTextRenderer, { html: normalizedHtml }) : "Buton"
              ]
            }
          );
        }
      },
      SliderBlock: {
        label: "G\xF6rsel Kayd\u0131r\u0131c\u0131",
        fields: {
          slides: {
            label: "Slaytlar",
            type: "custom",
            render: ({ value, onChange }) => /* @__PURE__ */ jsx21(
              SlidesField,
              {
                ImageField,
                value: Array.isArray(value) ? value : [],
                onChange: (next) => onChange(next)
              }
            )
          },
          autoPlay: {
            label: "Otomatik oynatma",
            type: "radio",
            options: [
              { label: "Evet", value: true },
              { label: "Hay\u0131r", value: false }
            ]
          },
          autoPlayInterval: numberInput("Otomatik oynatma s\xFCresi (ms)", {
            min: 2e3,
            placeholder: "\xD6rn: 6000",
            defaultValue: 6e3
          }),
          imageMode: imageModeToggleField
        },
        render: ({ slides, autoPlay, autoPlayInterval, imageMode }) => {
          const normalizedSlides = (slides ?? []).map((slide) => ({
            imageUrl: slide?.imageUrl ?? "",
            text: slide?.text ?? ""
          }));
          return /* @__PURE__ */ jsx21(
            Slider,
            {
              autoPlay: Boolean(autoPlay),
              autoPlayInterval: typeof autoPlayInterval === "number" && autoPlayInterval > 0 ? autoPlayInterval : 6e3,
              imageMode: imageMode === "contain" ? "contain" : "cover",
              slides: normalizedSlides
            }
          );
        }
      },
      SliderShowcaseBlock: {
        label: "Vitrin Kayd\u0131r\u0131c\u0131",
        fields: {
          slides: {
            label: "Slaytlar",
            type: "custom",
            render: ({ value, onChange }) => /* @__PURE__ */ jsx21(
              SlidesField,
              {
                ImageField,
                value: Array.isArray(value) ? value : [],
                onChange: (next) => onChange(next)
              }
            )
          },
          autoPlay: {
            label: "Otomatik oynatma",
            type: "radio",
            options: [
              { label: "Evet", value: true },
              { label: "Hay\u0131r", value: false }
            ]
          },
          autoPlayInterval: numberInput("Otomatik oynatma s\xFCresi (ms)", {
            min: 2e3,
            placeholder: "\xD6rn: 6000",
            defaultValue: 6e3
          }),
          imageMode: imageModeToggleField,
          desktopHeight: numberInput("Masa\xFCst\xFC Y\xFCksekli\u011Fi (rem)", {
            min: 20,
            step: 0.5,
            placeholder: "\xD6rn: 50",
            defaultValue: 50
          }),
          mobileHeight: numberInput("Mobil Y\xFCksekli\u011Fi (rem)", {
            min: 20,
            step: 0.5,
            placeholder: "\xD6rn: 45",
            defaultValue: 45
          })
        },
        render: ({
          slides,
          autoPlay,
          autoPlayInterval,
          imageMode,
          desktopHeight,
          mobileHeight
        }) => {
          const normalizedSlides = (slides ?? []).map((slide) => ({
            imageUrl: slide?.imageUrl ?? "",
            text: slide?.text ?? ""
          }));
          return /* @__PURE__ */ jsx21(
            SliderShowcase,
            {
              autoPlay: Boolean(autoPlay),
              autoPlayInterval: typeof autoPlayInterval === "number" && autoPlayInterval > 0 ? autoPlayInterval : 6e3,
              desktopHeight: typeof desktopHeight === "number" && desktopHeight > 0 ? desktopHeight : void 0,
              imageMode: imageMode === "contain" ? "contain" : "cover",
              mobileHeight: typeof mobileHeight === "number" && mobileHeight > 0 ? mobileHeight : void 0,
              slides: normalizedSlides
            }
          );
        }
      },
      YoutubeEmbed: {
        label: "YouTube Video",
        defaultProps: {
          startSeconds: 0,
          autoPlay: false,
          muted: false
        },
        fields: {
          url: {
            label: "YouTube URL'si veya Video ID",
            type: "text",
            placeholder: "https://www.youtube.com/watch?v=..."
          },
          title: {
            label: "Ba\u015Fl\u0131k",
            type: "text"
          },
          startSeconds: numberInput("Ba\u015Flang\u0131\xE7 Zaman\u0131 (sn)", {
            min: 0,
            placeholder: "\xD6rn: 30",
            step: 1
          }),
          autoPlay: {
            label: "Otomatik oynatma",
            type: "radio",
            options: [
              { label: "Kapal\u0131", value: "off" },
              { label: "A\xE7\u0131k", value: "on" }
            ]
          },
          muted: {
            label: "Sessiz ba\u015Flat",
            type: "radio",
            options: [
              { label: "Kapal\u0131", value: "off" },
              { label: "A\xE7\u0131k", value: "on" }
            ]
          }
        },
        render: ({ url, title, startSeconds, autoPlay, muted }) => {
          const normalizedStart = typeof startSeconds === "number" && startSeconds > 0 ? startSeconds : void 0;
          return /* @__PURE__ */ jsx21(
            YoutubeEmbed,
            {
              autoPlay: Boolean(autoPlay),
              muted: Boolean(muted),
              startSeconds: normalizedStart,
              title,
              url
            }
          );
        }
      },
      GoogleMapsEmbed: {
        label: "Google Haritas\u0131",
        defaultProps: {
          allowFullScreen: true
        },
        fields: {
          url: {
            label: "Harita URL'si veya Adres",
            type: "text",
            placeholder: "https://www.google.com/maps/..."
          },
          title: {
            label: "Ba\u015Fl\u0131k",
            type: "text"
          },
          height: numberInput("Harita Y\xFCksekli\u011Fi (px)", {
            min: 200,
            placeholder: "\xD6rn: 450"
          }),
          allowFullScreen: {
            label: "Tam ekran izni",
            type: "radio",
            options: [
              { label: "Evet", value: true },
              { label: "Hay\u0131r", value: false }
            ]
          }
        },
        render: ({ url, title, height, allowFullScreen }) => /* @__PURE__ */ jsx21(
          GoogleMapsEmbed,
          {
            allowFullScreen: Boolean(allowFullScreen),
            height,
            title,
            url
          }
        )
      },
      Gallery: {
        label: "Galeri",
        fields: {
          items: {
            label: "Galeri G\xF6rselleri",
            type: "array",
            min: 1,
            defaultItemProps: {
              title: "",
              date: "",
              imageUrl: "",
              size: "1x1",
              href: ""
            },
            getItemSummary: (item, index) => {
              const title = item?.title?.trim();
              if (title) {
                return title;
              }
              const path = typeof item?.imageUrl === "string" ? item.imageUrl : "";
              if (path) {
                const segments = path.split("/");
                const lastSegment = segments[segments.length - 1];
                if (lastSegment) {
                  return lastSegment;
                }
              }
              const position = typeof index === "number" ? index + 1 : 1;
              return `G\xF6rsel ${position}`;
            },
            arrayFields: {
              title: {
                label: "Ba\u015Fl\u0131k",
                type: "text"
              },
              date: {
                label: "Tarih",
                type: "text",
                placeholder: "2020/02/03"
              },
              imageUrl: {
                label: "G\xF6rsel",
                type: "custom",
                render: ({ value, onChange }) => /* @__PURE__ */ jsx21(
                  ImageField,
                  {
                    value: typeof value === "string" ? value : "",
                    onChange: (next) => onChange(next)
                  }
                )
              },
              href: {
                label: "Ba\u011Flant\u0131 URL'si",
                type: "text",
                placeholder: "https://..."
              },
              size: {
                label: "Grid Boyutu",
                type: "radio",
                options: gallerySizeOptions
              },
              imageMode: galleryItemImageModeField
            }
          },
          gridSize: createButtonToggleField(
            "Grid S\xFCtun Say\u0131s\u0131 (lg)",
            galleryGridColumnsOptions,
            3
          ),
          imageMode: imageModeToggleField,
          text: {
            label: "A\xE7\u0131klama",
            type: "custom",
            render: ({ value, onChange }) => /* @__PURE__ */ jsx21(Fragment6, { children: /* @__PURE__ */ jsx21(
              "input",
              {
                className: "hidden",
                value,
                onChange: (e) => onChange(e.target.value)
              }
            ) })
          }
        },
        render: ({ text, items, gridSize, imageMode }) => /* @__PURE__ */ jsxs11(Fragment6, { children: [
          /* @__PURE__ */ jsx21("p", { className: "hidden", children: text }),
          /* @__PURE__ */ jsx21(
            Gallery,
            {
              gridSize: isGalleryGridSize(gridSize) ? gridSize : void 0,
              imageMode: isGalleryImageMode2(imageMode) ? imageMode : void 0,
              items
            }
          )
        ] })
      }
    }
  };
};

// src/config/baseRendererConfig.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
var createBaseRendererConfig = (options = {}) => {
  const baseConfig = createBaseEditorConfig(options);
  return {
    ...baseConfig,
    components: {
      ...baseConfig.components,
      RichTextBlock: {
        label: "Metin",
        render: ({ content }) => /* @__PURE__ */ jsx22(RichTextRenderer, { html: content ?? "" })
      }
    }
  };
};
export {
  AccordionBlock,
  Button,
  ButtonLink,
  ClipboardFormSection,
  Gallery,
  GoogleMapsEmbed,
  HEADING_DECORATION_COLOR_DARK,
  HEADING_DECORATION_COLOR_LIGHT,
  HEADING_TEXT_COLOR_DARK,
  HEADING_TEXT_COLOR_LIGHT,
  HeadingBlock_default as HeadingBlock,
  HeadingClipboardField,
  Lightbox,
  LinkBarBlock,
  LinkBarClipboardField,
  LinkListField,
  PublicRenderer,
  PuckEditor,
  RichTextEditor,
  RichTextRenderer,
  SingleAccordionBlock,
  Slider,
  SliderShowcase,
  SlidesField,
  YoutubeEmbed,
  createBaseEditorConfig,
  createBaseRendererConfig,
  headingDefaultValues
};
