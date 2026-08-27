import type { Variants } from "framer-motion";

/**
 * Shared easing: a fast-out curve that covers most of its distance early, so
 * the element reads as "settled" well before the tween technically ends.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Timings are deliberately short. Entry animations used to run 0.6s with
 * staggers up to 0.15s, which meant the last card in a six-item grid didn't
 * finish until a full second after it entered the viewport — long enough that
 * scrolling felt like it was waiting on the page. 0.32s with a 0.05s stagger
 * keeps the motion legible while putting content in front of the reader almost
 * immediately.
 *
 * Travel distance dropped from 28px to 10px too. Short distance + short
 * duration reads as a crisp settle; long distance + short duration reads as a
 * jarring snap.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: EASE },
  },
};

export const staggerContainer = (stagger = 0.05, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE } },
};

/**
 * Viewport config for scroll-triggered reveals.
 *
 * `once: true` matters for performance — framer-motion disconnects the
 * IntersectionObserver after the first trigger instead of keeping ~30 of them
 * alive for the life of the page.
 *
 * The old margin shrank the trigger area by 10% of viewport height on both
 * sides. Tightened to 40px at the bottom: the reveal now starts just as the
 * element clears the fold, so a 0.32s animation is finished before the element
 * is comfortably readable rather than playing catch-up behind the scroll.
 */
export const viewportOnce = { once: true, margin: "0px 0px -40px 0px" };
