import type { Slot } from "@puckeditor/core";
import type { BaseComponentProps } from "../../type";

export type ThreeColumnLayoutProps = BaseComponentProps & {
  first?: Slot;
  second?: Slot;
  third?: Slot;
  gap?: number;
};
