import { Slot } from "@puckeditor/core";
import { ReactNode } from "react";
import type { BaseComponentProps } from "../../type";
export type AccordionSectionPropsPuck = {
    title?: string;
    content: Slot;
};
export type AccordionPropsPuck = BaseComponentProps & {
    sections: AccordionSectionPropsPuck[];
};
export type AccordionSectionProps = {
    title?: string;
    content: ReactNode;
    isOpen?: boolean;
    handleToggle?: () => void;
};
export type AccordionProps = {
    sections: AccordionSectionProps[];
    isEditing: boolean;
};
//# sourceMappingURL=type.d.ts.map