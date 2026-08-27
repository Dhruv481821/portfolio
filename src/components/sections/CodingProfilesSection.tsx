import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { CODING_PROFILES } from "@/data/profile-data";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  leetcode: SiLeetcode,
  github: FaGithub,
};

export function CodingProfilesSection() {
  return (
    <section id="coding-profiles" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Coding Profiles"
          title="Practicing where it's public"
          description="Active on these platforms today — more will be added as I branch out."
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2"
        >
          {CODING_PROFILES.map((profile) => {
            const Icon = ICONS[profile.icon] ?? FaGithub;
            return (
              <motion.a
                key={profile.platform}
                variants={fadeUp}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <GlassCard className="flex h-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl glass">
                      <Icon size={20} className="text-[var(--color-cyan)]" />
                    </span>
                    <div>
                      <h3 className="font-medium">{profile.platform}</h3>
                      <p className="font-mono text-xs text-[var(--color-muted)]">
                        @{profile.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-[var(--color-muted)]" />
                </GlassCard>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
