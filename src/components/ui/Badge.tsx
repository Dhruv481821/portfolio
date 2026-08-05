import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Badge({
  children,
  className,
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-mono tracking-wide text-[var(--color-muted)]",
        className
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-cyan)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-cyan)]" />
        </span>
      )}
      {children}
    </span>
  );
}
