import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponents/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { RichTextEditor } from "../../../../Text/Editor.client";
import { ImageWithText } from "./Component";

const {
  imageModeToggleField,
  imagePositionToggleField,
  numberInput,
  stackOrderToggleField,
} = defaultFieldHelpers;

export const imageWithTextConfig: Config<BaseEditorProps>["components"]["ImageWithText"] =
  {
    label: "Görsel + Metin",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="ImageWithText" />,
      },
      src: {
        label: "Görsel",
        type: "custom",
        render: ({ value, onChange }) => (
          <EditorImage
            value={typeof value === "string" ? value : ""}
            onChange={onChange}
          />
        ),
      },

      imagePosition: imagePositionToggleField,
      stackOrder: stackOrderToggleField,
      height: numberInput("Görsel Yüksekliği (px)", {
        min: 150,
        placeholder: "Örn: 360",
      }),
      imageMode: imageModeToggleField,
      alt: { type: "text", label: "Alternatif Metin" },
      href: {
        label: "Bağlantı URL'si",
        type: "text",
        placeholder: "https://...",
      },
      content: {
        label: "Metin",
        type: "custom",
        render: ({ value, onChange, id }) => (
          <RichTextEditor
            key={id ?? "image-with-text"}
            initialData={value ?? ""}
            onChange={onChange}
          />
        ),
      },
    },
    render: ImageWithText,
  };
