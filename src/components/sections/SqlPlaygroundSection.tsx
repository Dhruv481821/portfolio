import { useEffect, useRef, useState } from "react";
import { CircleAlert, Database, LoaderCircle, Play, RotateCcw, Terminal } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  createSampleDb,
  DEFAULT_QUERY,
  PRESET_QUERIES,
  SCHEMA_HINT,
  type QueryExecResult,
  type SqlJsDatabase,
  type SqlValue,
} from "@/lib/sqlite";

type Phase = "idle" | "booting" | "ready" | "running";

function formatValue(value: SqlValue) {
  if (value === null) return "NULL";
  if (value instanceof Uint8Array) return `[binary: ${value.length} bytes]`;
  return String(value);
}

export function SqlPlaygroundSection() {
  const dbRef = useRef<SqlJsDatabase | null>(null);
  const [sql, setSql] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState<QueryExecResult | null>(null);
  const [message, setMessage] = useState("Choose a query or write your own, then run it.");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => () => dbRef.current?.close(), []);

  const ensureDb = async () => {
    if (dbRef.current) return dbRef.current;
    setPhase("booting");
    const db = await createSampleDb();
    dbRef.current = db;
    return db;
  };

  const run = async (nextSql = sql) => {
    setError("");
    setPhase("running");
    try {
      const db = await ensureDb();
      const results = db.exec(nextSql);
      const lastResult = results.at(-1) ?? null;
      setResult(lastResult);
      setMessage(lastResult ? `${lastResult.values.length} row${lastResult.values.length === 1 ? "" : "s"} returned` : "Query ran successfully. No rows returned.");
      setPhase("ready");
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught.message : "The query could not be run.");
      setPhase("ready");
    }
  };

  const choosePreset = (presetSql: string) => {
    setSql(presetSql);
    void run(presetSql);
  };

  const reset = () => {
    dbRef.current?.close();
    dbRef.current = null;
    setSql(DEFAULT_QUERY);
    setResult(null);
    setError("");
    setMessage("Database reset. Run the starter query when you’re ready.");
    setPhase("idle");
  };

  const isRunning = phase === "booting" || phase === "running";

  return (
    <section id="playground" className="relative py-24 md:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Playground"
          title="Query my projects"
          description="A real in-browser SQLite database seeded with the kinds of data behind my work. Nothing leaves your device."
        />

        <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-[var(--color-electric)]/5">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-7">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-electric)]/10 text-[var(--color-electric)]">
                <Database size={18} />
              </span>
              <div>
                <p className="font-mono text-xs text-[var(--color-cyan)]">portfolio.db</p>
                <p className="text-sm text-[var(--color-muted)]">SQLite · runs locally in your browser</p>
              </div>
            </div>
            <p className="font-mono text-xs text-[var(--color-muted-dim)]">Ctrl / ⌘ + Enter to run</p>
          </div>

          <div className="border-b border-[var(--color-border)] px-5 py-4 md:px-7">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted-dim)]">Try a query</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUERIES.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => choosePreset(preset.sql)}
                  disabled={isRunning}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-muted)] transition-colors hover:border-[var(--color-cyan)]/50 hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="border-b border-[var(--color-border)] lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-5 py-3 text-xs text-[var(--color-muted)] md:px-7">
                <Terminal size={14} className="text-[var(--color-cyan)]" /> SQL editor
              </div>
              <textarea
                value={sql}
                onChange={(event) => setSql(event.target.value)}
                onKeyDown={(event) => {
                  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                    event.preventDefault();
                    void run();
                  }
                }}
                spellCheck={false}
                aria-label="SQL query editor"
                className="min-h-72 w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-[var(--color-text)] outline-none placeholder:text-[var(--color-muted-dim)] md:p-7"
              />
              <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] px-5 py-4 md:px-7">
                <button
                  onClick={() => void run()}
                  disabled={isRunning || !sql.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-electric)] to-[var(--color-purple)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isRunning ? <LoaderCircle size={15} className="animate-spin" /> : <Play size={15} fill="currentColor" />}
                  {phase === "booting" ? "Starting engine…" : isRunning ? "Running…" : "Run query"}
                </button>
                <button
                  onClick={reset}
                  disabled={isRunning}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)] disabled:opacity-50"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>

            <div className="min-w-0 bg-[var(--color-bg)]/35">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3 md:px-7">
                <span className="font-mono text-xs text-[var(--color-muted)]">Results</span>
                <span className="font-mono text-[11px] text-[var(--color-muted-dim)]">{message}</span>
              </div>
              {error ? (
                <div role="alert" className="m-5 flex gap-3 rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-400 md:m-7">
                  <CircleAlert size={18} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              ) : result ? (
                <div className="max-h-[24rem] overflow-auto" data-lenis-prevent>
                  <table className="w-full border-collapse text-left font-mono text-xs">
                    <thead className="sticky top-0 bg-[var(--color-surface)] text-[var(--color-cyan)]">
                      <tr>{result.columns.map((column) => <th key={column} className="whitespace-nowrap border-b border-[var(--color-border)] px-5 py-3 font-medium md:px-7">{column}</th>)}</tr>
                    </thead>
                    <tbody>
                      {result.values.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-[var(--color-border)]/70 last:border-0">
                          {row.map((value, valueIndex) => <td key={valueIndex} className={`whitespace-nowrap px-5 py-3 md:px-7 ${value === null ? "italic text-[var(--color-muted-dim)]" : "text-[var(--color-muted)]"}`}>{formatValue(value)}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid min-h-72 place-items-center p-8 text-center">
                  <div>
                    <Database size={26} className="mx-auto mb-3 text-[var(--color-muted-dim)]" />
                    <p className="text-sm text-[var(--color-muted)]">Results will appear here.</p>
                    <p className="mt-2 text-xs text-[var(--color-muted-dim)]">The SQL engine downloads only on your first run.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <details className="border-t border-[var(--color-border)] px-5 py-4 text-sm text-[var(--color-muted)] md:px-7">
            <summary className="cursor-pointer select-none font-mono text-xs text-[var(--color-cyan)]">Schema reference</summary>
            <p className="mt-3 font-mono text-xs leading-6 text-[var(--color-muted)]">{SCHEMA_HINT}</p>
          </details>
        </div>
      </div>
    </section>
  );
}
