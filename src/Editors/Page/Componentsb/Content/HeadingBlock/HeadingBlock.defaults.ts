import type { HeadingBlockProps } from "./type";

export const HEADING_TEXT_COLOR_LIGHT = "#111827";
export const HEADING_TEXT_COLOR_DARK = "#f8fafc";
export const HEADING_DECORATION_COLOR_LIGHT = "#f5c302";
export const HEADING_DECORATION_COLOR_DARK = "#f5c302";

export const headingDefaultValues: Required<
  Pick<
    HeadingBlockProps,
    | "level"
    | "textAlign"
    | "fontSize"
    | "fontWeight"
    | "italic"
    | "textColorLight"
    | "textColorDark"
    | "decorationEnabled"
    | "decorationWidth"
    | "decorationThickness"
    | "decorationSpacing"
    | "decorationColorLight"
    | "decorationColorDark"
    | "underlineMode"
    | "marginTop"
    | "marginRight"
    | "marginBottom"
    | "marginLeft"
  >
> = {
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
  marginLeft: 8,
};
