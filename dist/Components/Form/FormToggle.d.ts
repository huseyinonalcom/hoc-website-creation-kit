import { FormFieldProps } from "./FormField";
type ToggleSwitchProps = {
    checked: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
};
export declare function ToggleSwitch({ checked, onChange, className, }: ToggleSwitchProps): import("react/jsx-runtime").JSX.Element;
type FormToggleFieldProps = ToggleSwitchProps & Omit<FormFieldProps, "children" | "className" | "htmlFor"> & {
    fieldClassName?: FormFieldProps["className"];
    name?: string;
    trueValue?: string;
    falseValue?: string;
    required?: boolean;
};
export declare function FormToggleField({ label, description, labelAction, fieldClassName, name, trueValue, falseValue, checked, required, ...toggleProps }: FormToggleFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormToggle.d.ts.map