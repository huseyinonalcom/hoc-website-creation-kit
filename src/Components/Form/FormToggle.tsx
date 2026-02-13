import cn from "@/utils/classnames";

import { FormField, FormFieldProps } from "./FormField";

type ToggleSwitchProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export function ToggleSwitch({
  checked,
  onChange,
  className,
}: ToggleSwitchProps) {
  return (
    <button
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700",
        className,
      )}
      type="button"
      onClick={() => onChange?.(!checked)}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

type FormToggleFieldProps = ToggleSwitchProps &
  Omit<FormFieldProps, "children" | "className" | "htmlFor"> & {
    fieldClassName?: FormFieldProps["className"];
    name?: string;
    trueValue?: string;
    falseValue?: string;
    required?: boolean;
  };

export function FormToggleField({
  label,
  description,
  labelAction,
  fieldClassName = "sm:col-span-3",
  name,
  trueValue = "true",
  falseValue = "false",
  checked,
  required,
  ...toggleProps
}: FormToggleFieldProps) {
  return (
    <FormField
      className={fieldClassName}
      description={description}
      label={label}
      labelAction={labelAction}
    >
      {name ? (
        <input
          name={name}
          required={required}
          type="hidden"
          value={checked ? trueValue : falseValue}
        />
      ) : null}
      <ToggleSwitch checked={checked} {...toggleProps} />
    </FormField>
  );
}
