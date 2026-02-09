import type { Config, Slot } from "@puckeditor/core";
import type { ChangeEvent, ComponentType } from "react";
import type { GalleryBlockItem, GalleryGridSize, GalleryImageMode } from "../components/Gallery";
import type { HeadingAlignment, HeadingLevel } from "../components/HeadingBlock";
export type BaseRootProps = {
    title?: string;
    description?: string;
};
export type BaseEditorProps = {
    HeadingBlock: {
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
    RichTextBlock: {
        content?: string;
    };
    LinkBar: {
        links?: {
            label?: string;
            path?: string;
        }[];
    };
    ButtonLink: {
        text?: string;
        url?: string;
        icon?: string;
        openInNewTab?: boolean;
        color?: string;
        borderRadius?: number;
    };
    SliderBlock: {
        slides?: {
            imageUrl?: string;
            text?: string;
        }[];
        autoPlay?: boolean;
        autoPlayInterval?: number;
        imageMode?: "cover" | "contain";
    };
    SliderShowcaseBlock: {
        slides?: {
            imageUrl?: string;
            text?: string;
        }[];
        autoPlay?: boolean;
        autoPlayInterval?: number;
        imageMode?: "cover" | "contain";
        desktopHeight?: number;
        mobileHeight?: number;
    };
    YoutubeEmbed: {
        url?: string;
        title?: string;
        startSeconds?: number;
        autoPlay?: boolean | "on" | "off";
        muted?: boolean | "on" | "off";
    };
    GoogleMapsEmbed: {
        url?: string;
        title?: string;
        height?: number;
        allowFullScreen?: boolean;
    };
    AccordionBlock: {
        sections?: {
            title?: string;
            content?: Slot;
        }[];
    };
    SingleAccordion: {
        title?: string;
        content?: Slot;
        defaultOpen?: boolean;
    };
    Gallery: {
        text?: string;
        items?: GalleryBlockItem[];
        gridSize?: GalleryGridSize;
        imageMode?: GalleryImageMode;
    };
};
export type ImageFieldProps = {
    value?: string;
    onChange: (next: string) => void;
};
export type ImageFieldComponent = ComponentType<ImageFieldProps>;
export type FormInputFieldProps = {
    label?: string;
    className?: string;
    type?: string;
    value?: string | number;
    min?: number;
    step?: number;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export type FormInputFieldComponent = ComponentType<FormInputFieldProps>;
export type BaseEditorConfigOptions = {
    ImageField?: ImageFieldComponent;
    FormInputField?: FormInputFieldComponent;
};
export declare const createBaseEditorConfig: (options?: BaseEditorConfigOptions) => Config<BaseEditorProps>;
//# sourceMappingURL=baseEditorConfig.d.ts.map