import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

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
      whileHover={hover ? { y: -6, borderColor: "var(--color-electric)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "glass rounded-2xl p-6 transition-[border-color,box-shadow] duration-300",
        hover && "hover:shadow-[0_12px_50px_-16px_var(--color-electric)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
