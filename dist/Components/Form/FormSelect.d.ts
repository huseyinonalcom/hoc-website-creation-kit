import { SelectHTMLAttributes } from "react";
import { FormFieldProps } from "./FormField";
export declare const FormSelect: import("react").ForwardRefExoticComponent<SelectHTMLAttributes<HTMLSelectElement> & {
    hideChevron?: boolean;
} & import("react").RefAttributes<HTMLSelectElement>>;
export declare const FormSelectField: import("react").ForwardRefExoticComponent<SelectHTMLAttributes<HTMLSelectElement> & {
    hideChevron?: boolean;
} & Omit<FormFieldProps, "children" | "className" | "htmlFor"> & {
    fieldClassName?: FormFieldProps["className"];
} & import("react").RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=FormSelect.d.ts.map