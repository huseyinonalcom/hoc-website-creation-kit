import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import SingleAccordion from "./Component";

export const singleAccordionConfig: Config<BaseEditorProps>["components"]["SingleAccordion"] =
  {
    label: "Tekli Akordeon",
    defaultProps: {
      defaultOpen: false,
    },
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="SingleAccordion" />,
      },
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
    render: SingleAccordion,
  };
