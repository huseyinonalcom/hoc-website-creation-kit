import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactElement, ComponentType, ChangeEvent } from 'react';
import { Config, Data, Viewport, Slot } from '@puckeditor/core';
export { Config, Data, Slot } from '@puckeditor/core';

type AccordionSection = {
    title?: string;
    children?: ReactNode;
};
type AccordionBlockProps = {
    sections?: AccordionSection[];
    isEditing?: boolean;
};
declare function AccordionBlock({ sections, isEditing }: AccordionBlockProps): react_jsx_runtime.JSX.Element;

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "subtle";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
};
declare function Button({ variant, className, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
};
declare function ButtonLink({ variant, className, ...props }: ButtonLinkProps): react_jsx_runtime.JSX.Element;

type GalleryBlockItemSize = "1x1" | "2x1" | "1x2" | "2x2";
type GalleryGridSize = 2 | 3 | 4;
type GalleryImageMode = "cover" | "contain";
type GalleryBlockItem = {
    title?: string;
    date?: string;
    imageUrl?: string;
    size?: GalleryBlockItemSize;
    href?: string;
    imageMode?: GalleryImageMode;
};
type GalleryProps = {
    items?: GalleryBlockItem[];
    gridSize?: GalleryGridSize;
    imageMode?: GalleryImageMode;
};
declare function Gallery({ items, gridSize, imageMode }: GalleryProps): react_jsx_runtime.JSX.Element;

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingAlignment = "left" | "center" | "right";
type HeadingBlockProps = {
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
declare function HeadingBlock({ text, level, textAlign, fontSize, fontWeight, italic, textColor, textColorLight, textColorDark, decorationEnabled, decorationWidth, decorationThickness, decorationSpacing, decorationColor, decorationColorLight, decorationColorDark, underlineMode, marginTop, marginRight, marginBottom, marginLeft, }: HeadingBlockProps): ReactElement | null;

declare const HEADING_TEXT_COLOR_LIGHT = "#111827";
declare const HEADING_TEXT_COLOR_DARK = "#f8fafc";
declare const HEADING_DECORATION_COLOR_LIGHT = "#f5c302";
declare const HEADING_DECORATION_COLOR_DARK = "#f5c302";
declare const headingDefaultValues: Required<Pick<HeadingBlockProps, "level" | "textAlign" | "fontSize" | "fontWeight" | "italic" | "textColorLight" | "textColorDark" | "decorationEnabled" | "decorationWidth" | "decorationThickness" | "decorationSpacing" | "decorationColorLight" | "decorationColorDark" | "underlineMode" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft">>;

type LightboxItem = {
    imageUrl: string;
    alt?: string;
    title?: string;
    subtitle?: string;
};
type LightboxProps = {
    items: LightboxItem[];
    activeIndex: number | null;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
};
declare function Lightbox({ items, activeIndex, onClose, onNext, onPrevious }: LightboxProps): react_jsx_runtime.JSX.Element | null;

type LinkBarBlockProps = {
    links?: {
        label?: string;
        path?: string;
    }[];
};
declare function LinkBarBlock({ links }: LinkBarBlockProps): react_jsx_runtime.JSX.Element | null;

type SingleAccordionBlockProps = {
    title?: string;
    children?: ReactNode;
    defaultOpen?: boolean;
};
declare function SingleAccordionBlock({ title, children, defaultOpen }: SingleAccordionBlockProps): react_jsx_runtime.JSX.Element;

type SliderSlideProps = {
    imageUrl: string;
    text?: string;
};
type SliderProps = {
    slides?: SliderSlideProps[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    imageMode?: "cover" | "contain";
};
declare function Slider({ slides, autoPlay, autoPlayInterval, imageMode }: SliderProps): react_jsx_runtime.JSX.Element;

type SliderShowcaseProps = SliderProps & {
    desktopHeight?: number;
    mobileHeight?: number;
};
declare function SliderShowcase({ slides, autoPlay, autoPlayInterval, imageMode, desktopHeight, mobileHeight, }: SliderShowcaseProps): react_jsx_runtime.JSX.Element | null;

declare const RichTextEditor: ({ initialData, onChange, }: {
    initialData: string;
    onChange: (_html: string) => void;
}) => react_jsx_runtime.JSX.Element;

declare function RichTextRenderer({ html }: {
    html: string;
}): react_jsx_runtime.JSX.Element;

declare function PublicRenderer({ config, data, pagePathSegments }: {
    config: Config;
    data: Data;
    pagePathSegments: string[];
}): react_jsx_runtime.JSX.Element;

type PuckEditorHeaderActionsProps = {
    appState: {
        data: Data;
    } & Record<string, unknown>;
    path?: string;
};
type PuckEditorProps = {
    config: Config;
    data: Partial<Data>;
    height?: string;
    path?: string;
    viewports?: Viewport[];
    onPublish?: (_data: Data) => void | Promise<void>;
    renderHeaderActions?: (_props: PuckEditorHeaderActionsProps) => ReactNode;
};
declare function PuckEditor({ config, data, height, path, viewports, onPublish, renderHeaderActions }: PuckEditorProps): react_jsx_runtime.JSX.Element;

type GoogleMapsEmbedProps = {
    url?: string;
    title?: string;
    height?: number;
    allowFullScreen?: boolean;
};
declare const GoogleMapsEmbed: ({ url, title, height, allowFullScreen }: GoogleMapsEmbedProps) => react_jsx_runtime.JSX.Element;

type YoutubeEmbedProps = {
    url?: string;
    title?: string;
    startSeconds?: number;
    autoPlay?: boolean;
    muted?: boolean;
};
declare const YoutubeEmbed: ({ url, title, startSeconds, autoPlay, muted }: YoutubeEmbedProps) => react_jsx_runtime.JSX.Element;

type ClipboardStatus = "idle" | "copied" | "pasted" | "mismatch" | "invalid" | "error" | "unsupported";
type ClipboardFormSectionProps<T> = {
    componentKey: string;
    title: string;
    children?: ReactNode;
    getValue: () => T;
    sanitize: (raw: unknown) => T | null;
    onPaste: (value: T) => void;
    description?: string;
    copyLabel?: string;
    pasteLabel?: string;
    statusMessages?: Partial<Record<Exclude<ClipboardStatus, "idle">, string>>;
};
declare function ClipboardFormSection<T>({ componentKey, title, children, getValue, sanitize, onPaste, description, copyLabel, pasteLabel, statusMessages, }: ClipboardFormSectionProps<T>): react_jsx_runtime.JSX.Element;

type LinkListItem = {
    label: string;
    path: string;
};
declare function LinkListField({ value, onChange, labelPlaceholder, pathPlaceholder, }: {
    value?: LinkListItem[];
    onChange: (next: LinkListItem[]) => void;
    labelPlaceholder?: string;
    pathPlaceholder?: string;
}): react_jsx_runtime.JSX.Element;

type LinkBarClipboardFieldProps = {
    value?: LinkListItem[];
    onChange: (next: LinkListItem[]) => void;
};
declare function LinkBarClipboardField({ value, onChange }: LinkBarClipboardFieldProps): react_jsx_runtime.JSX.Element;

type HeadingClipboardValue = {
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
declare function HeadingClipboardField(): react_jsx_runtime.JSX.Element;

type SlideFormValue = {
    imageUrl?: string;
    text?: string;
};
type ImageFieldProps$1 = {
    value?: string;
    onChange: (next: string) => void;
};
type SlidesFieldProps = {
    value?: SlideFormValue[];
    onChange: (next: SlideFormValue[]) => void;
    ImageField: ComponentType<ImageFieldProps$1>;
};
declare function SlidesField({ value, onChange, ImageField }: SlidesFieldProps): react_jsx_runtime.JSX.Element;

type BaseRootProps = {
    title?: string;
    description?: string;
};
type BaseEditorProps = {
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
type ImageFieldProps = {
    value?: string;
    onChange: (next: string) => void;
};
type ImageFieldComponent = ComponentType<ImageFieldProps>;
type FormInputFieldProps = {
    label?: string;
    className?: string;
    type?: string;
    value?: string | number;
    min?: number;
    step?: number;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
type FormInputFieldComponent = ComponentType<FormInputFieldProps>;
type BaseEditorConfigOptions = {
    ImageField?: ImageFieldComponent;
    FormInputField?: FormInputFieldComponent;
};
declare const createBaseEditorConfig: (options?: BaseEditorConfigOptions) => Config<BaseEditorProps>;

declare const createBaseRendererConfig: (options?: BaseEditorConfigOptions) => Config<BaseEditorProps>;

export { AccordionBlock, type AccordionBlockProps, type AccordionSection, type BaseEditorConfigOptions, type BaseEditorProps, type BaseRootProps, Button, ButtonLink, ClipboardFormSection, type FormInputFieldComponent, type FormInputFieldProps, Gallery, type GalleryBlockItem, type GalleryBlockItemSize, type GalleryGridSize, type GalleryImageMode, GoogleMapsEmbed, HEADING_DECORATION_COLOR_DARK, HEADING_DECORATION_COLOR_LIGHT, HEADING_TEXT_COLOR_DARK, HEADING_TEXT_COLOR_LIGHT, type HeadingAlignment, HeadingBlock, type HeadingBlockProps, HeadingClipboardField, type HeadingClipboardValue, type HeadingLevel, type ImageFieldComponent, type ImageFieldProps, Lightbox, type LightboxItem, LinkBarBlock, type LinkBarBlockProps, LinkBarClipboardField, LinkListField, type LinkListItem, PublicRenderer, PuckEditor, type PuckEditorHeaderActionsProps, type PuckEditorProps, RichTextEditor, RichTextRenderer, SingleAccordionBlock, type SingleAccordionBlockProps, type SlideFormValue, Slider, type SliderProps, SliderShowcase, type SliderSlideProps, SlidesField, YoutubeEmbed, createBaseEditorConfig, createBaseRendererConfig, headingDefaultValues };
