import { forwardRef, TextareaHTMLAttributes } from "react";

import cn from "@/utils/classnames";

import { FormField, FormFieldProps } from "./FormField";
import { baseInputClasses } from "./FormInput";

const baseTextareaClasses = `${baseInputClasses} min-h-24`;

export const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function FormTextarea({ className, rows = 3, ...props }, ref) {
  const handleInput = (e: { target: any }) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <textarea
      ref={ref}
      rows={rows}
      onInput={handleInput}
      {...props}
      className={cn(baseTextareaClasses, className)}
    />
  );
});

type FormTextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<FormFieldProps, "children" | "className" | "htmlFor"> & {
    fieldClassName?: FormFieldProps["className"];
  };

export const FormTextareaField = forwardRef<
  HTMLTextAreaElement,
  FormTextareaFieldProps
>(function FormTextareaField(
  {
    label,
    description,
    labelAction,
    fieldClassName = "sm:col-span-3",
    id,
    name,
    ...textareaProps
  },
  ref,
) {
  const textareaId = id ?? name;
  const textareaName = name ?? id;
  const htmlFor = textareaId ?? textareaName;

  return (
    <FormField
      className={fieldClassName}
      description={description}
      htmlFor={htmlFor}
      label={label}
      labelAction={labelAction}
    >
      <FormTextarea
        {...textareaProps}
        ref={ref}
        id={textareaId}
        name={textareaName}
      />
    </FormField>
  );
});
