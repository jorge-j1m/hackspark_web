import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidSessionId(sessionId: string): boolean {
  const pattern = /^sess_[a-z0-9]{26}$/;
  return pattern.test(sessionId);
}
