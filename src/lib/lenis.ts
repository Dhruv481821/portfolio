import type Lenis from "@studio-freight/lenis";

/**
 * Module-level handle on the single Lenis instance created by `useLenis`.
 *
 * Anything that needs to move or freeze the scroll position must go through
 * here. Calling `window.scrollTo({ behavior: "smooth" })` or relying on CSS
 * `scroll-behavior` while Lenis is running means two systems write to
 * `scrollTop` on the same frame, and the result is the stutter that looks like
 * "the page fights me when I click a nav link".
 */
let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Smooth-scrolls to a selector. Falls back to native scrolling when Lenis
 * isn't running — which is the case under `prefers-reduced-motion`, where the
 * jump should be instant anyway.
 */
export function scrollToTarget(selector: string, offset = -80) {
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(selector, { offset });
    return;
  }

  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "auto" });
}

/** Freezes smooth scrolling — used while a modal owns the viewport. */
export function stopLenis() {
  getLenis()?.stop();
}

/** Resumes smooth scrolling. */
export function startLenis() {
  getLenis()?.start();
}
