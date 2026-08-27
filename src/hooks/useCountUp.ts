import { useLayoutEffect, useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Animates a number from 0 to `end` once the element scrolls into view.
 *
 * Writes directly to the DOM node's text instead of going through React state.
 * The previous version called `setValue` on every animation frame, so four
 * stats counting up together triggered ~330 React renders in 1.4s — and that
 * burst landed exactly as the section scrolled into view, which is the worst
 * possible moment. A count-up is pure presentation, so React never needs to
 * know about the intermediate values.
 *
 * The caller renders the *final* value as the span's JSX content, so the markup
 * is correct without JS. `useLayoutEffect` then zeroes it before the browser
 * paints, which avoids a one-frame flash of the final number.
 */
export function useCountUp(end: number, duration = 1000) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!inView) {
      if (el.firstChild) el.firstChild.nodeValue = "0";
      else el.textContent = "0";
      return;
    }

    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = String(Math.round(eased * end));
      // Update the existing text node rather than replacing it, so React's
      // fiber keeps pointing at a live node if `end` ever becomes dynamic.
      if (el!.firstChild) el!.firstChild.nodeValue = next;
      else el!.textContent = next;
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return { ref };
}
