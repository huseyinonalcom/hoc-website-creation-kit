import type { Slot } from "@puckeditor/core";
import type { ReactNode } from "react";
import type { BaseComponentProps } from "../../type";

export type AccordionSection = {
  title?: string;
  children?: ReactNode;
};

export type AccordionBlockProps = BaseComponentProps & {
  sections?: AccordionSection[];
  isEditing?: boolean;
};

export type AccordionBlockSection = {
  title?: string;
  content?: Slot;
};

export type AccordionBlockData = BaseComponentProps & {
  sections?: AccordionBlockSection[];
};
