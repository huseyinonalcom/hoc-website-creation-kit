import { TextareaHTMLAttributes } from "react";
import { FormFieldProps } from "./FormField";
export declare const FormTextarea: import("react").ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & import("react").RefAttributes<HTMLTextAreaElement>>;
export declare const FormTextareaField: import("react").ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & Omit<FormFieldProps, "children" | "className" | "htmlFor"> & {
    fieldClassName?: FormFieldProps["className"];
} & import("react").RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=FormTextArea.d.ts.map