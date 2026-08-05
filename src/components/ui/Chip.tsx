import { cn } from "@/utils/cn";

export function Chip({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-muted)]",
        className
      )}
    >
      {label}
    </span>
  );
}
