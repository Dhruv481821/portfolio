import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/navigation";
import { PROFILE } from "@/constants/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/context/ThemeContext";
import { scrollToId } from "@/utils/scroll";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeId = useActiveSection(NAV_LINKS.map((l) => l.href));

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    scrollToId(href);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="section-container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled && "glass"
          )}
          aria-label="Primary"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="font-[var(--font-display)] text-lg font-semibold tracking-tight"
          >
            <span className="gradient-text">DS</span>
            <span className="sr-only">{PROFILE.name} — Home</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    activeId === link.href
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  )}
                >
                  {activeId === link.href && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-0 rounded-full bg-white/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="rounded-full p-2.5 text-[var(--color-muted)] transition-colors hover:bg-white/5 hover:text-[var(--color-text)]"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="rounded-full p-2.5 text-[var(--color-muted)] transition-colors hover:bg-white/5 hover:text-[var(--color-text)]"
            >
              <FaGithub size={17} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-full p-2.5 text-[var(--color-muted)] transition-colors hover:bg-white/5 hover:text-[var(--color-text)]"
            >
              <FaLinkedin size={17} />
            </a>
            <a
              href={PROFILE.resumeUrl}
              download
              className="ml-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-purple)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_-8px_var(--color-electric)] transition-shadow hover:shadow-[0_0_32px_-6px_var(--color-electric)]"
            >
              <Download size={15} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-full p-2 text-[var(--color-text)] lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="section-container mt-2">
              <div className="glass flex flex-col gap-1 rounded-2xl p-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      activeId === link.href
                        ? "bg-white/5 text-[var(--color-text)]"
                        : "text-[var(--color-muted)]"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex items-center gap-2 border-t border-[var(--color-border)] pt-4">
                  <button
                    onClick={toggleTheme}
                    className="rounded-full p-2.5 text-[var(--color-muted)] hover:bg-white/5"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                  </button>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 text-[var(--color-muted)] hover:bg-white/5" aria-label="GitHub">
                    <FaGithub size={17} />
                  </a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 text-[var(--color-muted)] hover:bg-white/5" aria-label="LinkedIn">
                    <FaLinkedin size={17} />
                  </a>
                  <a
                    href={PROFILE.resumeUrl}
                    download
                    className="ml-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-purple)] px-4 py-2.5 text-sm font-medium text-white"
                  >
                    <Download size={15} />
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
