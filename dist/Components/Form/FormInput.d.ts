import { InputHTMLAttributes } from "react";
import { FormFieldProps } from "./FormField";
export declare const baseInputClasses = "w-full block rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500";
export declare const FormInput: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & import("react").RefAttributes<HTMLInputElement>>;
export declare const FormInputField: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & Omit<FormFieldProps, "children" | "className" | "htmlFor"> & {
    fieldClassName?: FormFieldProps["className"];
} & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=FormInput.d.ts.map