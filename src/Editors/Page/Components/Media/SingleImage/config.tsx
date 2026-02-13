import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponents/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { SingleImage } from "./Component";

const { imageModeToggleField, numberInput } = defaultFieldHelpers;

export const singleImageConfig: Config<BaseEditorProps>["components"]["SingleImage"] =
  {
    label: "Görsel Blok",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="SingleImage" />,
      },
      src: {
        label: "Görsel",
        type: "custom",
        render: ({ value, onChange }) => (
          <EditorImage
            value={typeof value === "string" ? value : ""}
            onChange={(next) => onChange(next)}
          />
        ),
      },
      alt: { type: "text", label: "Alternatif Metin" },
      height: numberInput("Yükseklik (px)", {
        min: 100,
        placeholder: "Örn: 480",
      }),
      imageMode: imageModeToggleField,
      href: {
        label: "Bağlantı URL'si",
        type: "text",
        placeholder: "https://...",
      },
    },
    render: SingleImage,
  };
