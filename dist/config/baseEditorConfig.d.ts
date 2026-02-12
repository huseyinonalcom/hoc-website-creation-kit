import type { Config, Slot } from "@puckeditor/core";
import type { ChangeEvent, ComponentType } from "react";
import type { GalleryBlockItem, GalleryGridSize, GalleryImageMode } from "../components/Gallery";
import type { HeadingAlignment, HeadingLevel } from "../components/HeadingBlock";
export type BaseRootProps = {
    title?: string;
    description?: string;
};
export type BaseEditorProps = {
    TwoColumnLayout: {
        left?: Slot;
        right?: Slot;
        gap?: number;
        columnRatio?: "1-2" | "1-1" | "2-1";
    };
    ThreeColumnLayout: {
        first?: Slot;
        second?: Slot;
        third?: Slot;
        gap?: number;
    };
    FourColumnLayout: {
        first?: Slot;
        second?: Slot;
        third?: Slot;
        fourth?: Slot;
        gap?: number;
    };
    VerticalSpacer: {
        height?: number;
    };
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
    SingleImage: {
        src?: string;
        alt?: string;
        height?: number;
        imageMode?: "cover" | "contain";
        href?: string;
    };
    ImageWithText: {
        src?: string;
        alt?: string;
        content?: string;
        imagePosition?: "left" | "right";
        stackOrder?: "image-first" | "content-first";
        height?: number;
        imageMode?: "cover" | "contain";
        href?: string;
    };
    ImageWithSlot: {
        src?: string;
        alt?: string;
        content?: Slot;
        imagePosition?: "left" | "right";
        stackOrder?: "image-first" | "content-first";
        height?: number;
        imageMode?: "cover" | "contain";
        href?: string;
    };
    ImageOverlayText: {
        src?: string;
        alt?: string;
        overlay?: string;
        height?: number;
        imageMode?: "cover" | "contain";
        href?: string;
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
    Gallery: {
        text?: string;
        items?: GalleryBlockItem[];
        gridSize?: GalleryGridSize;
        imageMode?: GalleryImageMode;
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