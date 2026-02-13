import type { Slot } from "@puckeditor/core";

import type { BaseComponentProps } from "../../type";

export type TwoColumnLayoutProps = BaseComponentProps & {
  left?: Slot;
  right?: Slot;
  gap?: number;
  columnRatio?: "1-2" | "1-1" | "2-1";
};
