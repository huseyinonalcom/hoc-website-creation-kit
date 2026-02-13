import { ReactNode } from "react";

export type FormFieldProps = {
  label?: ReactNode;
  description?: ReactNode;
  labelAction?: ReactNode;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
};

export function FormField({
  label,
  description,
  labelAction,
  htmlFor,
  className,
  children,
}: FormFieldProps) {
  const hasHeader = Boolean(label || labelAction);
  const hasDescription = Boolean(description);

  return (
    <div className={className}>
      {hasHeader ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {label ? (
            <label
              className="text-sm font-medium text-gray-900 dark:text-white"
              htmlFor={htmlFor}
            >
              {label}
            </label>
          ) : (
            <span />
          )}
          {labelAction ? (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {labelAction}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className={hasHeader || hasDescription ? "mt-2" : undefined}>
        {children}
      </div>
      {hasDescription ? (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
