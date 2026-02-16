import type { Config } from "@puckeditor/core";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import cn from "../../../../../utils/classnames";
import { AccordionSectionProps } from "./type";

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

function AccordionSection({
  title,
  content: Content,
  isOpen,
  handleToggle,
}: AccordionSectionProps) {
  return (
    <div className={cn("border-b-2 border-gray-500 *:last:border-b-0")}>
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        type="button"
        onClick={handleToggle}
      >
        <span className="text-base font-bold">{title}</span>
        <ChevronUpIcon
          className={cn(
            "h-5 w-5 transition-transform",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden px-5 transition-[grid-template-rows] duration-300",
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          {Content ? <Content /> : <p className="text-sm"></p>}
        </div>
      </div>
    </div>
  );
}

function Accordion({
  sections,
  isEditing,
}: {
  sections: AccordionSectionProps[];
  isEditing: boolean;
}) {
  const sanitizedSections = sections.filter(
    (section: AccordionSectionProps): section is AccordionSectionProps =>
      Boolean(section),
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!sanitizedSections.length) {
    return <></>;
  }

  return (
    <div className="w-full overflow-hidden">
      {sanitizedSections.map(
        (section: AccordionSectionProps, index: number) => {
          const isOpen = openIndex === index || isEditing;
          const title = section.title?.trim() || `Bölüm ${index + 1}`;
          return (
            <AccordionSection
              key={`accordion-section-${index}-${title}`}
              title={title}
              content={section.content}
              isOpen={isOpen || isEditing}
              handleToggle={() => handleToggle(index)}
            />
          );
        },
      )}
    </div>
  );
}
