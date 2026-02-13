"use client";

import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { ComponentProps, ComponentType, ReactNode } from "react";

import { Button } from "../../Editors/Page/Components/Actions/ButtonLink/Button";
import { FormTextareaField } from "./FormTextArea";
import { FormSelectField } from "./FormSelect";
import { FormToggleField } from "./FormToggle";
import { FormInputField } from "./FormInput";
import { FormSection } from "./FormSection";
import FormRow from "./FormRow";

type BuiltInFieldComponents =
  | typeof FormInputField
  | typeof FormTextareaField
  | typeof FormSelectField
  | typeof FormToggleField;

type FieldComponentProps = Omit<
  ComponentProps<BuiltInFieldComponents>,
  "ref"
> & {
  id?: string;
};

type FormAction = (payload: FormData) => void | Promise<void>;

export interface GenerateFormLayoutOptions {
  fieldsPerRow?: number;
}

type GeneratedFormStateValue =
  | string
  | number
  | boolean
  | readonly string[]
  | null
  | undefined;

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

export interface GenerateFormSectionConfig extends Omit<
  ComponentProps<typeof FormSection>,
  "children"
> {
  id?: string;
  fields: GenerateFormFieldProps[];
  fieldsPerRow?: number;
}

const chunkFields = <T,>(items: T[]) => {
  const result: T[][] = [];

  for (let index = 0; index < items.length; index += 2) {
    result.push(items.slice(index, index + 2));
  }

  return result;
};

type ResolveStateDrivenPropsArgs = {
  component?: GenerateFormFieldProps["component"];
  fieldProps: GenerateFormFieldProps;
  fieldId?: string;
  state?: GeneratedFormState;
};

type StateDrivenProps =
  | { checked: boolean }
  | { defaultValue: string | number | readonly string[] }
  | undefined;

const hasOwnProperty = (obj: object, key: PropertyKey) =>
  Object.prototype.hasOwnProperty.call(obj, key);

function resolveStateDrivenProps({
  component,
  fieldProps,
  fieldId,
  state,
}: ResolveStateDrivenPropsArgs): StateDrivenProps {
  if (!state) {
    return undefined;
  }

  const fieldName =
    (hasOwnProperty(fieldProps, "name") && typeof fieldProps.name === "string"
      ? fieldProps.name
      : undefined) ?? fieldId;

  if (!fieldName || !hasOwnProperty(state, fieldName)) {
    return undefined;
  }

  const valueFromState = state[fieldName];
  const resolvedComponent = component ?? FormInputField;

  if (resolvedComponent === FormToggleField) {
    if (hasOwnProperty(fieldProps, "checked")) {
      return undefined;
    }

    return { checked: coerceBoolean(valueFromState) };
  }

  if (
    hasOwnProperty(fieldProps, "value") ||
    hasOwnProperty(fieldProps, "defaultValue")
  ) {
    return undefined;
  }

  const defaultValue = coerceDefaultValue(valueFromState);

  if (defaultValue === undefined) {
    return undefined;
  }

  return { defaultValue };
}

function coerceBoolean(value: GeneratedFormStateValue) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true") {
      return true;
    }

    if (normalized === "false") {
      return false;
    }
  }

  return Boolean(value);
}

function coerceDefaultValue(
  value: GeneratedFormStateValue,
): string | number | readonly string[] | undefined {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    Array.isArray(value)
  ) {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return undefined;
}

export default function GeneratedForm({
  fields,
  sections,
  action,
  children,
  pending,
  state,
  successMessage,
}: GenerateFormProps) {
  const sectionsToRender =
    sections ?? (fields && fields.length ? [{ fields }] : []);
  const hiddenFields: GenerateFormFieldProps[] = [];
  const preparedSections = sectionsToRender.map((section) => {
    const visibleFields = section.fields.filter((field) => {
      if (field.hidden) {
        hiddenFields.push(field);
        return false;
      }
      return true;
    });

    return { ...section, fields: visibleFields };
  });

  const renderField = (field: GenerateFormFieldProps, fallbackKey: string) => {
    const {
      component = FormInputField,
      fieldClassName,
      key,
      id,
      ...fieldProps
    } = field;
    const FieldComponent = component as ComponentType<FieldComponentProps>;
    const resolvedKey = key ?? id ?? fieldProps.name ?? fallbackKey;
    const stateDrivenProps = resolveStateDrivenProps({
      component,
      fieldProps,
      fieldId: id,
      state,
    });

    return (
      <FieldComponent
        key={resolvedKey}
        id={id}
        {...(stateDrivenProps ?? {})}
        {...fieldProps}
        fieldClassName={fieldClassName}
      />
    );
  };

  return (
    <form action={action}>
      {preparedSections.map((section, sectionIndex) => {
        const { fields: sectionFields, id, ...sectionProps } = section;
        if (sectionFields.length === 0) {
          return null;
        }
        const rows = chunkFields(sectionFields);

        return (
          <FormSection key={id ?? sectionIndex} {...sectionProps}>
            {rows.map((row, rowIndex) => (
              <FormRow key={`${id ?? sectionIndex}-row-${rowIndex}`}>
                {row.map((field, fieldIndex) =>
                  renderField(field, `${rowIndex}-${fieldIndex}`),
                )}
              </FormRow>
            ))}
          </FormSection>
        );
      })}
      {children}
      <div className="mt-6 flex items-center justify-end gap-x-3">
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        {state?.result === "success" && (
          <p className="text-lg text-green-600">
            {successMessage ?? <CheckCircleIcon color="green" />}
          </p>
        )}
        <Button disabled={pending} type="submit">
          <CheckIcon className="h-5 w-5" />
        </Button>
      </div>
      {hiddenFields.length > 0 && (
        <div aria-hidden="true" className="hidden">
          {hiddenFields.map((field, hiddenIndex) =>
            renderField(field, `hidden-${hiddenIndex}`),
          )}
        </div>
      )}
    </form>
  );
}

type GenerateFormDefaults = Omit<
  GenerateFormProps,
  "fields" | "sections" | "action" | "children"
>;

type CreateFormBlueprint =
  | { fields: GenerateFormFieldProps[]; sections?: never }
  | { sections: GenerateFormSectionConfig[]; fields?: never };

export function createGeneratedForm(
  blueprint: CreateFormBlueprint,
  defaults?: GenerateFormDefaults,
) {
  return function GeneratedFormFactory(
    props: Omit<GenerateFormProps, "fields" | "sections">,
  ) {
    return <GeneratedForm {...defaults} {...blueprint} {...props} />;
  };
}
