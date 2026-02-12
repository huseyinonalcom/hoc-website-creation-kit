import type { Field } from "@puckeditor/core";

import type { FormInputFieldComponent } from "../config/types";
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

const BaseFormInputField: FormInputFieldComponent = ({ label, className, ...inputProps }: FormInputFieldProps) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
    {label ? <span>{label}</span> : null}
    <input
      {...inputProps}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none ${
        className ?? ""
      }`}
    />
  </label>
);

export const createButtonToggleField = <T extends string | number>(label: string, options: ButtonToggleOption<T>[], defaultValue: T): Field => ({
  label,
  type: "custom",
  render: ({
    value,
    onChange,
  }: {
    value?: T;
    // eslint-disable-next-line no-unused-vars
    onChange: (next: T | undefined) => void;
    field: Field;
    id: string;
    name: string;
  }) => {
    const currentValue = value ?? defaultValue ?? options[0]?.value ?? ("" as T);

    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex gap-3">
          {options.map((option) => (
            <button
              key={option.value}
              className={`rounded border px-4 py-2 text-left text-sm font-medium transition ${
                currentValue === option.value ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 text-gray-600 hover:border-indigo-400"
              }`}
              type="button"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  },
});

const stackOrderToggleField = createButtonToggleField(
  "Mobil Sıralama",
  [
    { label: "Görsel Önce", value: "image-first" },
    { label: "Metin Önce", value: "content-first" },
  ],
  "image-first",
);

const imageModeToggleField = createButtonToggleField(
  "Görsel Modu",
  [
    { label: "Kapla", value: "cover" },
    { label: "Sığdır", value: "contain" },
  ],
  "cover",
);

const imagePositionToggleField = createButtonToggleField(
  "Görsel Konumu",
  [
    { label: "Sol", value: "left" },
    { label: "Sağ", value: "right" },
  ],
  "left",
);

const numberInput = (label: string, options: NumberFieldOptions = {}): Field => ({
  label,
  type: "custom",
  render: ({
    value,
    onChange,
  }: {
    value?: number;
    // eslint-disable-next-line no-unused-vars
    onChange: (next: number | undefined) => void;
    field: Field;
    id: string;
    name: string;
  }) => {
    const displayValue = typeof value === "number" ? value : typeof options.defaultValue === "number" ? options.defaultValue : "";

    return (
      <BaseFormInputField
        label={label}
        min={options.min}
        placeholder={options.placeholder}
        step={options.step}
        type="number"
        value={displayValue}
        onChange={(event) => {
          const rawValue = event.target.value;
          if (rawValue === "") {
            onChange(undefined);
            return;
          }

          const parsedValue = Number(rawValue);
          onChange(Number.isNaN(parsedValue) ? undefined : parsedValue);
        }}
      />
    );
  },
});

const colorInput = (label: string, defaultValue: string): Field => ({
  label,
  type: "custom",
  render: ({
    value,
    onChange,
  }: {
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (next: string | undefined) => void;
    field: Field;
    id: string;
    name: string;
  }) => (
    <BaseFormInputField
      className="h-10 cursor-pointer px-2"
      label={label}
      type="color"
      value={typeof value === "string" && value.trim().length > 0 ? value : defaultValue}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
});

export const defaultFieldHelpers = {
  FormInput: BaseFormInputField,
  numberInput,
  colorInput,
  createButtonToggleField,
  imageModeToggleField,
  imagePositionToggleField,
  stackOrderToggleField,
};

export type FieldHelpers = typeof defaultFieldHelpers;
