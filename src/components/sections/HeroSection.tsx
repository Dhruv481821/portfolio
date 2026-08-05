import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { PROFILE } from "@/constants/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { scrollToId } from "@/utils/scroll";
import { SchemaGraphBackground } from "@/components/sections/SchemaGraphBackground";

function useTypewriter(words: readonly string[], typingSpeed = 65, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = window.setTimeout(
        () => {
          setText((prev) =>
            deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
          );
        },
        deleting ? typingSpeed / 2 : typingSpeed
      );
    }
    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, pause]);

  return text;
}

export function HeroSection() {
  const typed = useTypewriter(PROFILE.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <SchemaGraphBackground />

      <div className="section-container relative z-10 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Badge dot>{PROFILE.status}</Badge>
            <Badge>
              <MapPin size={12} className="text-[var(--color-cyan)]" />
              {PROFILE.location}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 font-[var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m <span className="gradient-text">{PROFILE.name}</span>
            <br />
            <span className="text-[var(--color-muted)]">I build things from</span>
            <br />
            the <span className="gradient-text">database up.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 h-8 font-[var(--font-mono)] text-lg text-[var(--color-cyan)] sm:text-xl"
            aria-live="polite"
          >
            {typed}
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 animate-pulse bg-[var(--color-cyan)]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button
              icon={<Download size={16} />}
              iconPosition="left"
              onClick={() => {
                const a = document.createElement("a");
                a.href = PROFILE.resumeUrl;
                a.download = "";
                a.click();
              }}
            >
              Download Resume
            </Button>
            <Button
              variant="secondary"
              icon={<ArrowRight size={16} />}
              onClick={() => scrollToId("#contact")}
            >
              Contact Me
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-square rounded-[2rem] glass p-2 glow-electric">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[var(--color-surface-raised)] to-[var(--color-bg)]">
              <span className="font-[var(--font-display)] text-7xl font-semibold gradient-text">
                DS
              </span>
            </div>
            <motion.div
              className="absolute -right-4 -top-4 rounded-2xl glass px-4 py-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-mono text-[10px] text-[var(--color-muted)]">Coursework</p>
              <p className="text-sm font-medium">DBMS · OS · DSA</p>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 rounded-2xl glass px-4 py-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="font-mono text-[10px] text-[var(--color-muted)]">Building with</p>
              <p className="text-sm font-medium">Java · MySQL · React</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
