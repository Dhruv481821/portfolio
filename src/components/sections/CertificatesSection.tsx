import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Chip } from "@/components/ui/Chip";
import { Modal } from "@/components/ui/Modal";
import { CERTIFICATES } from "@/data/profile-data";
import type { Certificate } from "@/types";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";

export function CertificatesSection() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Certificates"
          title="Learning, formalized"
          description="More are on the way as current courses wrap up."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CERTIFICATES.map((cert) => (
            <motion.button
              key={cert.id}
              variants={fadeUp}
              onClick={() => setSelected(cert)}
              className="text-left"
            >
              <GlassCard className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <Award size={22} className="text-[var(--color-cyan)]" />
                  <span className="font-mono text-xs text-[var(--color-muted)]">{cert.date}</span>
                </div>
                <h3 className="mt-4 font-medium leading-snug">{cert.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{cert.issuer}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((s) => (
                    <Chip key={s} label={s} />
                  ))}
                </div>
              </GlassCard>
            </motion.button>
          ))}

          {/* Placeholder slot signaling more to come */}
          <motion.div variants={fadeUp}>
            <GlassCard hover={false} className="flex h-full flex-col items-center justify-center border-dashed text-center">
              <Award size={22} className="text-[var(--color-muted-dim)]" />
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                More certificates coming as current courses complete.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} labelledBy="cert-modal-title">
        {selected && (
          <div>
            <span className="font-mono text-xs uppercase tracking-wide text-[var(--color-cyan)]">
              Certificate
            </span>
            <h2
              id="cert-modal-title"
              className="mt-2 font-[var(--font-display)] text-2xl font-semibold"
            >
              {selected.title}
            </h2>
            <p className="mt-2 text-[var(--color-muted)]">
              {selected.issuer} · {selected.date}
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {selected.skills.map((s) => (
                <Chip key={s} label={s} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={selected.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-purple)] px-5 py-2.5 text-sm font-medium text-white"
              >
                View certificate
                <ExternalLink size={15} />
              </a>
              {selected.verifyUrl && (
                <a
                  href={selected.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--color-electric)]/60"
                >
                  Verify online
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
