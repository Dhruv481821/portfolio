export type SqlValue = string | number | Uint8Array | null;

export interface QueryExecResult {
  columns: string[];
  values: SqlValue[][];
}

export interface SqlJsDatabase {
  run(sql: string): void;
  exec(sql: string): QueryExecResult[];
  close(): void;
}

interface SqlJsStatic {
  Database: new () => SqlJsDatabase;
}

type InitSqlJs = (config?: {
  locateFile?: (file: string) => string;
}) => Promise<SqlJsStatic>;

declare global {
  interface Window {
    initSqlJs?: InitSqlJs;
  }
}

const CDN_BASE = "https://cdn.jsdelivr.net/npm/sql.js@1/dist";
let enginePromise: Promise<SqlJsStatic> | null = null;

function loadEngine() {
  if (enginePromise) return enginePromise;

  enginePromise = new Promise((resolve, reject) => {
    if (window.initSqlJs) {
      resolve(window.initSqlJs({ locateFile: (file) => `${CDN_BASE}/${file}` }));
      return;
    }

    const script = document.createElement("script");
    script.src = `${CDN_BASE}/sql-wasm.js`;
    script.async = true;
    script.onload = () => {
      if (!window.initSqlJs) {
        reject(new Error("SQL engine loaded without initializing."));
        return;
      }
      window.initSqlJs({ locateFile: (file) => `${CDN_BASE}/${file}` }).then(resolve, reject);
    };
    script.onerror = () => reject(new Error("Could not load the SQL engine. Check your connection and retry."));
    document.head.appendChild(script);
  });

  return enginePromise;
}

const SCHEMA_SQL = `
  CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, location TEXT);
  CREATE TABLE companies (id INTEGER PRIMARY KEY, name TEXT, industry TEXT);
  CREATE TABLE applications (
    id INTEGER PRIMARY KEY, user_id INTEGER, company_id INTEGER,
    role TEXT, status TEXT, applied_on TEXT
  );
  CREATE TABLE skills (id INTEGER PRIMARY KEY, name TEXT, level INTEGER);
  CREATE TABLE mood_logs (id INTEGER PRIMARY KEY, logged_on TEXT, mood INTEGER, note TEXT);
  CREATE TABLE habits (id INTEGER PRIMARY KEY, name TEXT, streak_days INTEGER);
  CREATE TABLE milestones (id INTEGER PRIMARY KEY, title TEXT, completed_on TEXT);

  INSERT INTO users VALUES (1, 'Dhruv Sharma', 'Bhiwani'), (2, 'Aarav Mehta', 'Delhi'), (3, 'Isha Kulkarni', 'Pune');
  INSERT INTO companies VALUES
    (1, 'Google', 'Technology'), (2, 'Zoho', 'SaaS'), (3, 'Razorpay', 'Fintech'),
    (4, 'Freshworks', 'SaaS'), (5, 'Atlassian', 'Technology');
  INSERT INTO applications VALUES
    (1, 1, 1, 'Software Engineering Intern', 'Interview', '2026-07-28'),
    (2, 1, 2, 'Full Stack Developer', 'Applied', '2026-08-04'),
    (3, 1, 3, 'Backend Intern', 'Offer', '2026-08-09'),
    (4, 1, 4, 'Frontend Developer', 'Rejected', '2026-07-16'),
    (5, 1, 5, 'Software Engineer', 'Interview', '2026-08-14'),
    (6, 2, 2, 'Product Intern', 'Applied', '2026-08-03'),
    (7, 3, 1, 'Data Analyst', 'Offer', '2026-08-12');
  INSERT INTO skills VALUES
    (1, 'Java', 82), (2, 'React', 88), (3, 'MySQL', 80), (4, 'JavaScript', 85),
    (5, 'REST APIs', 78), (6, 'HTML/CSS', 90), (7, 'Git', 75);
  INSERT INTO mood_logs VALUES
    (1, '2026-08-11', 5, 'Shipped a feature'), (2, '2026-08-13', 4, 'Good problem-solving day'),
    (3, '2026-08-16', 3, 'Deep study session'), (4, '2026-08-18', 5, 'Portfolio progress');
  INSERT INTO habits VALUES (1, 'LeetCode daily', 46), (2, 'Commit code', 31), (3, 'Read docs', 12);
  INSERT INTO milestones VALUES
    (1, 'Built first full-stack app', '2025-11-20'),
    (2, 'Completed 250 LeetCode problems', '2026-05-14'),
    (3, 'Launched portfolio v2', '2026-08-18');
`;

export async function createSampleDb() {
  const SQL = await loadEngine();
  const db = new SQL.Database();
  db.run(SCHEMA_SQL);
  return db;
}

export const DEFAULT_QUERY = `SELECT c.name AS company, a.role, a.status
FROM applications a
JOIN companies c ON c.id = a.company_id
WHERE a.user_id = 1
ORDER BY a.applied_on DESC;`;

export const PRESET_QUERIES = [
  {
    label: "Status breakdown",
    sql: "SELECT status, COUNT(*) AS total FROM applications GROUP BY status ORDER BY total DESC;",
  },
  {
    label: "Top skills",
    sql: "SELECT name, level FROM skills ORDER BY level DESC LIMIT 5;",
  },
  {
    label: "Habit streaks",
    sql: "SELECT name, streak_days FROM habits ORDER BY streak_days DESC;",
  },
  {
    label: "Mood log",
    sql: "SELECT logged_on, mood, note FROM mood_logs ORDER BY logged_on DESC;",
  },
  {
    label: "Offers & interviews",
    sql: "SELECT c.name AS company, a.role, a.status FROM applications a JOIN companies c ON c.id = a.company_id WHERE a.status IN ('Offer', 'Interview');",
  },
];

export const SCHEMA_HINT = "users · companies · applications · skills · mood_logs · habits · milestones";
