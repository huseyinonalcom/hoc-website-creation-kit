import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Image from "next/image";
import { ArrowDownTrayIcon, BookmarkIcon, CheckCircleIcon, LinkIcon, TrashIcon } from "@heroicons/react/24/outline";
import AccordionBlock from "../components/AccordionBlock";
import Gallery from "../components/Gallery";
import HeadingBlock from "../components/HeadingBlock";
import { headingDefaultValues } from "../components/HeadingBlock.defaults";
import { LinkBarBlock } from "../components/LinkBarBlock";
import { RichTextEditor } from "../components/TextEditor/Editor";
import { RichTextRenderer } from "../components/TextEditor/Renderer";
import SingleAccordionBlock from "../components/SingleAccordionBlock";
import Slider from "../components/Slider";
import SliderShowcase from "../components/SliderShowcase";
import { GoogleMapsEmbed } from "../components/Embed/GoogleMapsEmbed";
import { YoutubeEmbed } from "../components/Embed/YoutubeEmbed";
import { HeadingClipboardField } from "../fields/HeadingClipboardField";
import { LinkBarClipboardField } from "../fields/LinkBarClipboardField";
import { SlidesField } from "../fields/SlidesField";
import Link from "next/link";
const BaseFormInputField = ({ label, className, ...inputProps }) => (_jsxs("label", { className: "flex flex-col gap-2 text-sm font-medium text-gray-700", children: [label ? _jsx("span", { children: label }) : null, _jsx("input", { ...inputProps, className: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none ${className ?? ""}` })] }));
const EmptyImageField = () => (_jsx("div", { className: "rounded-md border border-dashed border-gray-300 px-3 py-2 text-xs text-gray-500", children: "Image picker not configured." }));
const createButtonToggleField = (label, options, defaultValue) => ({
    label,
    type: "custom",
    render: ({ value, onChange, }) => {
        const currentValue = value ?? defaultValue ?? options[0]?.value ?? "";
        return (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: label }), _jsx("div", { className: "flex gap-3", children: options.map((option) => (_jsx("button", { className: `rounded border px-4 py-2 text-left text-sm font-medium transition ${currentValue === option.value ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:border-indigo-400"}`, type: "button", onClick: () => onChange(option.value), children: option.label }, option.value))) })] }));
    },
});
const stackOrderToggleField = createButtonToggleField("Mobil Sıralama", [
    { label: "Görsel Önce", value: "image-first" },
    { label: "Metin Önce", value: "content-first" },
], "image-first");
const imageModeToggleField = createButtonToggleField("Görsel Modu", [
    { label: "Kapla", value: "cover" },
    { label: "Sığdır", value: "contain" },
], "cover");
const imagePositionToggleField = createButtonToggleField("Görsel Konumu", [
    { label: "Sol", value: "left" },
    { label: "Sağ", value: "right" },
], "left");
const createNumberInputField = (FormInput, label, options = {}) => ({
    label,
    type: "custom",
    render: ({ value, onChange, }) => {
        const displayValue = typeof value === "number" ? value : typeof options.defaultValue === "number" ? options.defaultValue : "";
        return (_jsx(FormInput, { label: label, min: options.min, placeholder: options.placeholder, step: options.step, type: "number", value: displayValue, onChange: (event) => {
                const rawValue = event.target.value;
                if (rawValue === "") {
                    onChange(undefined);
                    return;
                }
                const parsedValue = Number(rawValue);
                onChange(Number.isNaN(parsedValue) ? undefined : parsedValue);
            } }));
    },
});
const createColorInputField = (FormInput, label, defaultValue) => ({
    label,
    type: "custom",
    render: ({ value, onChange, }) => (_jsx(FormInput, { className: "h-10 cursor-pointer px-2", label: label, type: "color", value: typeof value === "string" && value.trim().length > 0 ? value : defaultValue, onChange: (event) => onChange(event.target.value) })),
});
const buttonIconOptions = [
    { label: "Bağlantı", value: "link", Icon: LinkIcon },
    { label: "Kaydet", value: "save", Icon: CheckCircleIcon },
    { label: "İndir", value: "download", Icon: ArrowDownTrayIcon },
    { label: "Favori", value: "bookmark", Icon: BookmarkIcon },
    { label: "Sil", value: "trash", Icon: TrashIcon },
];
const headingLevelOptions = [
    { label: "H1", value: "h1" },
    { label: "H2", value: "h2" },
    { label: "H3", value: "h3" },
    { label: "H4", value: "h4" },
    { label: "H5", value: "h5" },
    { label: "H6", value: "h6" },
];
const headingAlignmentOptions = [
    { label: "Sola", value: "left" },
    { label: "Ortala", value: "center" },
    { label: "Sağa", value: "right" },
];
const headingFontWeightOptions = [
    { label: "İnce (300)", value: 300 },
    { label: "Normal (400)", value: 400 },
    { label: "Orta (500)", value: 500 },
    { label: "Yarı Kalın (600)", value: 600 },
    { label: "Kalın (700)", value: 700 },
    { label: "Ekstra (800)", value: 800 },
];
const gallerySizeOptions = [
    { label: "1 sütun x 1 satır", value: "1x1" },
    { label: "2 sütun x 1 satır", value: "2x1" },
    { label: "1 sütun x 2 satır", value: "1x2" },
    { label: "2 sütun x 2 satır", value: "2x2" },
];
const galleryGridColumnsOptions = [
    { label: "4 sütun", value: 4 },
    { label: "3 sütun", value: 3 },
    { label: "2 sütun", value: 2 },
];
const isGalleryGridSize = (value) => value === 2 || value === 3 || value === 4;
const isGalleryImageMode = (value) => value === "cover" || value === "contain";
const galleryItemImageModeField = {
    label: "Görsel Modu (Bu Görsel)",
    type: "custom",
    render: ({ value, onChange, }) => {
        const currentValue = isGalleryImageMode(value) ? value : undefined;
        const buttonClasses = (isActive) => `rounded border px-4 py-2 text-left text-sm font-medium transition ${isActive ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:border-indigo-400"}`;
        return (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "G\u00F6rsel Modu (Bu G\u00F6rsel)" }), _jsx("div", { className: "flex gap-3", children: ["cover", "contain"].map((mode) => (_jsx("button", { className: buttonClasses(currentValue === mode), type: "button", onClick: () => onChange(mode), children: mode === "cover" ? "Kapla" : "Sığdır" }, mode))) })] }));
    },
};
export const createBaseEditorConfig = (options = {}) => {
    const FormInput = options.FormInputField ?? BaseFormInputField;
    const ImageField = options.ImageField ?? EmptyImageField;
    const numberInput = (label, opts) => createNumberInputField(FormInput, label, opts);
    const colorInput = (label, defaultValue) => createColorInputField(FormInput, label, defaultValue);
    return {
        root: {
            defaultProps: {
                title: "",
                description: "",
            },
            fields: {
                title: { label: "Başlık", type: "text" },
                description: { label: "Açıklama", type: "textarea" },
            },
        },
        categories: {
            layout: {
                title: "Yerleşim",
                components: ["TwoColumnLayout", "ThreeColumnLayout", "FourColumnLayout", "VerticalSpacer"],
            },
            content: {
                title: "İçerik",
                components: ["HeadingBlock", "RichTextBlock", "AccordionBlock", "SingleAccordion"],
            },
            media: {
                title: "Görsel",
                components: ["SingleImage", "ImageWithText", "ImageWithSlot", "ImageOverlayText", "SliderBlock", "SliderShowcaseBlock", "Gallery"],
            },
            actions: {
                title: "Bağlantılar",
                components: ["LinkBar", "ButtonLink"],
            },
            embed: {
                title: "Gömülü İçerik",
                components: ["YoutubeEmbed", "GoogleMapsEmbed"],
            },
        },
        components: {
            TwoColumnLayout: {
                label: "2 Sütun",
                fields: {
                    left: {
                        label: "Sol Sütun",
                        type: "slot",
                    },
                    right: {
                        label: "Sağ Sütun",
                        type: "slot",
                    },
                    gap: numberInput("Sütun Aralığı (px)", {
                        min: 0,
                        placeholder: "Örn: 32",
                    }),
                    columnRatio: {
                        label: "Sütun Oranı",
                        type: "radio",
                        options: [
                            { label: "1:2", value: "1-2" },
                            { label: "1:1", value: "1-1" },
                            { label: "2:1", value: "2-1" },
                        ],
                    },
                },
                render: ({ left: Left, right: Right, gap, columnRatio }) => {
                    if (!Left && !Right) {
                        return _jsx(_Fragment, {});
                    }
                    const gapValue = typeof gap === "number" && gap >= 0 ? gap : 32;
                    const ratio = columnRatio ?? "1-1";
                    const containerClass = ratio === "1-1" ? "grid grid-cols-1 lg:grid-cols-2" : "grid grid-cols-1 lg:grid-cols-3";
                    const leftColClass = (() => {
                        if (ratio === "1-2")
                            return "lg:col-span-1";
                        if (ratio === "2-1")
                            return "lg:col-span-2";
                        return "";
                    })();
                    const rightColClass = (() => {
                        if (ratio === "1-2")
                            return "lg:col-span-2";
                        if (ratio === "2-1")
                            return "lg:col-span-1";
                        return "";
                    })();
                    return (_jsxs("div", { className: containerClass, style: { gap: `${gapValue}px` }, children: [_jsx("div", { className: leftColClass, children: Left ? _jsx(Left, {}) : null }), _jsx("div", { className: rightColClass, children: Right ? _jsx(Right, {}) : null })] }));
                },
            },
            ThreeColumnLayout: {
                label: "3 Sütun",
                fields: {
                    first: {
                        label: "Birinci Sütun",
                        type: "slot",
                    },
                    second: {
                        label: "İkinci Sütun",
                        type: "slot",
                    },
                    third: {
                        label: "Üçüncü Sütun",
                        type: "slot",
                    },
                    gap: numberInput("Sütun Aralığı (px)", {
                        min: 0,
                        placeholder: "Örn: 32",
                    }),
                },
                render: ({ first: First, second: Second, third: Third, gap }) => {
                    if (!First && !Second && !Third) {
                        return _jsx(_Fragment, {});
                    }
                    const gapValue = typeof gap === "number" && gap >= 0 ? gap : 24;
                    return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3", style: { gap: `${gapValue}px` }, children: [_jsx("div", { children: First ? _jsx(First, {}) : null }), _jsx("div", { children: Second ? _jsx(Second, {}) : null }), _jsx("div", { children: Third ? _jsx(Third, {}) : null })] }));
                },
            },
            FourColumnLayout: {
                label: "4 Sütun",
                fields: {
                    first: {
                        label: "Birinci Sütun",
                        type: "slot",
                    },
                    second: {
                        label: "İkinci Sütun",
                        type: "slot",
                    },
                    third: {
                        label: "Üçüncü Sütun",
                        type: "slot",
                    },
                    fourth: {
                        label: "Dördüncü Sütun",
                        type: "slot",
                    },
                    gap: numberInput("Sütun Aralığı (px)", {
                        min: 0,
                        placeholder: "Örn: 24",
                    }),
                },
                render: ({ first: First, second: Second, third: Third, fourth: Fourth, gap }) => {
                    if (!First && !Second && !Third && !Fourth) {
                        return _jsx(_Fragment, {});
                    }
                    const gapValue = typeof gap === "number" && gap >= 0 ? gap : 24;
                    return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4", style: { gap: `${gapValue}px` }, children: [_jsx("div", { children: First ? _jsx(First, {}) : null }), _jsx("div", { children: Second ? _jsx(Second, {}) : null }), _jsx("div", { children: Third ? _jsx(Third, {}) : null }), _jsx("div", { children: Fourth ? _jsx(Fourth, {}) : null })] }));
                },
            },
            VerticalSpacer: {
                label: "Dikey Aralık",
                fields: {
                    height: numberInput("Yükseklik (px)", {
                        min: 8,
                        placeholder: "Örn: 48",
                    }),
                },
                render: ({ height }) => {
                    const resolvedHeight = typeof height === "number" && height > 0 ? height : 32;
                    return _jsx("div", { "aria-hidden": "true", className: "w-full", style: { height: `${resolvedHeight}px` } });
                },
            },
            HeadingBlock: {
                label: "Başlık",
                defaultProps: {
                    ...headingDefaultValues,
                },
                fields: {
                    styleClipboard: {
                        label: "Stil Kopyalama",
                        type: "custom",
                        render: () => _jsx(HeadingClipboardField, {}),
                    },
                    text: {
                        label: "Başlık Metni",
                        type: "text",
                        placeholder: "Örn: Dernek Faaliyetleri",
                    },
                    level: {
                        label: "Başlık Düzeyi",
                        type: "radio",
                        options: headingLevelOptions,
                    },
                    textAlign: {
                        label: "Hizalama",
                        type: "radio",
                        options: headingAlignmentOptions,
                    },
                    fontSize: numberInput("Yazı Boyutu (px)", {
                        min: 12,
                        placeholder: "Örn: 36",
                        defaultValue: headingDefaultValues.fontSize,
                    }),
                    fontWeight: {
                        label: "Yazı Kalınlığı",
                        type: "radio",
                        options: headingFontWeightOptions,
                    },
                    italic: {
                        label: "İtalik",
                        type: "radio",
                        options: [
                            { label: "Evet", value: true },
                            { label: "Hayır", value: false },
                        ],
                    },
                    textColorLight: colorInput("Metin Rengi (Açık Tema)", headingDefaultValues.textColorLight),
                    textColorDark: colorInput("Metin Rengi (Koyu Tema)", headingDefaultValues.textColorDark),
                    decorationEnabled: {
                        label: "Alt Çizgi",
                        type: "radio",
                        options: [
                            { label: "Açık", value: true },
                            { label: "Kapalı", value: false },
                        ],
                    },
                    decorationWidth: numberInput("Alt Çizgi Uzunluğu (px)", {
                        min: 12,
                        placeholder: "Örn: 96",
                        defaultValue: headingDefaultValues.decorationWidth,
                    }),
                    decorationThickness: numberInput("Alt Çizgi Kalınlığı (px)", {
                        min: 1,
                        placeholder: "Örn: 4",
                        defaultValue: headingDefaultValues.decorationThickness,
                    }),
                    decorationSpacing: numberInput("Metin - Çizgi Aralığı (px)", {
                        min: 0,
                        placeholder: "Örn: 12",
                        defaultValue: headingDefaultValues.decorationSpacing,
                    }),
                    decorationColorLight: colorInput("Alt Çizgi Rengi (Açık Tema)", headingDefaultValues.decorationColorLight),
                    decorationColorDark: colorInput("Alt Çizgi Rengi (Koyu Tema)", headingDefaultValues.decorationColorDark),
                    underlineMode: {
                        label: "Alt Çizgi Modu",
                        type: "radio",
                        options: [
                            { label: "Ayrı Eleman", value: "separate" },
                            { label: "Başlık Altı", value: "inline" },
                        ],
                    },
                    marginTop: numberInput("Üst Boşluk (px)", {
                        min: 0,
                        placeholder: "Örn: 16",
                        defaultValue: headingDefaultValues.marginTop,
                    }),
                    marginRight: numberInput("Sağ Boşluk (px)", {
                        min: 0,
                        placeholder: "Örn: 0",
                        defaultValue: headingDefaultValues.marginRight,
                    }),
                    marginBottom: numberInput("Alt Boşluk (px)", {
                        min: 0,
                        placeholder: "Örn: 16",
                        defaultValue: headingDefaultValues.marginBottom,
                    }),
                    marginLeft: numberInput("Sol Boşluk (px)", {
                        min: 0,
                        placeholder: "Örn: 8",
                        defaultValue: headingDefaultValues.marginLeft,
                    }),
                },
                render: (props) => _jsx(HeadingBlock, { ...props }),
            },
            RichTextBlock: {
                label: "Metin",
                fields: {
                    content: {
                        type: "custom",
                        render: ({ value, onChange, id }) => {
                            const key = id ?? "richtext";
                            return (_jsx(RichTextEditor, { initialData: value ?? "", onChange: (data) => {
                                    onChange(data);
                                } }, key));
                        },
                    },
                },
                render: ({ content }) => _jsx(RichTextRenderer, { html: content ?? "" }),
            },
            AccordionBlock: {
                label: "Akordeon Listesi",
                fields: {
                    sections: {
                        label: "Bölümler",
                        type: "array",
                        min: 1,
                        defaultItemProps: {
                            title: "Yeni Bölüm",
                        },
                        getItemSummary: (item, index) => item?.title?.trim() || `Bölüm ${typeof index === "number" ? index + 1 : 1}`,
                        arrayFields: {
                            title: {
                                label: "Başlık",
                                type: "text",
                            },
                            content: {
                                label: "İçerik",
                                type: "slot",
                            },
                        },
                    },
                },
                render: ({ sections, puck: { isEditing } }) => {
                    const normalizedSections = (sections ?? []).map((section) => ({
                        title: section?.title ?? "",
                        content: section?.content,
                    }));
                    if (normalizedSections.length < 1) {
                        return _jsx(_Fragment, {});
                    }
                    return _jsx(AccordionBlock, { isEditing: isEditing, sections: normalizedSections });
                },
            },
            SingleAccordion: {
                label: "Tekli Akordeon",
                defaultProps: {
                    defaultOpen: false,
                },
                fields: {
                    title: {
                        label: "Başlık",
                        type: "text",
                    },
                    content: {
                        label: "İçerik",
                        type: "slot",
                    },
                    defaultOpen: {
                        label: "Varsayılan olarak açık",
                        type: "radio",
                        options: [
                            { label: "Evet", value: true },
                            { label: "Hayır", value: false },
                        ],
                    },
                },
                render: ({ title, content: Content, defaultOpen }) => (_jsx(SingleAccordionBlock, { defaultOpen: Boolean(defaultOpen), title: title, children: Content ? _jsx(Content, {}) : null })),
            },
            LinkBar: {
                label: "Bağlantı Listesi",
                fields: {
                    links: {
                        label: "Bağlantılar",
                        type: "custom",
                        render: ({ value, onChange }) => {
                            const items = Array.isArray(value)
                                ? value.map((link) => ({
                                    label: link.label ?? "",
                                    path: link.path ?? "",
                                }))
                                : [];
                            return _jsx(LinkBarClipboardField, { value: items, onChange: (next) => onChange(next) });
                        },
                    },
                },
                render: ({ links }) => _jsx(LinkBarBlock, { links: links ?? [] }),
            },
            ButtonLink: {
                label: "Buton",
                fields: {
                    text: {
                        label: "Buton Metni",
                        type: "custom",
                        render: ({ value, onChange, id }) => _jsx(RichTextEditor, { initialData: value ?? "", onChange: onChange }, id ?? "button-link-text"),
                    },
                    url: {
                        label: "Bağlantı URL'si",
                        type: "text",
                        placeholder: "https://...",
                    },
                    icon: {
                        label: "İkon",
                        type: "custom",
                        render: ({ value, onChange }) => (_jsx("select", { className: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm", value: typeof value === "string" ? value : "link", onChange: (event) => onChange(event.target.value), children: buttonIconOptions.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })),
                    },
                    color: {
                        label: "Arka Plan Rengi",
                        type: "custom",
                        render: ({ value, onChange }) => (_jsx(FormInput, { className: "h-10 cursor-pointer px-2", label: "Arka Plan Rengi", type: "color", value: typeof value === "string" ? value : "#4f46e5", onChange: (event) => onChange(event.target.value) })),
                    },
                    borderRadius: numberInput("Köşe Yarıçapı (px)", {
                        min: 0,
                        placeholder: "Örn: 12",
                    }),
                    openInNewTab: {
                        label: "Yeni sekmede aç",
                        type: "radio",
                        options: [
                            { label: "Evet", value: true },
                            { label: "Hayır", value: false },
                        ],
                    },
                },
                render: ({ text, url, icon, openInNewTab, color, borderRadius }) => {
                    const normalizedHtml = (text ?? "").trim();
                    const IconComponent = buttonIconOptions.find((option) => option.value === icon)?.Icon ?? buttonIconOptions[0].Icon;
                    const backgroundColor = typeof color === "string" && color.trim().length > 0 ? color : "#4f46e5";
                    const radiusValue = typeof borderRadius === "number" && borderRadius >= 0 ? borderRadius : 12;
                    const hasText = normalizedHtml.length > 0;
                    const resolvedHref = url && url.trim().length > 0 ? url.trim() : undefined;
                    const target = openInNewTab ? "_blank" : undefined;
                    const rel = openInNewTab ? "noreferrer noopener" : undefined;
                    if (!hasText && !resolvedHref) {
                        return _jsx(_Fragment, {});
                    }
                    return (_jsxs("a", { className: "inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white", href: resolvedHref, rel: rel, style: {
                            backgroundColor,
                            borderRadius: `${radiusValue}px`,
                        }, target: target, children: [IconComponent ? _jsx(IconComponent, { className: "h-5 w-5" }) : null, hasText ? _jsx(RichTextRenderer, { html: normalizedHtml }) : "Buton"] }));
                },
            },
            SliderBlock: {
                label: "Görsel Kaydırıcı",
                fields: {
                    slides: {
                        label: "Slaytlar",
                        type: "custom",
                        render: ({ value, onChange }) => (_jsx(SlidesField, { ImageField: ImageField, value: Array.isArray(value) ? value : [], onChange: (next) => onChange(next) })),
                    },
                    autoPlay: {
                        label: "Otomatik oynatma",
                        type: "radio",
                        options: [
                            { label: "Evet", value: true },
                            { label: "Hayır", value: false },
                        ],
                    },
                    autoPlayInterval: numberInput("Otomatik oynatma süresi (ms)", {
                        min: 2000,
                        placeholder: "Örn: 6000",
                        defaultValue: 6000,
                    }),
                    imageMode: imageModeToggleField,
                },
                render: ({ slides, autoPlay, autoPlayInterval, imageMode }) => {
                    const normalizedSlides = (slides ?? []).map((slide) => ({
                        imageUrl: slide?.imageUrl ?? "",
                        text: slide?.text ?? "",
                    }));
                    return (_jsx(Slider, { autoPlay: Boolean(autoPlay), autoPlayInterval: typeof autoPlayInterval === "number" && autoPlayInterval > 0 ? autoPlayInterval : 6000, imageMode: imageMode === "contain" ? "contain" : "cover", slides: normalizedSlides }));
                },
            },
            SliderShowcaseBlock: {
                label: "Vitrin Kaydırıcı",
                fields: {
                    slides: {
                        label: "Slaytlar",
                        type: "custom",
                        render: ({ value, onChange }) => (_jsx(SlidesField, { ImageField: ImageField, value: Array.isArray(value) ? value : [], onChange: (next) => onChange(next) })),
                    },
                    autoPlay: {
                        label: "Otomatik oynatma",
                        type: "radio",
                        options: [
                            { label: "Evet", value: true },
                            { label: "Hayır", value: false },
                        ],
                    },
                    autoPlayInterval: numberInput("Otomatik oynatma süresi (ms)", {
                        min: 2000,
                        placeholder: "Örn: 6000",
                        defaultValue: 6000,
                    }),
                    imageMode: imageModeToggleField,
                    desktopHeight: numberInput("Masaüstü Yüksekliği (rem)", {
                        min: 20,
                        step: 0.5,
                        placeholder: "Örn: 50",
                        defaultValue: 50,
                    }),
                    mobileHeight: numberInput("Mobil Yüksekliği (rem)", {
                        min: 20,
                        step: 0.5,
                        placeholder: "Örn: 45",
                        defaultValue: 45,
                    }),
                },
                render: ({ slides, autoPlay, autoPlayInterval, imageMode, desktopHeight, mobileHeight }) => {
                    const normalizedSlides = (slides ?? []).map((slide) => ({
                        imageUrl: slide?.imageUrl ?? "",
                        text: slide?.text ?? "",
                    }));
                    return (_jsx(SliderShowcase, { autoPlay: Boolean(autoPlay), autoPlayInterval: typeof autoPlayInterval === "number" && autoPlayInterval > 0 ? autoPlayInterval : 6000, desktopHeight: typeof desktopHeight === "number" && desktopHeight > 0 ? desktopHeight : undefined, imageMode: imageMode === "contain" ? "contain" : "cover", mobileHeight: typeof mobileHeight === "number" && mobileHeight > 0 ? mobileHeight : undefined, slides: normalizedSlides }));
                },
            },
            YoutubeEmbed: {
                label: "YouTube Video",
                defaultProps: {
                    startSeconds: 0,
                    autoPlay: false,
                    muted: false,
                },
                fields: {
                    url: {
                        label: "YouTube URL'si veya Video ID",
                        type: "text",
                        placeholder: "https://www.youtube.com/watch?v=...",
                    },
                    title: {
                        label: "Başlık",
                        type: "text",
                    },
                    startSeconds: numberInput("Başlangıç Zamanı (sn)", {
                        min: 0,
                        placeholder: "Örn: 30",
                        step: 1,
                    }),
                    autoPlay: {
                        label: "Otomatik oynatma",
                        type: "radio",
                        options: [
                            { label: "Kapalı", value: "off" },
                            { label: "Açık", value: "on" },
                        ],
                    },
                    muted: {
                        label: "Sessiz başlat",
                        type: "radio",
                        options: [
                            { label: "Kapalı", value: "off" },
                            { label: "Açık", value: "on" },
                        ],
                    },
                },
                render: ({ url, title, startSeconds, autoPlay, muted }) => {
                    const normalizedStart = typeof startSeconds === "number" && startSeconds > 0 ? startSeconds : undefined;
                    return _jsx(YoutubeEmbed, { autoPlay: Boolean(autoPlay), muted: Boolean(muted), startSeconds: normalizedStart, title: title, url: url });
                },
            },
            GoogleMapsEmbed: {
                label: "Google Haritası",
                defaultProps: {
                    allowFullScreen: true,
                },
                fields: {
                    url: {
                        label: "Harita URL'si veya Adres",
                        type: "text",
                        placeholder: "https://www.google.com/maps/...",
                    },
                    title: {
                        label: "Başlık",
                        type: "text",
                    },
                    height: numberInput("Harita Yüksekliği (px)", {
                        min: 200,
                        placeholder: "Örn: 450",
                    }),
                    allowFullScreen: {
                        label: "Tam ekran izni",
                        type: "radio",
                        options: [
                            { label: "Evet", value: true },
                            { label: "Hayır", value: false },
                        ],
                    },
                },
                render: ({ url, title, height, allowFullScreen }) => (_jsx(GoogleMapsEmbed, { allowFullScreen: Boolean(allowFullScreen), height: height, title: title, url: url })),
            },
            Gallery: {
                label: "Galeri",
                fields: {
                    items: {
                        label: "Galeri Görselleri",
                        type: "array",
                        min: 1,
                        defaultItemProps: {
                            title: "",
                            date: "",
                            imageUrl: "",
                            size: "1x1",
                            href: "",
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
                            return `Görsel ${position}`;
                        },
                        arrayFields: {
                            title: {
                                label: "Başlık",
                                type: "text",
                            },
                            date: {
                                label: "Tarih",
                                type: "text",
                                placeholder: "2020/02/03",
                            },
                            imageUrl: {
                                label: "Görsel",
                                type: "custom",
                                render: ({ value, onChange }) => _jsx(ImageField, { value: typeof value === "string" ? value : "", onChange: (next) => onChange(next) }),
                            },
                            href: {
                                label: "Bağlantı URL'si",
                                type: "text",
                                placeholder: "https://...",
                            },
                            size: {
                                label: "Grid Boyutu",
                                type: "radio",
                                options: gallerySizeOptions,
                            },
                            imageMode: galleryItemImageModeField,
                        },
                    },
                    gridSize: createButtonToggleField("Grid Sütun Sayısı (lg)", galleryGridColumnsOptions, 3),
                    imageMode: imageModeToggleField,
                    text: {
                        label: "Açıklama",
                        type: "custom",
                        render: ({ value, onChange }) => (_jsx(_Fragment, { children: _jsx("input", { className: "hidden", value: value, onChange: (e) => onChange(e.target.value) }) })),
                    },
                },
                render: ({ text, items, gridSize, imageMode }) => (_jsxs(_Fragment, { children: [_jsx("p", { className: "hidden", children: text }), _jsx(Gallery, { gridSize: isGalleryGridSize(gridSize) ? gridSize : undefined, imageMode: isGalleryImageMode(imageMode) ? imageMode : undefined, items: items })] })),
            },
            SingleImage: {
                label: "Görsel Blok",
                fields: {
                    src: {
                        label: "Görsel",
                        type: "custom",
                        render: ({ value, onChange }) => _jsx(EditorImage, { value: typeof value === "string" ? value : "", onChange: (next) => onChange(next) }),
                    },
                    alt: { type: "text", label: "Alternatif Metin" },
                    height: numberInput("Yükseklik (px)", {
                        min: 100,
                        placeholder: "Örn: 480",
                    }),
                    imageMode: imageModeToggleField,
                    href: {
                        label: "Bağlantı URL'si",
                        type: "text",
                        placeholder: "https://...",
                    },
                },
                render: ({ src, alt, height, imageMode, href }) => {
                    if (!src)
                        return _jsx(_Fragment, {});
                    const resolvedHeight = typeof height === "number" && height > 0 ? height : 480;
                    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
                    const resolvedHref = typeof href === "string" ? href.trim() : "";
                    const hasHref = resolvedHref.length > 0;
                    const imageContent = (_jsx("div", { className: "relative w-full overflow-hidden", style: { minHeight: `${resolvedHeight}px` }, children: _jsx(Image, { fill: true, alt: alt ?? "İlgili Görsel", className: objectFitClass, sizes: "100vw", src: src }) }));
                    if (hasHref) {
                        return (_jsx(Link, { className: "block", href: resolvedHref, children: imageContent }));
                    }
                    return imageContent;
                },
            },
            ImageWithText: {
                label: "Görsel + Metin",
                fields: {
                    src: {
                        label: "Görsel",
                        type: "custom",
                        render: ({ value, onChange }) => _jsx(EditorImage, { value: typeof value === "string" ? value : "", onChange: onChange }),
                    },
                    imagePosition: imagePositionToggleField,
                    stackOrder: stackOrderToggleField,
                    height: numberInput("Görsel Yüksekliği (px)", {
                        min: 150,
                        placeholder: "Örn: 360",
                    }),
                    imageMode: imageModeToggleField,
                    alt: { type: "text", label: "Alternatif Metin" },
                    href: {
                        label: "Bağlantı URL'si",
                        type: "text",
                        placeholder: "https://...",
                    },
                    content: {
                        label: "Metin",
                        type: "custom",
                        render: ({ value, onChange, id }) => _jsx(RichTextEditor, { initialData: value ?? "", onChange: onChange }, id ?? "image-with-text"),
                    },
                },
                render: ({ src, alt, content, imagePosition, stackOrder, height, imageMode, href }) => {
                    if (!src && !content) {
                        return _jsx(_Fragment, {});
                    }
                    const layoutClass = imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row";
                    const mobileOrderClass = stackOrder === "content-first" ? "flex-col-reverse" : "flex-col";
                    const resolvedHeight = typeof height === "number" && height > 0 ? height : 360;
                    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
                    const resolvedHref = typeof href === "string" ? href.trim() : "";
                    const hasHref = resolvedHref.length > 0;
                    const imageNode = src ? (_jsx("div", { className: "relative w-full overflow-hidden", style: { minHeight: `${resolvedHeight}px` }, children: _jsx(Image, { fill: true, alt: alt ?? "İlgili Görsel", className: objectFitClass, sizes: "(max-width: 1024px) 100vw, 50vw", src: src }) })) : null;
                    return (_jsxs("div", { className: `flex ${mobileOrderClass} gap-6 lg:items-center ${layoutClass}`, children: [imageNode ? (hasHref ? (_jsx(Link, { className: "block w-full lg:w-1/2", href: resolvedHref, children: imageNode })) : (_jsx("div", { className: "w-full lg:w-1/2", children: imageNode }))) : null, content && (_jsx("div", { className: "lg:w-1/2", children: _jsx(RichTextRenderer, { html: content }) }))] }));
                },
            },
            ImageWithSlot: {
                label: "Görsel + Boş Alan",
                fields: {
                    src: {
                        label: "Görsel",
                        type: "custom",
                        render: ({ value, onChange }) => _jsx(EditorImage, { value: typeof value === "string" ? value : "", onChange: onChange }),
                    },
                    imagePosition: imagePositionToggleField,
                    stackOrder: stackOrderToggleField,
                    height: numberInput("Görsel Yüksekliği (px)", {
                        min: 150,
                        placeholder: "Örn: 360",
                    }),
                    imageMode: imageModeToggleField,
                    alt: { type: "text", label: "Alternatif Metin" },
                    href: {
                        label: "Bağlantı URL'si",
                        type: "text",
                        placeholder: "https://...",
                    },
                    content: {
                        label: "Boş Alan İçeriği",
                        type: "slot",
                    },
                },
                render: ({ src, alt, content: Content, imagePosition, stackOrder, height, imageMode, href }) => {
                    if (!src && !Content) {
                        return _jsx(_Fragment, {});
                    }
                    const layoutClass = imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row";
                    const mobileOrderClass = stackOrder === "content-first" ? "flex-col-reverse" : "flex-col";
                    const resolvedHeight = typeof height === "number" && height > 0 ? height : 360;
                    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
                    const resolvedHref = typeof href === "string" ? href.trim() : "";
                    const hasHref = resolvedHref.length > 0;
                    const imageNode = src ? (_jsx("div", { className: "relative w-full overflow-hidden", style: { minHeight: `${resolvedHeight}px` }, children: _jsx(Image, { fill: true, alt: alt ?? "İlgili Görsel", className: objectFitClass, sizes: "(max-width: 1024px) 100vw, 50vw", src: src }) })) : null;
                    return (_jsxs("div", { className: `flex ${mobileOrderClass} gap-6 lg:items-center ${layoutClass}`, children: [imageNode ? (hasHref ? (_jsx(Link, { className: "block w-full lg:w-1/2", href: resolvedHref, children: imageNode })) : (_jsx("div", { className: "w-full lg:w-1/2", children: imageNode }))) : null, Content && (_jsx("div", { className: "lg:w-1/2", children: _jsx(Content, {}) }))] }));
                },
            },
            ImageOverlayText: {
                label: "Üst Yazılı Görsel",
                fields: {
                    src: {
                        label: "Görsel",
                        type: "custom",
                        render: ({ value, onChange }) => _jsx(EditorImage, { value: typeof value === "string" ? value : "", onChange: onChange }),
                    },
                    alt: { type: "text", label: "Alternatif Metin" },
                    overlay: {
                        label: "Metin",
                        type: "custom",
                        render: ({ value, onChange, id }) => _jsx(RichTextEditor, { initialData: value ?? "", onChange: onChange }, id ?? "image-overlay"),
                    },
                    height: numberInput("Yükseklik (px)", {
                        min: 200,
                        placeholder: "Örn: 400",
                        defaultValue: 200,
                    }),
                    imageMode: imageModeToggleField,
                    href: {
                        label: "Bağlantı URL'si",
                        type: "text",
                        placeholder: "https://...",
                    },
                },
                render: ({ src, alt, overlay, height, imageMode, href }) => {
                    if (!src) {
                        return _jsx(_Fragment, {});
                    }
                    const resolvedHeight = typeof height === "number" && height > 0 ? height : 420;
                    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
                    const resolvedHref = typeof href === "string" ? href.trim() : "";
                    const hasHref = resolvedHref.length > 0;
                    const imageContent = (_jsxs("div", { className: "relative w-full overflow-hidden", style: { minHeight: `${resolvedHeight}px` }, children: [_jsx(Image, { fill: true, alt: alt ?? "İlgili Görsel", className: objectFitClass, sizes: "100vw", src: src }), overlay && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 p-6 text-center", children: _jsx("div", { className: "max-w-3xl text-white", children: _jsx(RichTextRenderer, { html: overlay }) }) }))] }));
                    if (hasHref) {
                        return (_jsx(Link, { className: "block", href: resolvedHref, children: imageContent }));
                    }
                    return imageContent;
                },
            },
        },
    };
};
//# sourceMappingURL=baseEditorConfig.js.map