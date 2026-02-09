import { ReactNode } from "react";
export type AccordionSection = {
    title?: string;
    children?: ReactNode;
};
export type AccordionBlockProps = {
    sections?: AccordionSection[];
    isEditing?: boolean;
};
export default function AccordionBlock({ sections, isEditing }: AccordionBlockProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AccordionBlock.d.ts.map