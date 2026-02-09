import type { Config, Field, Slot } from "@puckeditor/core";
import type { ChangeEvent, ComponentType } from "react";

import { ArrowDownTrayIcon, BookmarkIcon, CheckCircleIcon, LinkIcon, TrashIcon } from "@heroicons/react/24/outline";

import type { GalleryBlockItem, GalleryBlockItemSize, GalleryGridSize, GalleryImageMode } from "../components/Gallery";
import type { HeadingAlignment, HeadingLevel } from "../components/HeadingBlock";

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
    links?: { label?: string; path?: string }[];
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
    slides?: { imageUrl?: string; text?: string }[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    imageMode?: "cover" | "contain";
  };
  SliderShowcaseBlock: {
    slides?: { imageUrl?: string; text?: string }[];
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
    sections?: { title?: string; content?: Slot }[];
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
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type FormInputFieldComponent = ComponentType<FormInputFieldProps>;

export type BaseEditorConfigOptions = {
  ImageField?: ImageFieldComponent;
  FormInputField?: FormInputFieldComponent;
};

const BaseFormInputField: FormInputFieldComponent = ({ label, className, ...inputProps }) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
    {label ? <span>{label}</span> : null}
    <input
      {...inputProps}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none ${
        className ?? ""
      }`}
    />
  </label>
);

const EmptyImageField: ImageFieldComponent = () => (
  <div className="rounded-md border border-dashed border-gray-300 px-3 py-2 text-xs text-gray-500">Image picker not configured.</div>
);

type ButtonToggleOption<T extends string | number> = {
  label: string;
  value: T;
};

const createButtonToggleField = <T extends string | number>(label: string, options: ButtonToggleOption<T>[], defaultValue: T) => ({
  label,
  type: "custom" as const,
  render: ({
    value,
    onChange,
  }: {
    value?: T;
    // eslint-disable-next-line no-unused-vars
    onChange: (next: T | undefined) => void;
    field: Field;
    id: string;
    name: string;
  }) => {
    const currentValue = value ?? defaultValue ?? options[0]?.value ?? ("" as T);

    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex gap-3">
          {options.map((option) => (
            <button
              key={option.value}
              className={`rounded border px-4 py-2 text-left text-sm font-medium transition ${
                currentValue === option.value ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:border-indigo-400"
              }`}
              type="button"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  },
});

const imageModeToggleField = createButtonToggleField(
  "Görsel Modu",
  [
    { label: "Kapla", value: "cover" },
    { label: "Sığdır", value: "contain" },
  ],
  "cover",
);

type NumberFieldOptions = {
  min?: number;
  placeholder?: string;
  defaultValue?: number;
  step?: number;
};

const createNumberInputField = (FormInput: FormInputFieldComponent, label: string, options: NumberFieldOptions = {}) => ({
  label,
  type: "custom" as const,
  render: ({
    value,
    onChange,
  }: {
    value?: number;
    // eslint-disable-next-line no-unused-vars
    onChange: (next: number | undefined) => void;
    field: Field;
    id: string;
    name: string;
  }) => {
    const displayValue = typeof value === "number" ? value : typeof options.defaultValue === "number" ? options.defaultValue : "";

    return (
      <FormInput
        label={label}
        min={options.min}
        placeholder={options.placeholder}
        step={options.step}
        type="number"
        value={displayValue}
        onChange={(event) => {
          const rawValue = event.target.value;
          if (rawValue === "") {
            onChange(undefined);
            return;
          }

          const parsedValue = Number(rawValue);
          onChange(Number.isNaN(parsedValue) ? undefined : parsedValue);
        }}
      />
    );
  },
});

const createColorInputField = (FormInput: FormInputFieldComponent, label: string, defaultValue: string) => ({
  label,
  type: "custom" as const,
  render: ({
    value,
    onChange,
  }: {
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (next: string | undefined) => void;
    field: Field;
    id: string;
    name: string;
  }) => (
    <FormInput
      className="h-10 cursor-pointer px-2"
      label={label}
      type="color"
      value={typeof value === "string" && value.trim().length > 0 ? value : defaultValue}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
});

const buttonIconOptions = [
  { label: "Bağlantı", value: "link", Icon: LinkIcon },
  { label: "Kaydet", value: "save", Icon: CheckCircleIcon },
  { label: "İndir", value: "download", Icon: ArrowDownTrayIcon },
  { label: "Favori", value: "bookmark", Icon: BookmarkIcon },
  { label: "Sil", value: "trash", Icon: TrashIcon },
] as const;

const headingLevelOptions = [
  { label: "H1", value: "h1" },
  { label: "H2", value: "h2" },
  { label: "H3", value: "h3" },
  { label: "H4", value: "h4" },
  { label: "H5", value: "h5" },
  { label: "H6", value: "h6" },
] as const;

const headingAlignmentOptions = [
  { label: "Sola", value: "left" },
  { label: "Ortala", value: "center" },
  { label: "Sağa", value: "right" },
] as const;

const headingFontWeightOptions = [
  { label: "İnce (300)", value: 300 },
  { label: "Normal (400)", value: 400 },
  { label: "Orta (500)", value: 500 },
  { label: "Yarı Kalın (600)", value: 600 },
  { label: "Kalın (700)", value: 700 },
  { label: "Ekstra (800)", value: 800 },
] as const;

const gallerySizeOptions: { label: string; value: GalleryBlockItemSize }[] = [
  { label: "1 sütun x 1 satır", value: "1x1" },
  { label: "2 sütun x 1 satır", value: "2x1" },
  { label: "1 sütun x 2 satır", value: "1x2" },
  { label: "2 sütun x 2 satır", value: "2x2" },
];

const galleryGridColumnsOptions: {
  label: string;
  value: GalleryGridSize;
}[] = [
  { label: "4 sütun", value: 4 },
  { label: "3 sütun", value: 3 },
  { label: "2 sütun", value: 2 },
];

const isGalleryGridSize = (value: unknown): value is GalleryGridSize => value === 2 || value === 3 || value === 4;

const isGalleryImageMode = (value: unknown): value is GalleryImageMode => value === "cover" || value === "contain";

const galleryItemImageModeField = {
  label: "Görsel Modu (Bu Görsel)",
  type: "custom" as const,
  render: ({
    value,
    onChange,
  }: {
    value?: GalleryImageMode;
    // eslint-disable-next-line no-unused-vars
    onChange: (next: GalleryImageMode | undefined) => void;
    field: Field;
    id: string;
    name: string;
  }) => {
    const currentValue = isGalleryImageMode(value) ? value : undefined;

    const buttonClasses = (isActive: boolean) =>
      `rounded border px-4 py-2 text-left text-sm font-medium transition ${
        isActive ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:border-indigo-400"
      }`;

    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">Görsel Modu (Bu Görsel)</span>
        <div className="flex gap-3">
          {["cover", "contain"].map((mode) => (
            <button key={mode} className={buttonClasses(currentValue === mode)} type="button" onClick={() => onChange(mode as GalleryImageMode)}>
              {mode === "cover" ? "Kapla" : "Sığdır"}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

export const createBaseEditorConfig = (options: BaseEditorConfigOptions = {}): Config<BaseEditorProps> => {
  const FormInput = options.FormInputField ?? BaseFormInputField;
  const ImageField = options.ImageField ?? EmptyImageField;

  const numberInput = (label: string, opts?: NumberFieldOptions) => createNumberInputField(FormInput, label, opts);
  const colorInput = (label: string, defaultValue: string) => createColorInputField(FormInput, label, defaultValue);

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
      content: {
        components: ["HeadingBlock", "RichTextBlock", "AccordionBlock", "SingleAccordion"],
        title: "İçerik",
      },
      media: {
        title: "Görsel",
        components: ["SliderBlock", "SliderShowcaseBlock", "Gallery"],
      },
      actions: {
        components: ["LinkBar", "ButtonLink"],
        title: "Bağlantılar",
      },
      embed: {
        title: "Gömülü İçerik",
        components: ["YoutubeEmbed", "GoogleMapsEmbed"],
      },
    },
    components: {
      HeadingBlock: {
        label: "Başlık",
        defaultProps: {
          ...headingDefaultValues,
        },
        fields: {
          styleClipboard: {
            label: "Stil Kopyalama",
            type: "custom",
            render: () => <HeadingClipboardField />,
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
        render: (props) => <HeadingBlock {...props} />,
      },
      RichTextBlock: {
        label: "Metin",
        fields: {
          content: {
            type: "custom",
            render: ({ value, onChange, id }) => {
              const key = id ?? "richtext";
              return (
                <RichTextEditor
                  key={key}
                  initialData={value ?? ""}
                  onChange={(data) => {
                    onChange(data);
                  }}
                />
              );
            },
          },
        },
        render: ({ content }) => <RichTextRenderer html={content ?? ""} />,
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
            return <></>;
          }

          return <AccordionBlock isEditing={isEditing} sections={normalizedSections} />;
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
        render: ({ title, content: Content, defaultOpen }) => (
          <SingleAccordionBlock defaultOpen={Boolean(defaultOpen)} title={title}>
            {Content ? <Content /> : null}
          </SingleAccordionBlock>
        ),
      },
      LinkBar: {
        label: "Bağlantı Listesi",
        fields: {
          links: {
            label: "Bağlantılar",
            type: "custom",
            render: ({ value, onChange }) => {
              const items = Array.isArray(value)
                ? (value as { label?: string; path?: string }[]).map((link) => ({
                    label: link.label ?? "",
                    path: link.path ?? "",
                  }))
                : [];

              return <LinkBarClipboardField value={items} onChange={(next) => onChange(next)} />;
            },
          },
        },
        render: ({ links }) => <LinkBarBlock links={links ?? []} />,
      },
      ButtonLink: {
        label: "Buton",
        fields: {
          text: {
            label: "Buton Metni",
            type: "custom",
            render: ({ value, onChange, id }) => <RichTextEditor key={id ?? "button-link-text"} initialData={value ?? ""} onChange={onChange} />,
          },
          url: {
            label: "Bağlantı URL'si",
            type: "text",
            placeholder: "https://...",
          },
          icon: {
            label: "İkon",
            type: "custom",
            render: ({ value, onChange }) => (
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={typeof value === "string" ? value : "link"}
                onChange={(event) => onChange(event.target.value)}
              >
                {buttonIconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ),
          },
          color: {
            label: "Arka Plan Rengi",
            type: "custom",
            render: ({ value, onChange }) => (
              <FormInput
                className="h-10 cursor-pointer px-2"
                label="Arka Plan Rengi"
                type="color"
                value={typeof value === "string" ? value : "#4f46e5"}
                onChange={(event) => onChange(event.target.value)}
              />
            ),
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
            return <></>;
          }

          return (
            <a
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white"
              href={resolvedHref}
              rel={rel}
              style={{
                backgroundColor,
                borderRadius: `${radiusValue}px`,
              }}
              target={target}
            >
              {IconComponent ? <IconComponent className="h-5 w-5" /> : null}
              {hasText ? <RichTextRenderer html={normalizedHtml} /> : "Buton"}
            </a>
          );
        },
      },
      SliderBlock: {
        label: "Görsel Kaydırıcı",
        fields: {
          slides: {
            label: "Slaytlar",
            type: "custom",
            render: ({ value, onChange }) => (
              <SlidesField ImageField={ImageField} value={Array.isArray(value) ? value : []} onChange={(next) => onChange(next)} />
            ),
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

          return (
            <Slider
              autoPlay={Boolean(autoPlay)}
              autoPlayInterval={typeof autoPlayInterval === "number" && autoPlayInterval > 0 ? autoPlayInterval : 6000}
              imageMode={imageMode === "contain" ? "contain" : "cover"}
              slides={normalizedSlides}
            />
          );
        },
      },
      SliderShowcaseBlock: {
        label: "Vitrin Kaydırıcı",
        fields: {
          slides: {
            label: "Slaytlar",
            type: "custom",
            render: ({ value, onChange }) => (
              <SlidesField ImageField={ImageField} value={Array.isArray(value) ? value : []} onChange={(next) => onChange(next)} />
            ),
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

          return (
            <SliderShowcase
              autoPlay={Boolean(autoPlay)}
              autoPlayInterval={typeof autoPlayInterval === "number" && autoPlayInterval > 0 ? autoPlayInterval : 6000}
              desktopHeight={typeof desktopHeight === "number" && desktopHeight > 0 ? desktopHeight : undefined}
              imageMode={imageMode === "contain" ? "contain" : "cover"}
              mobileHeight={typeof mobileHeight === "number" && mobileHeight > 0 ? mobileHeight : undefined}
              slides={normalizedSlides}
            />
          );
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

          return <YoutubeEmbed autoPlay={Boolean(autoPlay)} muted={Boolean(muted)} startSeconds={normalizedStart} title={title} url={url} />;
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
        render: ({ url, title, height, allowFullScreen }) => (
          <GoogleMapsEmbed allowFullScreen={Boolean(allowFullScreen)} height={height} title={title} url={url} />
        ),
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
            } satisfies GalleryBlockItem,
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
                render: ({ value, onChange }) => <ImageField value={typeof value === "string" ? value : ""} onChange={(next) => onChange(next)} />,
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
          gridSize: createButtonToggleField<GalleryGridSize>("Grid Sütun Sayısı (lg)", galleryGridColumnsOptions, 3),
          imageMode: imageModeToggleField,
          text: {
            label: "Açıklama",
            type: "custom",
            render: ({ value, onChange }) => (
              <>
                <input className="hidden" value={value} onChange={(e) => onChange(e.target.value)} />
              </>
            ),
          },
        },
        render: ({ text, items, gridSize, imageMode }) => (
          <>
            <p className="hidden">{text}</p>
            <Gallery
              gridSize={isGalleryGridSize(gridSize) ? gridSize : undefined}
              imageMode={isGalleryImageMode(imageMode) ? imageMode : undefined}
              items={items}
            />
          </>
        ),
      },
    },
  };
};
