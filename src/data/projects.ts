import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "internship-tracker",
    title: "Internship Application Tracker",
    tagline:
      "A full-stack Java dashboard that replaces the notes-app chaos of job hunting.",
    category: "Full-Stack",
    image: "/projects/Internship_Tracker.png",
    problem:
      "Tracking internship applications gets messy fast — dozens of companies, different statuses (Applied, OA, Interview, Offer, Rejected), and deadlines to follow up on. Doing this in a notes app or scattered messages means things get missed.",
    solution:
      "Built a REST API from scratch in core Java using com.sun.net.httpserver — no external framework — with full CRUD against a MySQL database via JDBC, paired with a responsive HTML/CSS/JS front end consuming it through the Fetch API. Database credentials are externalized via environment variables instead of being hardcoded.",
    features: [
      "Automatic overdue follow-up detection — flags applications where the follow-up date has passed and the status is still active, turning stored data into an action prompt rather than a static record.",
      "Live funnel analytics — calculates real interview and offer conversion rates on the fly instead of just listing raw counts.",
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Java",
      "JDBC",
      "MySQL",
      "Git/GitHub",
    ],
    github: "https://github.com/Dhruv481821/internship-tracker",
    featured: true,
  },
  {
    id: "mental-health-tracker",
    title: "Mental Health Tracker",
    tagline:
      "Pattern recognition for mood and habits, not just a digital diary.",
    category: "Full-Stack",
    image: "/projects/Teen_Mood_Tracker.png",
    problem:
      "Many people experience stress, anxiety, burnout, or mood swings but fail to recognize patterns because they don't consistently track their emotional state.",
    solution:
      "Built a tracker focused on pattern recognition rather than simple journaling — recording daily mood and correlating it against habits like sleep, water intake, meditation, and exercise to surface trends the user wouldn't otherwise notice.",
    features: [
      "Mood analytics dashboard — visual graphs showing emotional trends across weeks and months.",
      "Smart habit tracking — logs sleep, water intake, meditation, and exercise alongside mood to reveal correlations, plus streak tracking to reinforce consistency.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Data Visualization"],
    github: "https://github.com/Dhruv481821/Teen_Mood_Tracker",
    featured: true,
  },
  {
    id: "skill-forge-ai",
    title: "Skill Forge AI",
    tagline:
      "A structured, portfolio-driven alternative to scattered tutorial-hopping.",
    category: "Full-Stack",
    image: "/projects/Skill_Forge.png",
    problem:
      "Students often learn through scattered resources — YouTube, courses, blogs, notes — without a structured roadmap, which makes it hard to measure progress or stay motivated.",
    solution:
      "Combined learning management, progress tracking, and project organization into a single dashboard, aligning with how the industry actually evaluates skill — through built projects, not consumed tutorials.",
    features: [
      "Personalized learning roadmap — users create custom paths with milestones and deadlines.",
      "Progress and achievement dashboard — surfaces completed topics, skill percentages, badges, and project progress in one place.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "React"],
    github: "https://github.com/Dhruv481821/SkillForge-AI",
    featured: true,
  },
  {
    id: "devtrack-ai",
    title: "DevTrack AI",
    tagline:
      "An AI-powered developer operating system — in active early-stage development.",
    category: "Full-Stack",
    image: "/projects/devtrack-ai.jpg",
    problem:
      "Developers preparing for interviews or growing a career manage their code (GitHub), DSA practice (LeetCode/spreadsheets), notes, resume, and job applications as five disconnected tools that don't talk to each other — so a question like \"am I actually ready for this job?\" has no single source of truth to answer it from.",
    solution:
      "Designing a system that correlates signal across those tools rather than just chatting about them in isolation — e.g. surfacing that a resume claims backend strength while 90 days of practice history are almost entirely frontend-tagged. The project ships with its complete pre-implementation engineering blueprint (20 documents: PRD, system architecture, database design, API spec, security threat model, AI architecture) written and self-reviewed before application code, kept in sync as it's built. Status: Phase 0 (Foundation) — in progress, no phase complete yet, tracked openly in the repo's roadmap doc rather than presented as finished.",
    features: [
      "Modular monolith with enforced module boundaries — cross-module coupling (e.g. Calendar needing Job Tracker data) goes through an in-process domain event bus instead of direct cross-module calls.",
      "AI agents are architecturally constrained to read-only, bounding the blast radius of prompt injection by design rather than by best-effort filtering alone.",
    ],
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Java 21",
      "Spring Boot 3",
      "PostgreSQL",
      "Redis",
      "Google Gemini",
    ],
    github: "https://github.com/Dhruv481821/DEVTRACK-AI",
    featured: true,
  },
  {
    id: "ultron",
    title: "ULTRON",
    tagline:
      "A personal AI assistant that plans, organizes, researches, and automates in one interface.",
    category: "AI Tool",
    image: "/projects/ultron.jpg",
    problem:
      "Getting real help from AI day-to-day usually means bouncing between separate chat, task, calendar, and automation tools — none of them sharing context with each other.",
    solution:
      "Built a single assistant interface combining chat, task and calendar management, notes, a knowledge base, and automations, with the assistant able to invoke web search, code execution, file handling, and memory directly inside a conversation instead of requiring separate tools.",
    features: [
      "Unified quick-tool actions (search, summarize, generate, code, analyze, automate) available directly from the assistant's home view.",
      "Tracks its own multi-project context (this portfolio, DevTrack AI, and others) alongside personal tasks in one dashboard.",
    ],
    techStack: [],
    featured: true,
  },
];