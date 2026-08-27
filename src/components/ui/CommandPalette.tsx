import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  Copy,
  CornerDownLeft,
  FileText,
  Hash,
  Mail,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/navigation";
import { PROFILE } from "@/constants/profile";
import { useTheme } from "@/context/ThemeContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { scrollToId } from "@/utils/scroll";
import { startLenis, stopLenis } from "@/lib/lenis";
import { cn } from "@/utils/cn";

/**
 * Shortcut label, resolved once. Mac reads ⌘K; everything else Ctrl K. The
 * navbar trigger imports this so the pill and the palette agree.
 */
export const CMDK_LABEL =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)
    ? "⌘K"
    : "Ctrl K";

/** Fired by the navbar pill (and anything else) to open the palette. */
export const CMDK_OPEN_EVENT = "cmdk:open";

type Group = "Navigate" | "Actions" | "Links";

interface Command {
  id: string;
  label: string;
  group: Group;
  icon: ReactNode;
  /** Extra terms to match against that aren't in the visible label. */
  keywords?: string;
  /** Present on Navigate commands — the anchor to scroll to. */
  href?: string;
  /** Present on Actions/Links. */
  perform?: () => void;
  /** Keep the palette open after running (e.g. theme toggle, copy). */
  keepOpen?: boolean;
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * A ⌘K / Ctrl-K command palette: fuzzy-searchable quick navigation and actions.
 *
 * Mounted once at the app root. It holds a global key listener at all times but
 * renders nothing until opened, so it costs nothing while idle. It reuses the
 * same viewport-ownership dance as `Modal` — `stopLenis()` plus
 * `data-lenis-prevent` on the scroll area — because a stopped Lenis calls
 * `preventDefault()` on wheel events window-wide, which would otherwise kill the
 * results list's own scrolling.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Global open/close: (⌘|Ctrl)+K toggles, and a custom event lets UI buttons
  // open it without prop-drilling a setter down the tree.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(CMDK_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(CMDK_OPEN_EVENT, onOpen);
    };
  }, []);

  // Freeze the viewport + manage focus while open. Mirrors Modal.tsx.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stopLenis();
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      startLenis();
      lastFocused.current?.focus?.();
    };
  }, [open]);

  // Fresh query + selection every time it opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = NAV_LINKS.map((l) => ({
      id: `nav-${l.href}`,
      label: l.label,
      group: "Navigate",
      icon: <Hash size={16} />,
      href: l.href,
      keywords: `go to jump section ${l.label}`,
    }));

    const actions: Command[] = [
      {
        id: "resume",
        label: "Open résumé (PDF)",
        group: "Actions",
        icon: <FileText size={16} />,
        keywords: "cv download",
        perform: () => openExternal(PROFILE.resumeUrl),
      },
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: <Copy size={16} />,
        keywords: "clipboard mail contact",
        keepOpen: true,
        perform: () => {
          navigator.clipboard?.writeText(PROFILE.email).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
          });
        },
      },
      {
        id: "send-email",
        label: "Send an email",
        group: "Actions",
        icon: <Mail size={16} />,
        keywords: "contact reach mailto",
        perform: () => {
          window.location.href = `mailto:${PROFILE.email}`;
        },
      },
      {
        id: "theme",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        group: "Actions",
        icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
        keywords: "dark light mode appearance color",
        keepOpen: true,
        perform: toggleTheme,
      },
    ];

    const links: Command[] = [
      {
        id: "github",
        label: "GitHub",
        group: "Links",
        icon: <FaGithub size={15} />,
        keywords: "code repos source",
        perform: () => openExternal(PROFILE.github),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: "Links",
        icon: <FaLinkedin size={15} />,
        keywords: "profile network hire",
        perform: () => openExternal(PROFILE.linkedin),
      },
      {
        id: "leetcode",
        label: "LeetCode",
        group: "Links",
        icon: <Code2 size={16} />,
        keywords: "dsa problems algorithms",
        perform: () => openExternal(PROFILE.leetcode),
      },
    ];

    return [...nav, ...actions, ...links];
  }, [theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ""} ${c.group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Keep the active row within bounds as the list shrinks/grows.
  useEffect(() => {
    if (activeIndex > filtered.length - 1) setActiveIndex(Math.max(0, filtered.length - 1));
  }, [filtered.length, activeIndex]);

  // Keep the highlighted row visible under keyboard navigation.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  function close() {
    setOpen(false);
  }

  function run(cmd: Command) {
    if (cmd.group === "Navigate" && cmd.href) {
      const href = cmd.href;
      close();
      // Defer past the close: closing restores body overflow and restarts
      // Lenis in its cleanup, and the scroll only lands if Lenis is running.
      // Two frames guarantees that commit has happened.
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(href)));
      return;
    }
    cmd.perform?.();
    if (!cmd.keepOpen) close();
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) run(cmd);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.12 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : -6 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="glass-blur relative z-10 w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4">
              <Search size={18} className="shrink-0 text-[var(--color-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={filtered[activeIndex] ? `cmdk-opt-${activeIndex}` : undefined}
                aria-autocomplete="list"
                placeholder="Search sections and actions…"
                className="h-14 w-full bg-transparent text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted)]"
              />
              <kbd className="shrink-0 rounded-md border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-muted)]">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              id="cmdk-list"
              role="listbox"
              aria-label="Commands"
              data-lenis-prevent
              className="max-h-[52vh] overflow-y-auto p-2"
            >
              {filtered.length === 0 ? (
                <p className="px-3 py-10 text-center text-sm text-[var(--color-muted)]">
                  No results for “{query}”.
                </p>
              ) : (
                filtered.map((cmd, i) => {
                  const prev = filtered[i - 1];
                  const header = !prev || prev.group !== cmd.group ? cmd.group : null;
                  const active = i === activeIndex;
                  return (
                    <Fragment key={cmd.id}>
                      {header && (
                        <div className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wider text-[var(--color-muted)]">
                          {header}
                        </div>
                      )}
                      <button
                        id={`cmdk-opt-${i}`}
                        data-index={i}
                        role="option"
                        aria-selected={active}
                        onMouseMove={() => setActiveIndex(i)}
                        onClick={() => run(cmd)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                          active ? "bg-white/5 text-[var(--color-text)]" : "text-[var(--color-muted)]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center",
                            active && "text-[var(--color-cyan)]"
                          )}
                        >
                          {cmd.icon}
                        </span>
                        <span className="flex-1 truncate">{cmd.label}</span>
                        {cmd.id === "copy-email" && copied && (
                          <span className="text-xs text-[var(--color-cyan)]">Copied!</span>
                        )}
                        {active && (
                          <CornerDownLeft size={14} className="shrink-0 text-[var(--color-muted)]" />
                        )}
                      </button>
                    </Fragment>
                  );
                })
              )}
            </div>

            {/* Footer hint bar */}
            <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2.5 text-[11px] text-[var(--color-muted)]">
              <span>↑↓ navigate&nbsp;·&nbsp;↵ select&nbsp;·&nbsp;esc close</span>
              <span className="font-mono">{CMDK_LABEL}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
