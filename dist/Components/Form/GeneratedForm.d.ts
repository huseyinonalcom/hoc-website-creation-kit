import { ComponentProps, ComponentType, ReactNode } from "react";
import { FormTextareaField } from "./FormTextArea";
import { FormSelectField } from "./FormSelect";
import { FormToggleField } from "./FormToggle";
import { FormInputField } from "./FormInput";
import { FormSection } from "./FormSection";
type BuiltInFieldComponents = typeof FormInputField | typeof FormTextareaField | typeof FormSelectField | typeof FormToggleField;
type FieldComponentProps = Omit<ComponentProps<BuiltInFieldComponents>, "ref"> & {
    id?: string;
};
type FormAction = (payload: FormData) => void | Promise<void>;
export interface GenerateFormLayoutOptions {
    fieldsPerRow?: number;
}
type GeneratedFormStateValue = string | number | boolean | readonly string[] | null | undefined;
export type GeneratedFormState = Record<string, GeneratedFormStateValue>;
export interface GenerateFormProps extends GenerateFormLayoutOptions {
    fields?: GenerateFormFieldProps[];
    sections?: GenerateFormSectionConfig[];
    action: FormAction;
    children?: ReactNode;
    pending?: boolean;
    state?: GeneratedFormState;
    successMessage?: string;
}
export interface GenerateFormFieldProps extends FieldComponentProps {
    component?: ComponentType<FieldComponentProps> | BuiltInFieldComponents;
    key?: string;
    hidden?: boolean;
}
export interface GenerateFormSectionConfig extends Omit<ComponentProps<typeof FormSection>, "children"> {
    id?: string;
    fields: GenerateFormFieldProps[];
    fieldsPerRow?: number;
}
export default function GeneratedForm({ fields, sections, action, children, pending, state, successMessage, }: GenerateFormProps): import("react/jsx-runtime").JSX.Element;
type GenerateFormDefaults = Omit<GenerateFormProps, "fields" | "sections" | "action" | "children">;
type CreateFormBlueprint = {
    fields: GenerateFormFieldProps[];
    sections?: never;
} | {
    sections: GenerateFormSectionConfig[];
    fields?: never;
};
export declare function createGeneratedForm(blueprint: CreateFormBlueprint, defaults?: GenerateFormDefaults): (props: Omit<GenerateFormProps, "fields" | "sections">) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=GeneratedForm.d.ts.map