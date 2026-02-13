import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";
import type { HeadingAlignment, HeadingLevel } from "./type";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { headingDefaultValues } from "./HeadingBlock.defaults";
import HeadingBlock from "./Component";

const headingLevelOptions: { label: string; value: HeadingLevel }[] = [
  { label: "H1", value: "h1" },
  { label: "H2", value: "h2" },
  { label: "H3", value: "h3" },
  { label: "H4", value: "h4" },
  { label: "H5", value: "h5" },
  { label: "H6", value: "h6" },
];

const headingAlignmentOptions: { label: string; value: HeadingAlignment }[] = [
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
] as const;

const { numberInput, colorInput } = defaultFieldHelpers;

export const headingBlockConfig: Config<BaseEditorProps>["components"]["HeadingBlock"] =
  {
    label: "Başlık",
    defaultProps: {
      ...headingDefaultValues,
    },
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="HeadingBlock" />,
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
      textColorLight: colorInput(
        "Metin Rengi (Açık Tema)",
        headingDefaultValues.textColorLight,
      ),
      textColorDark: colorInput(
        "Metin Rengi (Koyu Tema)",
        headingDefaultValues.textColorDark,
      ),
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
      decorationColorLight: colorInput(
        "Alt Çizgi Rengi (Açık Tema)",
        headingDefaultValues.decorationColorLight,
      ),
      decorationColorDark: colorInput(
        "Alt Çizgi Rengi (Koyu Tema)",
        headingDefaultValues.decorationColorDark,
      ),
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
    render: HeadingBlock,
  };
