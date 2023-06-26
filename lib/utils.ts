import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

const isEven = (number: number) => number % 2 === 0;

export { cn, isEven };
