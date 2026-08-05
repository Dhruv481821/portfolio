import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

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
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3), // snappier ease-out, less "floaty" lag
      smoothWheel: true,
      syncTouch: false, // let touchscreens use native scroll — smoothing feels laggy on touch/trackpad
      touchMultiplier: 1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
