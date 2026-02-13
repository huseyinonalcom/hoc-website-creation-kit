import { VerticalSpacerProps } from "./type";

export const VerticalSpacer = ({ height }: VerticalSpacerProps) => {
  const resolvedHeight = typeof height === "number" && height > 0 ? height : 32;

  return <div aria-hidden="true" className="w-full" style={{ height: `${resolvedHeight}px` }} />;
};
