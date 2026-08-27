import { motion } from "framer-motion";
import { Database, Layers, Server, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { PROFILE } from "@/constants/profile";
import { STATS } from "@/data/profile-data";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { useCountUp } from "@/hooks/useCountUp";

const STRENGTHS = [
  {
    icon: Database,
    title: "Database-first thinking",
    detail: "Model the schema before writing a single endpoint.",
  },
  {
    icon: Server,
    title: "REST API design",
    detail: "Built a full API in core Java without a framework, so nothing is a black box.",
  },
  {
    icon: Layers,
    title: "Full-stack curiosity",
    detail: "Comfortable moving between MySQL, Java, and React in the same project.",
  },
  {
    icon: Sparkles,
    title: "AI-assisted workflow",
    detail: "Uses tools like Claude deliberately to move faster without losing understanding.",
  },
];

function StatCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref } = useCountUp(value);
  return (
    <GlassCard className="text-center">
      <span className="font-[var(--font-display)] text-3xl font-semibold gradient-text sm:text-4xl">
        {/* The ref'd span wraps only the digits, so the count-up can write to
            its text node without clobbering the suffix. The final value is the
            rendered content; the hook zeroes it before first paint. */}
        <span ref={ref}>{value}</span>
        {suffix}
      </span>
      <p className="mt-2 text-xs font-mono uppercase tracking-wide text-[var(--color-muted)]">
        {label}
      </p>
    </GlassCard>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="About"
          title="Grounded in fundamentals, building in the open"
          description={PROFILE.bio}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {STRENGTHS.map((s) => (
              <motion.div key={s.title} variants={fadeUp}>
                <GlassCard hover={false} className="h-full">
                  <s.icon size={22} className="text-[var(--color-cyan)]" />
                  <h3 className="mt-4 font-medium">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-[var(--color-muted)]">{s.detail}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <StatCard label={stat.label} value={stat.value} suffix={stat.suffix} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
