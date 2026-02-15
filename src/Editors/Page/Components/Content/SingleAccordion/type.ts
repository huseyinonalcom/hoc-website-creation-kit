import type { ComponentType } from "react";

import type { BaseComponentProps } from "../../type";

export type SingleAccordionProps = BaseComponentProps & {
  title?: string;
  content?: ComponentType;
  defaultOpen?: boolean;
};
