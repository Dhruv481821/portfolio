import { scrollToTarget } from "@/lib/lenis";

/**
 * Scrolls to an anchor. Delegates to Lenis so there is exactly one thing
 * writing the scroll position — see `src/lib/lenis.ts` for why that matters.
 */
export function scrollToId(id: string, offset = 80) {
  scrollToTarget(id, -offset);
}
