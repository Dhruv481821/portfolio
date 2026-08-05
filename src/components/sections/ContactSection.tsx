import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { PROFILE } from "@/constants/profile";
import { SOCIAL_LINKS } from "@/constants/navigation";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", message: "" };

function validate(values: FormState) {
  const errors: Partial<FormState> = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export function ContactSection() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // eslint-disable-next-line no-console
      console.warn(
        "EmailJS environment variables are not set. See README.md > EmailJS Setup."
      );
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        { publicKey }
      );
      setStatus("sent");
      setValues(initialState);
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
        console.error("EmailJS Error:", error);
        setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Open to Software Developer Internship opportunities — reach out and I'll get back to you."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <GlassCard hover={false} className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl glass">
                <Mail size={18} className="text-[var(--color-cyan)]" />
              </span>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Email</p>
                <a href={`mailto:${PROFILE.email}`} className="text-sm font-medium hover:text-[var(--color-electric)]">
                  {PROFILE.email}
                </a>
              </div>
            </GlassCard>
            <GlassCard hover={false} className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl glass">
                <Phone size={18} className="text-[var(--color-cyan)]" />
              </span>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Phone</p>
                <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="text-sm font-medium hover:text-[var(--color-electric)]">
                  {PROFILE.phone}
                </a>
              </div>
            </GlassCard>
            <GlassCard hover={false} className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl glass">
                <MapPin size={18} className="text-[var(--color-cyan)]" />
              </span>
              <div>
                <p className="text-xs text-[var(--color-muted)]">Location</p>
                <p className="text-sm font-medium">{PROFILE.location}</p>
              </div>
            </GlassCard>

            <div className="flex gap-2 pt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-full glass p-3 text-[var(--color-muted)] transition-colors hover:text-[var(--color-electric)]"
                >
                  <span className="text-xs font-mono">{s.label[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <GlassCard hover={false} className="relative">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-[var(--color-muted)]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 px-4 py-3 text-sm outline-none transition-colors focus-visible:border-[var(--color-electric)]"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-[var(--color-muted)]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 px-4 py-3 text-sm outline-none transition-colors focus-visible:border-[var(--color-electric)]"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-[var(--color-muted)]">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 px-4 py-3 text-sm outline-none transition-colors focus-visible:border-[var(--color-electric)]"
                  placeholder="Tell me about the role or project..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                icon={<Send size={16} />}
                className="w-full"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>

              {status === "error" && (
                <p className="text-center text-xs text-red-400">
                  Something went wrong — email {PROFILE.email} directly, or check EmailJS setup in README.md.
                </p>
              )}
            </form>

            <AnimatePresence>
              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[var(--color-surface)]/95 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle2 size={48} className="text-[var(--color-cyan)]" />
                  </motion.div>
                  <p className="mt-4 font-medium">Message sent!</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    I'll get back to you soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
