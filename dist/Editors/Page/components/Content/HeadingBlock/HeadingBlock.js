import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HEADING_DECORATION_COLOR_DARK, HEADING_DECORATION_COLOR_LIGHT, HEADING_TEXT_COLOR_DARK, HEADING_TEXT_COLOR_LIGHT, headingDefaultValues, } from "./HeadingBlock.defaults";
const headingAlignmentMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
};
const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];
const MIN_FONT_SIZE = 12;
const DEFAULT_FONT_SIZE = headingDefaultValues.fontSize;
const DEFAULT_FONT_WEIGHT = headingDefaultValues.fontWeight;
const MIN_DECORATION_WIDTH = 12;
const MIN_DECORATION_THICKNESS = 1;
const DEFAULT_DECORATION_WIDTH = headingDefaultValues.decorationWidth;
const DEFAULT_DECORATION_THICKNESS = headingDefaultValues.decorationThickness;
const DEFAULT_DECORATION_SPACING = headingDefaultValues.decorationSpacing;
const normalizeNumber = (value, fallback, min) => {
    if (typeof value !== "number" || Number.isNaN(value)) {
        return fallback;
    }
    const normalized = min !== undefined ? Math.max(value, min) : value;
    return Number.isFinite(normalized) ? normalized : fallback;
};
const resolveColor = (value, fallback) => {
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
export function HeadingBlock({ text, level = headingDefaultValues.level, textAlign = headingDefaultValues.textAlign, fontSize = DEFAULT_FONT_SIZE, fontWeight = DEFAULT_FONT_WEIGHT, italic = headingDefaultValues.italic, textColor, textColorLight = headingDefaultValues.textColorLight, textColorDark = headingDefaultValues.textColorDark, decorationEnabled = headingDefaultValues.decorationEnabled, decorationWidth = DEFAULT_DECORATION_WIDTH, decorationThickness = DEFAULT_DECORATION_THICKNESS, decorationSpacing = DEFAULT_DECORATION_SPACING, decorationColor, decorationColorLight = headingDefaultValues.decorationColorLight, decorationColorDark = headingDefaultValues.decorationColorDark, underlineMode = headingDefaultValues.underlineMode, marginTop = headingDefaultValues.marginTop, marginRight = headingDefaultValues.marginRight, marginBottom = headingDefaultValues.marginBottom, marginLeft = headingDefaultValues.marginLeft, }) {
    const rawText = typeof text === "string" ? text : "";
    const hasText = rawText.trim().length > 0;
    const resolvedLevel = headingLevels.includes(level) ? level : "h2";
    const HeadingTag = resolvedLevel;
    const resolvedFontSize = normalizeNumber(fontSize, DEFAULT_FONT_SIZE, MIN_FONT_SIZE);
    const resolvedFontWeight = normalizeNumber(fontWeight, DEFAULT_FONT_WEIGHT, 100);
    const resolvedTextColorLight = resolveColor(textColorLight ?? textColor, HEADING_TEXT_COLOR_LIGHT);
    const resolvedTextColorDark = resolveColor(textColorDark ?? textColor, HEADING_TEXT_COLOR_DARK);
    const baseDecorationColorLight = decorationColorLight ?? decorationColor ?? resolvedTextColorLight;
    const baseDecorationColorDark = decorationColorDark ?? decorationColor ?? resolvedTextColorDark;
    const resolvedDecorationColorLight = resolveColor(baseDecorationColorLight, HEADING_DECORATION_COLOR_LIGHT);
    const resolvedDecorationColorDark = resolveColor(baseDecorationColorDark, HEADING_DECORATION_COLOR_DARK);
    const resolvedDecorationWidth = normalizeNumber(decorationWidth, DEFAULT_DECORATION_WIDTH, MIN_DECORATION_WIDTH);
    const resolvedDecorationThickness = normalizeNumber(decorationThickness, DEFAULT_DECORATION_THICKNESS, MIN_DECORATION_THICKNESS);
    const resolvedDecorationSpacing = normalizeNumber(decorationSpacing, DEFAULT_DECORATION_SPACING, 0);
    const containerAlign = headingAlignmentMap[textAlign] ?? "flex-start";
    const containerStyle = {
        alignItems: containerAlign,
        "--heading-text-color-light": resolvedTextColorLight,
        "--heading-text-color-dark": resolvedTextColorDark,
        "--heading-decoration-color-light": resolvedDecorationColorLight,
        "--heading-decoration-color-dark": resolvedDecorationColorDark,
    };
    if (!hasText && !decorationEnabled) {
        return _jsx(_Fragment, {});
    }
    const resolvedMargins = {
        marginTop: normalizeNumber(marginTop, headingDefaultValues.marginTop, 0),
        marginRight: normalizeNumber(marginRight, headingDefaultValues.marginRight, 0),
        marginBottom: normalizeNumber(marginBottom, headingDefaultValues.marginBottom, 0),
        marginLeft: normalizeNumber(marginLeft, headingDefaultValues.marginLeft, 0),
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
        borderBottom: decorationEnabled && underlineMode === "inline" ? `${resolvedDecorationThickness}px solid var(--heading-decoration-color-light)` : undefined,
        borderImageSlice: decorationEnabled && underlineMode === "inline" ? 1 : undefined,
    };
    const headingDarkBorderClass = decorationEnabled && underlineMode === "inline" ? "dark:border-[var(--heading-decoration-color-dark)]" : undefined;
    const decorationStyles = {
        alignSelf: containerAlign,
        borderRadius: `0px`,
        height: `${resolvedDecorationThickness}px`,
        marginTop: `${resolvedDecorationSpacing}px`,
        width: `${underlineMode === "inline" ? "100%" : `${resolvedDecorationWidth}px`}`,
    };
    const headingColorClass = "text-[var(--heading-text-color-light)] dark:text-[var(--heading-text-color-dark)]";
    const decorationColorClass = "bg-[var(--heading-decoration-color-light)] dark:bg-[var(--heading-decoration-color-dark)]";
    return (_jsxs("div", { className: "flex flex-col", style: containerStyle, children: [hasText ? (_jsx(HeadingTag, { className: [headingColorClass, headingDarkBorderClass].filter(Boolean).join(" "), style: headingStyles, children: rawText })) : null, decorationEnabled && underlineMode === "separate" ? _jsx("span", { "aria-hidden": "true", className: decorationColorClass, style: decorationStyles }) : null] }));
}
export default HeadingBlock;
//# sourceMappingURL=HeadingBlock.js.map