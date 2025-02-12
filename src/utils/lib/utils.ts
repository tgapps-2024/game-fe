import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatValue = (value: number): string => {
  const suffixes = ["", "k", "M", "B", "T", "P", "E"];
  let index = 0;

  while (value >= 1000 && index < suffixes.length - 1) {
    value /= 1000;
    index++;
  }

  return value.toFixed(0) + suffixes[index];
};
