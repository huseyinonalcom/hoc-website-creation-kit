"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createUsePuck } from "@puckeditor/core";
import { useMemo } from "react";
import { headingDefaultValues } from "../components/HeadingBlock.defaults";
import { ClipboardFormSection } from "./ClipboardFormSection";
const usePuckStore = createUsePuck();
const COMPONENT_KEY = "HeadingBlock.styles";
const HEADING_LEVELS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
const HEADING_ALIGNMENTS = new Set(["left", "center", "right"]);
const UNDERLINE_MODES = new Set(["inline", "separate"]);
const sanitizeNumber = (value, fallback) => {
    return typeof value === "number" && Number.isFinite(value) ? value : fallback;
};
const sanitizeBoolean = (value, fallback) => {
    return typeof value === "boolean" ? value : fallback;
};
const sanitizeColor = (value) => {
    if (typeof value !== "string") {
        return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
};
const sanitizeHeadingClipboardValue = (raw) => {
    if (!raw || typeof raw !== "object") {
        return null;
    }
    const value = raw;
    return {
        level: HEADING_LEVELS.has(value.level) ? value.level : headingDefaultValues.level,
        textAlign: HEADING_ALIGNMENTS.has(value.textAlign) ? value.textAlign : headingDefaultValues.textAlign,
        fontSize: sanitizeNumber(value.fontSize, headingDefaultValues.fontSize),
        fontWeight: sanitizeNumber(value.fontWeight, headingDefaultValues.fontWeight),
        italic: sanitizeBoolean(value.italic, headingDefaultValues.italic),
        textColor: sanitizeColor(value.textColor),
        textColorLight: sanitizeColor(value.textColorLight) ?? headingDefaultValues.textColorLight,
        textColorDark: sanitizeColor(value.textColorDark) ?? headingDefaultValues.textColorDark,
        decorationEnabled: sanitizeBoolean(value.decorationEnabled, headingDefaultValues.decorationEnabled),
        decorationWidth: sanitizeNumber(value.decorationWidth, headingDefaultValues.decorationWidth),
        decorationThickness: sanitizeNumber(value.decorationThickness, headingDefaultValues.decorationThickness),
        decorationSpacing: sanitizeNumber(value.decorationSpacing, headingDefaultValues.decorationSpacing),
        decorationColor: sanitizeColor(value.decorationColor),
        decorationColorLight: sanitizeColor(value.decorationColorLight) ?? headingDefaultValues.decorationColorLight,
        decorationColorDark: sanitizeColor(value.decorationColorDark) ?? headingDefaultValues.decorationColorDark,
        underlineMode: UNDERLINE_MODES.has(value.underlineMode)
            ? value.underlineMode
            : headingDefaultValues.underlineMode,
        marginTop: sanitizeNumber(value.marginTop, headingDefaultValues.marginTop),
        marginRight: sanitizeNumber(value.marginRight, headingDefaultValues.marginRight),
        marginBottom: sanitizeNumber(value.marginBottom, headingDefaultValues.marginBottom),
        marginLeft: sanitizeNumber(value.marginLeft, headingDefaultValues.marginLeft),
    };
};
const defaultClipboardValue = sanitizeHeadingClipboardValue(headingDefaultValues) ?? {
    level: headingDefaultValues.level,
    textAlign: headingDefaultValues.textAlign,
    fontSize: headingDefaultValues.fontSize,
    fontWeight: headingDefaultValues.fontWeight,
    italic: headingDefaultValues.italic,
    textColor: undefined,
    textColorLight: headingDefaultValues.textColorLight,
    textColorDark: headingDefaultValues.textColorDark,
    decorationEnabled: headingDefaultValues.decorationEnabled,
    decorationWidth: headingDefaultValues.decorationWidth,
    decorationThickness: headingDefaultValues.decorationThickness,
    decorationSpacing: headingDefaultValues.decorationSpacing,
    decorationColor: undefined,
    decorationColorLight: headingDefaultValues.decorationColorLight,
    decorationColorDark: headingDefaultValues.decorationColorDark,
    underlineMode: headingDefaultValues.underlineMode,
    marginTop: headingDefaultValues.marginTop,
    marginRight: headingDefaultValues.marginRight,
    marginBottom: headingDefaultValues.marginBottom,
    marginLeft: headingDefaultValues.marginLeft,
};
export function HeadingClipboardField() {
    const selectedHeading = usePuckStore((state) => {
        if (state.selectedItem?.type === "HeadingBlock") {
            return state.selectedItem;
        }
        return null;
    });
    const dispatch = usePuckStore((state) => state.dispatch);
    const getSelectorForId = usePuckStore((state) => state.getSelectorForId);
    const clipboardValue = useMemo(() => {
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
                        ...value,
                    },
                });
                if (selector.zone && previous.zones?.[selector.zone]) {
                    const zoneItems = previous.zones[selector.zone];
                    const updatedZone = zoneItems.map((item, index) => (index === selector.index ? updateItemProps(item) : item));
                    return {
                        zones: {
                            ...previous.zones,
                            [selector.zone]: updatedZone,
                        },
                    };
                }
                const updatedContent = previous.content.map((item, index) => index === selector.index ? updateItemProps(item) : item);
                return {
                    content: updatedContent,
                };
            },
        });
    };
    return (_jsx(ClipboardFormSection, { componentKey: COMPONENT_KEY, statusMessages: {
            copied: "Başlık stilleri panoya kopyalandı.",
            pasted: "Başlık stilleri başarıyla yapıştırıldı.",
            mismatch: "Pano içeriği Başlık ile eşleşmiyor.",
            invalid: "Pano içeriği geçersiz.",
        }, title: "Ba\u015Fl\u0131k Stilleri", getValue: () => clipboardValue, onPaste: handlePaste, sanitize: sanitizeHeadingClipboardValue }));
}
//# sourceMappingURL=HeadingClipboardField.js.map