import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "internship-tracker",
    title: "Internship Application Tracker",
    tagline: "A full-stack Java dashboard that replaces the notes-app chaos of job hunting.",
    category: "Full-Stack",
    cover: "/projects/internship-tracker.svg",
    problem:
      "Tracking internship applications gets messy fast — dozens of companies, different statuses (Applied, OA, Interview, Offer, Rejected), and deadlines to follow up on. Doing this in a notes app or scattered messages means things get missed.",
    solution:
      "Built a REST API from scratch in core Java using com.sun.net.httpserver — no external framework — with full CRUD against a MySQL database via JDBC, paired with a responsive HTML/CSS/JS front end consuming it through the Fetch API. Database credentials are externalized via environment variables instead of being hardcoded.",
    features: [
      "Automatic overdue follow-up detection — flags applications where the follow-up date has passed and the status is still active, turning stored data into an action prompt rather than a static record.",
      "Live funnel analytics — calculates real interview and offer conversion rates on the fly instead of just listing raw counts.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Java", "JDBC", "MySQL", "Git/GitHub"],
    github: "https://github.com/Dhruv481821/internship-tracker",
    featured: true,
  },
  {
    id: "mental-health-tracker",
    title: "Mental Health Tracker",
    tagline: "Pattern recognition for mood and habits, not just a digital diary.",
    category: "Full-Stack",
    cover: "/projects/mental-health-tracker.svg",
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
    tagline: "A structured, portfolio-driven alternative to scattered tutorial-hopping.",
    category: "Full-Stack",
    cover: "/projects/skill-forge-ai.svg",
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
];
