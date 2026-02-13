import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponents/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { RichTextEditor } from "../../../../Text/Editor.client";
import { ImageOverlayText } from "./Component";

const { imageModeToggleField, numberInput } = defaultFieldHelpers;

export const imageOverlayTextConfig: Config<BaseEditorProps>["components"]["ImageOverlayText"] =
  {
    label: "Üst Yazılı Görsel",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="ImageOverlayText" />,
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
      alt: { type: "text", label: "Alternatif Metin" },
      overlay: {
        label: "Metin",
        type: "custom",
        render: ({ value, onChange, id }) => (
          <RichTextEditor
            key={id ?? "image-overlay"}
            initialData={value ?? ""}
            onChange={onChange}
          />
        ),
      },
      height: numberInput("Yükseklik (px)", {
        min: 200,
        placeholder: "Örn: 400",
        defaultValue: 200,
      }),
      imageMode: imageModeToggleField,
      href: {
        label: "Bağlantı URL'si",
        type: "text",
        placeholder: "https://...",
      },
    },
    render: ImageOverlayText,
  };
