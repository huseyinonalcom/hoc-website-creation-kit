import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../utilityComponentsa/UniversalClipboard";
import AccordionBlock from "./Component";

export const accordionBlockConfig: Config<BaseEditorProps>["components"]["AccordionBlock"] =
  {
    label: "Akordeon Listesi",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="AccordionBlock" />,
      },
      sections: {
        label: "Bölümler",
        type: "array",
        min: 1,
        defaultItemProps: {
          title: "Yeni Bölüm",
        },
        getItemSummary: (item, index) =>
          item?.title?.trim() ||
          `Bölüm ${typeof index === "number" ? index + 1 : 1}`,
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
    render: AccordionBlock,
  };
