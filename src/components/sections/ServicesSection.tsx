import { motion } from "framer-motion";
import { Component, Layout, Plug, Server, Smartphone, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { SERVICES } from "@/data/profile-data";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  layout: Layout,
  component: Component,
  plug: Plug,
  server: Server,
  smartphone: Smartphone,
  zap: Zap,
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Services"
          title="What I can help you build"
          description="Focused on front-end delivery, with growing backend fundamentals to back it up."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon] ?? Layout;
            return (
              <motion.div key={service.id} variants={fadeUp}>
                <GlassCard className="h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-electric)]/20 to-[var(--color-purple)]/20">
                    <Icon size={20} className="text-[var(--color-cyan)]" />
                  </span>
                  <h3 className="mt-4 font-medium">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {service.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
