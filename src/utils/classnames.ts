import { twMerge } from "tailwind-merge";

export default function cn(...classes: (string | undefined | false | null)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}
