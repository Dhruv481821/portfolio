import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * A soft radial glow that follows the cursor, desktop-only.
 * Uses direct style mutation (no React state) to avoid re-renders on every mousemove.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, prefersReducedMotion]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-[0.07] blur-3xl transition-transform duration-300 ease-out"
      style={{
        background:
          "radial-gradient(circle, var(--color-electric) 0%, var(--color-purple) 45%, transparent 70%)",
      }}
    />
  );
}
