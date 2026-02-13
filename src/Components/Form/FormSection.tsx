import { ReactNode } from "react";

import cn from "@/utils/classnames";

type FormSectionProps = {
  title?: ReactNode;
  description?: ReactNode;
  headingAddon?: ReactNode;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};
const baseSectionClasses =
  "border-b border-gray-200 p-5 text-sm dark:border-white/10";

export function FormSection({
  title,
  description,
  headingAddon,
  className,
  contentClassName,
  children,
}: FormSectionProps) {
  const content = contentClassName ? (
    <div className={contentClassName}>{children}</div>
  ) : (
    children
  );

  return (
    <section className={cn(baseSectionClasses, className)}>
      {title || description || headingAddon ? (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title ? (
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            ) : null}
          </div>
          {headingAddon}
        </div>
      ) : null}
      {title || description || headingAddon ? (
        <div className="mt-4">{content}</div>
      ) : (
        content
      )}
    </section>
  );
}
