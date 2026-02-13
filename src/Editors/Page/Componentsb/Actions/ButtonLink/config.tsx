import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";

import { ButtonLink, buttonIconOptions } from "./Component";
import { RichTextEditor } from "../../../../Text/Editor.client";

const { colorInput, numberInput } = defaultFieldHelpers;

export const buttonLinkConfig: Config<BaseEditorProps>["components"]["ButtonLink"] =
  {
    label: "Buton",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="ButtonLink" />,
      },
      text: {
        label: "Buton Metni",
        type: "custom",
        render: ({ value, onChange, id }) => (
          <RichTextEditor
            key={id ?? "button-link-text"}
            initialData={value ?? ""}
            onChange={onChange}
          />
        ),
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
      color: colorInput("Arka Plan Rengi", "#4f46e5"),
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
    render: ButtonLink,
  };
