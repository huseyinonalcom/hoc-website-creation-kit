import { ReactNode } from "react";

export default function FormRow({ children }: { children: ReactNode }) {
  return (
    <div className="not-first:mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      {children}
    </div>
  );
}
