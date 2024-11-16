import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildUrl(
  baseUrl: string,
  path: string,
  params: Record<string, string | number> = {},
): string {
  const url = new URL(path, baseUrl);

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, String(params[key])),
  );

  return url.toString();
}
