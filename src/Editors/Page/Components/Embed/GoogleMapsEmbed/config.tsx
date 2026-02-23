import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
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
      height: numberInput("Harita Yükseklik Oranı", {
        min: 16,
        placeholder: "Örn: 16",
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
