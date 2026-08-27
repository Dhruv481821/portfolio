import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { registerLenis } from "@/lib/lenis";

/**
 * Initializes Lenis smooth scrolling for the app lifetime.
 * Respects prefers-reduced-motion by skipping smoothing entirely.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      /**
       * `lerp` instead of `duration` + `easing`.
       *
       * Duration mode restarts a fixed-length tween on every wheel event, so a
       * burst of scrolling queues up overlapping tweens and the page keeps
       * gliding after your fingers stop — that's the "floaty / laggy" feel.
       * lerp mode instead eases toward a moving target, so it stays glued to
       * the input. 0.12 is responsive without losing the weighted feel.
       */
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false, // let touchscreens use native scroll — smoothing feels laggy on touch
      touchMultiplier: 1,
    });

    registerLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);
}
