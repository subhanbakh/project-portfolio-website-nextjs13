import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export const isEven = (number: number) => number % 2 === 0;

export const validateString = (data: unknown, maxLength: number) => {
  if (!data || typeof data !== "string" || data.length > maxLength) {
    return false;
  }
  return true;
};

export const getErrorMessage = (e: unknown): string => {
  let message: string;

  if (e instanceof Error) {
    message = e.message;
  } else if (e && typeof e === "object" && "message" in e) {
    message = String(e.message);
  } else if (typeof e === "string") {
    message = e;
  } else {
    message = "Something went wrong";
  }

  return message;
};
