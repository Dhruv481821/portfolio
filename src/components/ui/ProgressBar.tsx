import { motion } from "framer-motion";
import { viewportOnce } from "@/animations/variants";

/**
 * Skill level bar.
 *
 * Fills via `scaleX`, not `width`. `width` is a layout property, so the old
 * version forced a full layout + paint on every frame for 1s across 4-5 bars
 * simultaneously — one of the heaviest things on the page. `scaleX` is handed
 * to the compositor and costs effectively nothing.
 *
 * Needs `origin-left` so it grows rightward from the start of the track.
 */
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
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: level / 100 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[var(--color-electric)] via-[var(--color-purple)] to-[var(--color-cyan)]"
      />
    </div>
  );
}
