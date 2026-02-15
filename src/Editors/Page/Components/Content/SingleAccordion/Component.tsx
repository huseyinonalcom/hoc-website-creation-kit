"use client";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import type { SingleAccordionProps } from "./type";

import cn from "../../../../../utils/classnames";

export default function SingleAccordion({
  title,
  content: Content,
  defaultOpen = false,
}: SingleAccordionProps) {
  const [isOpen, setIsOpen] = useState(Boolean(defaultOpen));

  useEffect(() => {
    setIsOpen(Boolean(defaultOpen));
  }, [defaultOpen]);
  const resolvedTitle = title?.trim() || "Bölüm";

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-base font-semibold text-gray-900">
            {resolvedTitle}
          </span>
          <ChevronUpIcon
            className={cn(
              "h-5 w-5 text-gray-600 transition-transform",
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
          <div className="min-h-0">{Content ? <Content /> : <p></p>}</div>
        </div>
      </div>
    </div>
  );
}
