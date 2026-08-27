import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { TESTIMONIALS } from "@/data/profile-data";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          description="Placeholder content — swap these for real quotes as they come in. Edit src/data/profile-data.ts."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.id} variants={fadeUp}>
              <GlassCard hover={false} className="h-full">
                <Quote size={22} className="text-[var(--color-electric)]" />
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[var(--color-electric)] to-[var(--color-purple)]" />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-[var(--color-muted)]">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
