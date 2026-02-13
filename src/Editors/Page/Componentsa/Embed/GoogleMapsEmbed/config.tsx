import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import GoogleMapsEmbed from "./Component";

const { numberInput } = defaultFieldHelpers;

export const googleMapsEmbedConfig: Config<BaseEditorProps>["components"]["GoogleMapsEmbed"] =
  {
    label: "Google Haritası",
    defaultProps: {
      allowFullScreen: true,
    },
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="GoogleMapsEmbed" />,
      },
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
    render: GoogleMapsEmbed,
  };
