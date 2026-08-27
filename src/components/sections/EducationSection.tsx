import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { EDUCATION } from "@/data/profile-data";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

export function EducationSection() {
  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          description="The theory behind the code — DBMS, operating systems, and data structures, alongside a growing set of practical projects."
        />

        <motion.ol
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative space-y-8 border-l border-[var(--color-border)] pl-8"
        >
          {EDUCATION.map((edu) => (
            <motion.li key={edu.id} variants={fadeUp} className="relative">
              <span className="absolute -left-[2.55rem] top-1 flex h-8 w-8 items-center justify-center rounded-full glass">
                <GraduationCap size={15} className="text-[var(--color-cyan)]" />
              </span>
              <GlassCard hover={false}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold">
                    {edu.degree}
                  </h3>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {edu.duration}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{edu.institution}</p>
                <p className="mt-1 text-sm font-medium text-[var(--color-cyan)]">{edu.detail}</p>
                {edu.coursework.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {edu.coursework.map((c) => (
                      <Chip key={c} label={c} />
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
