import type { Field } from "@puckeditor/core";
import type { FormInputFieldProps } from "../config/types";
type ButtonToggleOption<T extends string | number> = {
    label: string;
    value: T;
};
export type NumberFieldOptions = {
    min?: number;
    placeholder?: string;
    defaultValue?: number;
    step?: number;
};
export declare const createButtonToggleField: <T extends string | number>(label: string, options: ButtonToggleOption<T>[], defaultValue: T) => Field;
export declare const defaultFieldHelpers: {
    FormInput: import("react").FunctionComponent<FormInputFieldProps>;
    numberInput: (label: string, options?: NumberFieldOptions) => Field;
    colorInput: (label: string, defaultValue: string) => Field;
    createButtonToggleField: <T extends string | number>(label: string, options: ButtonToggleOption<T>[], defaultValue: T) => Field;
    imageModeToggleField: Field;
    imagePositionToggleField: Field;
    stackOrderToggleField: Field;
};
export type FieldHelpers = typeof defaultFieldHelpers;
export {};
//# sourceMappingURL=fieldHelpers.d.ts.map