import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * A soft radial glow that follows the cursor, desktop-only.
 *
 * Three changes from the naive version, all of which mattered:
 *
 * 1. No `blur-3xl`. A 64px blur filter on a 400x400 element meant every mouse
 *    move dirtied a large blurred layer that had to be re-rasterized. The
 *    radial-gradient already fades to transparent, so the filter was buying a
 *    softness the gradient provides for free.
 * 2. No CSS `transition-transform duration-300`. That kept the layer animating
 *    for 300ms after every single mousemove event — effectively continuous
 *    compositing while the mouse is in motion. Smoothing is now done by lerping
 *    toward the target inside the existing rAF tick.
 * 3. The listener is passive and coalesced into one rAF write per frame, rather
 *    than one style write per event (which can fire well above 60Hz on
 *    high-polling-rate mice).
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const SIZE = 400;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;
    let idle = false;

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (idle) {
        idle = false;
        rafId = requestAnimationFrame(tick);
      }
    }

    function tick() {
      // Ease toward the cursor. 0.12 matches the scroll lerp so the glow feels
      // like part of the same system.
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      el!.style.transform = `translate3d(${currentX - SIZE / 2}px, ${
        currentY - SIZE / 2
      }px, 0)`;

      // Park the loop once we've caught up, so an idle cursor costs nothing.
      if (Math.abs(targetX - currentX) < 0.5 && Math.abs(targetY - currentY) < 0.5) {
        idle = true;
        return;
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, [isDesktop, prefersReducedMotion]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-[0.10]"
      style={{
        background:
          "radial-gradient(circle closest-side, var(--color-electric) 0%, color-mix(in srgb, var(--color-purple) 70%, transparent) 45%, transparent 100%)",
        willChange: "transform",
      }}
    />
  );
}
