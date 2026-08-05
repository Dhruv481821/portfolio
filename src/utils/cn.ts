type ClassValue = string | number | null | undefined | false | Record<string, boolean>;

/** Lightweight className combiner — avoids pulling in clsx/tailwind-merge as extra deps. */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) classes.push(key);
      }
    }
  }
  return classes.join(" ");
}
