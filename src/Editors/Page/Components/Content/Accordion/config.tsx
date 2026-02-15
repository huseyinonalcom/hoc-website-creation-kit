import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { Accordion } from "./Component";

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
        // @ts-expect-error We can't set default values for anything other than title
        defaultItemProps: {
          title: "Yeni Bölüm",
        },
        getItemSummary: (item, index) =>
          item?.title?.trim() ||
          `Bölüm ${typeof index === "number" ? index + 1 : 1}`,
        // @ts-expect-error The omitted properties are handled internally in the Accordion component, so we don't need to worry about them here
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
    render: ({ sections, puck: { isEditing } }) => (
      <Accordion sections={sections ?? []} isEditing={isEditing ?? false} />
    ),
  };
