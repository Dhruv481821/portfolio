import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Modal } from "@/components/ui/Modal";
import { Chip } from "@/components/ui/Chip";
import type { Project } from "@/types";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={!!project} onClose={onClose} labelledBy="project-modal-title">
      {project && (
        <div>
          <span className="font-mono text-xs uppercase tracking-wide text-[var(--color-cyan)]">
            {project.category}
          </span>
          <h2
            id="project-modal-title"
            className="mt-2 font-[var(--font-display)] text-2xl font-semibold sm:text-3xl"
          >
            {project.title}
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">{project.tagline}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wide text-[var(--color-muted)]">
                Problem
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wide text-[var(--color-muted)]">
                Solution
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-mono uppercase tracking-wide text-[var(--color-muted)]">
              Standout features
            </h3>
            <ul className="mt-3 space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-electric)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-mono uppercase tracking-wide text-[var(--color-muted)]">
              Tech stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium transition-colors glass-hover"
              >
                <FaGithub size={16} />
                View code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-purple)] px-5 py-2.5 text-sm font-medium text-white"
              >
                Live demo
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
