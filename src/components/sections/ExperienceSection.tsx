import { motion } from "framer-motion";
import { Code2, Trophy, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ACHIEVEMENTS } from "@/data/profile-data";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

const MILESTONES = [
  {
    icon: Code2,
    title: "Self-directed project building",
    org: "Independent",
    date: "Ongoing",
    detail:
      "Built three full-stack projects from scratch — an internship tracker, a mood tracker, and a learning-roadmap platform — to apply DBMS and API design theory to real, working software.",
  },
  ...ACHIEVEMENTS.map((a) => ({
    icon: Trophy,
    title: a.title,
    org: a.org,
    date: a.date,
    detail: a.detail,
  })),
  {
    icon: Users,
    title: "Open to Software Developer Internships",
    org: "Currently searching",
    date: "Now",
    detail:
      "Looking for a role to apply Java, REST API design, and MySQL fundamentals to real production problems alongside an engineering team.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Experience"
          title="Early, self-directed, and moving fast"
          description="No formal internship yet — this is the track record of getting there: shipped projects, a hackathon, and a clear target."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-3"
        >
          {MILESTONES.map((m) => (
            <motion.div key={m.title} variants={fadeUp}>
              <GlassCard className="h-full">
                <m.icon size={22} className="text-[var(--color-cyan)]" />
                <h3 className="mt-4 font-medium leading-snug">{m.title}</h3>
                <p className="mt-1 text-xs font-mono text-[var(--color-muted)]">
                  {m.org} · {m.date}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                  {m.detail}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
