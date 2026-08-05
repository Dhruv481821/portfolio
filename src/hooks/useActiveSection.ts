import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view using IntersectionObserver,
 * for driving the navbar's active-link indicator.
 */
export function useActiveSection(sectionIds: string[], rootMargin = "-45% 0px -50% 0px") {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.querySelector(id))
      .filter((el): el is Element => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const id = `#${visible[0].target.id}`;
          setActiveId(id);
        }
      },
      { rootMargin, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}
