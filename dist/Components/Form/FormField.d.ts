import { ReactNode } from "react";
export type FormFieldProps = {
    label?: ReactNode;
    description?: ReactNode;
    labelAction?: ReactNode;
    htmlFor?: string;
    className?: string;
    children: ReactNode;
};
export declare function FormField({ label, description, labelAction, htmlFor, className, children, }: FormFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FormField.d.ts.map