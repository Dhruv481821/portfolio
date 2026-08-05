import { motion } from "framer-motion";
import { viewportOnce } from "@/animations/variants";

export function ProgressBar({ level }: { level: number }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]"
      role="progressbar"
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="h-full rounded-full bg-gradient-to-r from-[var(--color-electric)] via-[var(--color-purple)] to-[var(--color-cyan)]"
      />
    </div>
  );
}
