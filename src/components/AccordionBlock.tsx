"use client";

import { ReactNode, useMemo, useState } from "react";

import cn from "../utils/classnames";

export type AccordionSection = {
  title?: string;
  children?: ReactNode;
};

export type AccordionBlockProps = {
  sections?: AccordionSection[];
  isEditing?: boolean;
};

export default function AccordionBlock({
  sections = [],
  isEditing = false,
}: AccordionBlockProps) {
  const sanitizedSections = useMemo(() => {
    return sections.filter((section): section is AccordionSection =>
      Boolean(section),
    );
  }, [sections]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!sanitizedSections.length) {
    return <></>;
  }

  return (
    <div className="w-full overflow-hidden">
      {sanitizedSections.map((section, index) => {
        const isOpen = openIndex === index || isEditing;
        const title = section.title?.trim() || `Bölüm ${index + 1}`;
        return (
          <div
            key={`accordion-section-${index}-${title}`}
            className={cn("border-b-2 border-gray-500 *:last:border-b-0")}
          >
            <button
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              type="button"
              onClick={() => handleToggle(index)}
            >
              <span className="text-base font-bold">{title}</span>
              <ArrowIcon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isOpen && "rotate-180",
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
                {section.children ? (
                  section.children
                ) : (
                  <p className="text-sm"></p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
