import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/animations/variants";
import { cn } from "@/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("mb-12 md:mb-16 max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-cyan)] uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[var(--color-muted)] text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
