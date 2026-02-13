import type { Slot } from "@puckeditor/core";
import type { ReactNode } from "react";
import type { BaseComponentProps } from "../../type";

export type SingleAccordionBlockProps = BaseComponentProps & {
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
};

export type SingleAccordionProps = BaseComponentProps & {
  title?: string;
  content?: Slot;
  defaultOpen?: boolean;
};
