import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PROFILE } from "@/constants/profile";
import { NAV_LINKS } from "@/constants/navigation";
import { scrollToId } from "@/utils/scroll";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--color-border)] pt-16 pb-8">
      <div className="section-container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="font-[var(--font-display)] text-xl font-semibold gradient-text">
              Dhruv Sharma
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              {PROFILE.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Quick Links
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(link.href);
                    }}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Connect
            </h3>
            <div className="mt-4 flex gap-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full glass p-2.5 text-[var(--color-muted)] transition-colors hover:text-[var(--color-electric)]"
              >
                <FaGithub size={17} />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full glass p-2.5 text-[var(--color-muted)] transition-colors hover:text-[var(--color-electric)]"
              >
                <FaLinkedin size={17} />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label="Email"
                className="rounded-full glass p-2.5 text-[var(--color-muted)] transition-colors hover:text-[var(--color-electric)]"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-12 h-px w-full overflow-hidden bg-[var(--color-border)]">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-[shimmer_5s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--color-electric)] to-transparent" />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[var(--color-muted-dim)]">
            © {year} Dhruv Sharma. Built with React &amp; Tailwind CSS.
          </p>
          <button
            onClick={() => scrollToId("#home")}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            Back to top
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
