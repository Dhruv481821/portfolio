import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Card surface used ~19 times across the page.
 *
 * Note `.glass` no longer carries a `backdrop-filter` — see `index.css`. With
 * this many instances on screen, re-blurring each one's backdrop every frame
 * was the single largest scroll cost in the app.
 *
 * Framer Motion drives only `y` here (a composited transform). Border colour
 * and shadow are left to CSS `:hover`, so the two systems aren't both writing
 * paint properties on the same element.
 */
export function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "glass rounded-2xl p-6 transition-[border-color,box-shadow] duration-300",
        hover && "glass-hover hover:shadow-[0_12px_50px_-16px_var(--color-electric)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
