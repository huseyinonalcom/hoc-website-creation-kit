import type { HeadingAlignment, HeadingLevel } from "../components/HeadingBlock";
export type HeadingClipboardValue = {
    level: HeadingLevel;
    textAlign: HeadingAlignment;
    fontSize: number;
    fontWeight: number;
    italic: boolean;
    textColor?: string;
    textColorLight: string;
    textColorDark: string;
    decorationEnabled: boolean;
    decorationWidth: number;
    decorationThickness: number;
    decorationSpacing: number;
    decorationColor?: string;
    decorationColorLight: string;
    decorationColorDark: string;
    underlineMode: "separate" | "inline";
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
};
export declare function HeadingClipboardField(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HeadingClipboardField.d.ts.map