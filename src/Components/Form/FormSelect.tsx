import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { SelectHTMLAttributes, forwardRef } from "react";

import { FormField, FormFieldProps } from "./FormField";
import cn from "../../utils/classnames";

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hideChevron?: boolean;
};

const baseSelectClasses =
  "block w-full appearance-none rounded-md border-0 bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-indigo-500";

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect({ className, hideChevron = false, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={cn(baseSelectClasses, className)}
        />
        {hideChevron ? null : (
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          />
        )}
      </div>
    );
  },
);

type FormSelectFieldProps = FormSelectProps &
  Omit<FormFieldProps, "children" | "className" | "htmlFor"> & {
    fieldClassName?: FormFieldProps["className"];
  };

export const FormSelectField = forwardRef<
  HTMLSelectElement,
  FormSelectFieldProps
>(function FormSelectField(
  {
    label,
    description,
    labelAction,
    fieldClassName = "sm:col-span-3",
    id,
    name,
    ...selectProps
  },
  ref,
) {
  const selectId = id ?? name;
  const selectName = name ?? id;
  const htmlFor = selectId ?? selectName;

  return (
    <FormField
      className={fieldClassName}
      description={description}
      htmlFor={htmlFor}
      label={label}
      labelAction={labelAction}
    >
      <FormSelect {...selectProps} ref={ref} id={selectId} name={selectName} />
    </FormField>
  );
});
