import { useMemo } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
}

const NODES: Node[] = [
  { id: "users", x: 12, y: 22, label: "users" },
  { id: "sessions", x: 30, y: 12, label: "sessions" },
  { id: "applications", x: 52, y: 20, label: "applications" },
  { id: "companies", x: 74, y: 10, label: "companies" },
  { id: "statuses", x: 88, y: 30, label: "statuses" },
  { id: "moods", x: 8, y: 55, label: "mood_logs" },
  { id: "habits", x: 28, y: 68, label: "habits" },
  { id: "skills", x: 50, y: 60, label: "skills" },
  { id: "milestones", x: 70, y: 72, label: "milestones" },
  { id: "progress", x: 90, y: 62, label: "progress" },
  { id: "query", x: 46, y: 42, label: "query" },
];

const EDGES: [string, string][] = [
  ["users", "sessions"],
  ["sessions", "applications"],
  ["applications", "companies"],
  ["applications", "statuses"],
  ["users", "moods"],
  ["moods", "habits"],
  ["habits", "skills"],
  ["skills", "milestones"],
  ["milestones", "progress"],
  ["query", "applications"],
  ["query", "skills"],
  ["query", "moods"],
  ["query", "users"],
];

/**
 * Ambient background: a live "schema graph" — nodes representing tables from
 * the featured projects, connected like foreign keys, with a pulse traveling
 * the edges to suggest a query resolving across the schema. This is the
 * page's signature element, chosen because the person describes their own
 * approach as building "from the database up."
 */
export function SchemaGraphBackground() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const nodeMap = useMemo(() => Object.fromEntries(NODES.map((n) => [n.id, n])), []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.55]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4c7fff" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {EDGES.map(([from, to], i) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          if (!a || !b) return null;
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#edgeGradient)"
              strokeWidth="0.15"
              strokeOpacity="0.35"
              strokeDasharray={reduceMotion ? undefined : "1.5 1.5"}
            >
              {!reduceMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-6"
                  dur={`${3 + (i % 4)}s`}
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}

        {NODES.map((node, i) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="0.9" fill="#0f1420" stroke="url(#edgeGradient)" strokeWidth="0.12" />
            {!reduceMotion && (
              <circle cx={node.x} cy={node.y} r="0.9" fill="none" stroke="#22d3ee" strokeWidth="0.1" opacity="0.5">
                <animate
                  attributeName="r"
                  values="0.9;2.2;0.9"
                  dur={`${3.5 + (i % 3) * 0.6}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0;0.5"
                  dur={`${3.5 + (i % 3) * 0.6}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* Labels rendered as HTML for crisp text, positioned to match SVG node coords */}
      <div className="absolute inset-0 hidden lg:block">
        {NODES.map((node) => (
          <motion.span
            key={node.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute font-mono text-[10px] tracking-wide text-[var(--color-muted)]"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(10px, -50%)" }}
          >
            {node.label}
          </motion.span>
        ))}
      </div>

      {/* Soft ambient glows layered beneath the graph */}
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-[var(--color-electric)] opacity-[0.08] blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-[var(--color-purple)] opacity-[0.08] blur-[100px]" />
    </div>
  );
}
