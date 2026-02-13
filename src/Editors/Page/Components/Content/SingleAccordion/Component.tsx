"use client";

import { useEffect, useState } from "react";

import type { SingleAccordionBlockProps } from "./type";

import cn from "../../../../../utils/classnames";

export default function SingleAccordion({ title, children, defaultOpen = false }: SingleAccordionBlockProps) {
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
          <span className="text-base font-semibold text-gray-900">{resolvedTitle}</span>
          <ArrowIcon className={cn("h-5 w-5 text-gray-600 transition-transform", isOpen && "rotate-180")} />
        </button>
        <div className={cn("grid overflow-hidden px-5 transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]")}>
          <div className="min-h-0">{children ? children : <p className="text-sm text-gray-500">Bu bölüm için içerik ekleyin.</p>}</div>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}
