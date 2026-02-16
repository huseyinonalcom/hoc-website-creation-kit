import { Slot } from "@puckeditor/core";
import { ReactNode } from "react";

import { BaseComponentProps } from "../../type";

export type SingleAccordionPropsPuck = BaseComponentProps & {
  title?: string;
  content?: Slot;
  defaultOpen?: boolean;
};

export type SingleAccordionProps = {
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
};
