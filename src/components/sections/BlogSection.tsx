import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { BLOG_POSTS } from "@/data/profile-data";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/variants";
import { cn } from "@/utils/cn";

export function BlogSection() {
  const [activeTag, setActiveTag] = useState("All");
  const tags = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.tag)))];
  const filtered = BLOG_POSTS.filter((p) => activeTag === "All" || p.tag === activeTag);

  return (
    <section id="blog" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Blog"
          title="Notes from building"
          description="Write-ups are on the way — this section is wired up and ready for them."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTag === tag
                  ? "bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-purple)] text-white"
                  : "glass text-[var(--color-muted)] hover:text-[var(--color-text)]"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTag}
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <GlassCard className="flex h-full flex-col">
                <span className="w-fit rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-[var(--color-cyan)]">
                  {post.tag}
                </span>
                <h3 className="mt-4 font-medium leading-snug">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-[var(--color-muted-dim)]">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1 opacity-60">
                    {post.date}
                    <ArrowRight size={12} />
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
