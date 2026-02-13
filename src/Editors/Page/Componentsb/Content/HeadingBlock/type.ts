import type { CSSProperties } from "react";
import type { BaseComponentProps } from "../../type";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingAlignment = "left" | "center" | "right";

export type HeadingBlockProps = BaseComponentProps & {
  text?: string;
  level?: HeadingLevel;
  textAlign?: HeadingAlignment;
  fontSize?: number;
  fontWeight?: number;
  italic?: boolean;
  textColor?: string;
  textColorLight?: string;
  textColorDark?: string;
  decorationEnabled?: boolean;
  decorationWidth?: number;
  decorationThickness?: number;
  decorationSpacing?: number;
  decorationColor?: string;
  decorationColorLight?: string;
  decorationColorDark?: string;
  underlineMode?: "separate" | "inline";
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  styleClipboard?: unknown;
};

export type HeadingContainerStyle = CSSProperties & {
  "--heading-text-color-light"?: string;
  "--heading-text-color-dark"?: string;
  "--heading-decoration-color-light"?: string;
  "--heading-decoration-color-dark"?: string;
};
