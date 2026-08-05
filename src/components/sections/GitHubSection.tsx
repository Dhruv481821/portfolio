import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { PROFILE } from "@/constants/profile";
import { PROJECTS } from "@/data/projects";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

const GITHUB_USERNAME = "Dhruv481821";

export function GitHubSection() {
  return (
    <section id="github" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="GitHub"
          title="Where the code actually lives"
          description="Live stats pulled straight from GitHub."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard hover={false} className="overflow-hidden">
            <h3 className="mb-4 text-sm font-mono uppercase tracking-wide text-[var(--color-muted)]">
              Contribution activity
            </h3>
            <div className="overflow-x-auto rounded-xl bg-[var(--color-bg)]/40 p-2">
              <img
                src={`https://ghchart.rshah.org/4c7fff/${GITHUB_USERNAME}`}
                alt={`${PROFILE.name}'s GitHub contribution graph`}
                loading="lazy"
                className="w-full min-w-[600px]"
              />
            </div>
          </GlassCard>

          <GlassCard hover={false}>
            <h3 className="mb-4 text-sm font-mono uppercase tracking-wide text-[var(--color-muted)]">
              Profile stats
            </h3>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=4c7fff&icon_color=22d3ee&text_color=8b93a7`}
              alt={`${PROFILE.name}'s GitHub stats`}
              loading="lazy"
              className="w-full"
            />
          </GlassCard>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-6 grid gap-4 sm:grid-cols-3"
        >
          {PROJECTS.map((p) => (
            <motion.a
              key={p.id}
              variants={fadeUp}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <GlassCard className="h-full">
                <div className="flex items-center gap-2">
                  <FaGithub size={16} className="text-[var(--color-muted)]" />
                  <span className="truncate font-mono text-sm">{p.title}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-[var(--color-muted)]">{p.tagline}</p>
              </GlassCard>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
