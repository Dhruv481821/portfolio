import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/utils/cn";

export function ProjectsSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built end to end"
          description="Each one started from a schema and a real problem, not a tutorial."
        />

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  category === cat
                    ? "bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-purple)] text-white"
                    : "glass text-[var(--color-muted)] hover:text-[var(--color-text)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search projects"
              className="w-full rounded-full glass py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-[var(--color-muted-dim)] focus-visible:outline-2"
            />
          </div>
        </div>

        <div
          /**
           * No stagger container here: cards self-trigger (see ProjectCard) so
           * that search-filtered cards still reveal when they remount. `query`
           * is deliberately not part of any key — it used to be, which replayed
           * the whole grid's reveal on every keystroke.
           */
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-[var(--color-muted)]">
            No projects match that search yet.
          </p>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
