import type { BaseComponentProps } from "../../type";

// Editor-side shape: each array item is editable as a text field
export type CombinationLockProps = BaseComponentProps & {
  sequences?: { value?: string }[];
  interval?: number;
  spinDuration?: number;
  cycles?: number;
  scale?: number;
};
