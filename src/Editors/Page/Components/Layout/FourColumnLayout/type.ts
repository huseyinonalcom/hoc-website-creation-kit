import type { Slot } from "@puckeditor/core";

import type { BaseComponentProps } from "../../type";

export type FourColumnLayoutProps = BaseComponentProps & {
  first?: Slot;
  second?: Slot;
  third?: Slot;
  fourth?: Slot;
  gap?: number;
};
