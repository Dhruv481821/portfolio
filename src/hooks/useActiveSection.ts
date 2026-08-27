import { useEffect, useMemo, useState } from "react";

/**
 * Tracks which section is currently in view, for the navbar's active-link pill.
 */
export function useActiveSection(sectionIds: string[], rootMargin = "-45% 0px -50% 0px") {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  /**
   * Callers pass a freshly-mapped array (`NAV_LINKS.map(l => l.href)`), so its
   * identity changed on every render. With that array in the effect's deps, the
   * IntersectionObserver was being torn down and rebuilt — re-running 9
   * `querySelector` calls and 9 `observe` calls — every time the navbar
   * re-rendered, which includes every time the active section changed. That is
   * a self-feeding loop that does forced layout work mid-scroll.
   *
   * Keying on the joined string makes the dependency stable by value.
   */
  const key = sectionIds.join(",");
  const ids = useMemo(() => key.split(",").filter(Boolean), [key]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the band rather than whichever
        // happens to be first in the callback array — with several sections
        // intersecting at once the old version could flip-flop between them.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const next = visible[0];
        if (next) setActiveId(`#${next.target.id}`);
      },
      { rootMargin, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
