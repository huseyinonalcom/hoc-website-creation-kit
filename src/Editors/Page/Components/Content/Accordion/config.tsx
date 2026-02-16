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
    render: ({ sections, puck: { isEditing } }) => {
      const normalizedSections = (sections ?? []).map((section) => {
        const Content = section?.content;

        return {
          title: section?.title,
          content: Content ? <Content /> : <></>,
        };
      });

      if (normalizedSections.length < 1) {
        return <></>;
      }

      return <Accordion isEditing={isEditing} sections={normalizedSections} />;
    },
  };
