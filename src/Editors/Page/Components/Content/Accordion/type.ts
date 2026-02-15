import { ComponentType } from "react";

import type { BaseComponentProps } from "../../type";

export type AccordionSectionProps = {
  title?: string;
  isOpen: boolean;
  content: ComponentType;
  handleToggle: () => void;
};

export type AccordionProps = BaseComponentProps & {
  sections: AccordionSectionProps[];
  isEditing: boolean;
};
