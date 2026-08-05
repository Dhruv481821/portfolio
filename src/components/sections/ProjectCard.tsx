import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { fadeUp } from "@/animations/variants";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.div variants={fadeUp}>
      <GlassCard className="group flex h-full flex-col overflow-hidden !p-0">
        <button
          onClick={() => onOpen(project)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[var(--color-surface-raised)] to-[var(--color-bg)] text-left"
          aria-label={`Open case study for ${project.title}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-border)] transition-colors duration-300 group-hover:text-[var(--color-electric)]">
              {project.title
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 3)}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-[var(--font-display)] text-lg font-semibold">{project.title}</h3>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="shrink-0 rounded-full p-2 text-[var(--color-muted)] transition-colors hover:bg-white/5 hover:text-[var(--color-text)]"
              >
                <FaGithub size={16} />
              </a>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
          </div>

          <button
            onClick={() => onOpen(project)}
            className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-[var(--color-cyan)] transition-colors hover:text-[var(--color-electric)]"
          >
            View case study
            <ArrowUpRight size={15} />
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
