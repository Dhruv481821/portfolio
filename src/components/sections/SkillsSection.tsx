import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SKILLS } from "@/data/skills";
import type { SkillCategory } from "@/types";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { cn } from "@/utils/cn";

const CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Languages",
  "Databases",
  "Tools",
  "AI Tools",
];

export function SkillsSection() {
  const [active, setActive] = useState<SkillCategory>("Frontend");
  const filtered = SKILLS.filter((s) => s.category === active);

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for"
          description="Levels reflect hands-on project experience, not certifications — I'd rather show you what I've built than claim a number."
        />

        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === cat
                  ? "bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-purple)] text-white"
                  : "glass text-[var(--color-muted)] hover:text-[var(--color-text)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((skill) => (
            <motion.div key={skill.name} variants={fadeUp}>
              <GlassCard hover={false}>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{skill.name}</h3>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {skill.years} yr{skill.years !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="mt-4">
                  <ProgressBar level={skill.level} />
                </div>
                <p className="mt-2 text-right font-mono text-xs text-[var(--color-cyan)]">
                  {skill.level}%
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center text-[var(--color-muted)]"
          >
            More {active} skills coming soon.
          </motion.p>
        )}
      </div>
    </section>
  );
}
