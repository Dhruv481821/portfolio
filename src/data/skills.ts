import type { Skill } from "@/types";

export const SKILLS: Skill[] = [
  // Frontend
  { name: "HTML", icon: "html5", level: 90, years: 3, category: "Frontend" },
  { name: "CSS", icon: "css3", level: 85, years: 3, category: "Frontend" },
  { name: "JavaScript", icon: "javascript", level: 82, years: 3, category: "Frontend" },
  { name: "React", icon: "react", level: 70, years: 1, category: "Frontend" },

  // Backend
  { name: "Java (Core)", icon: "java", level: 78, years: 2, category: "Backend" },
  { name: "REST API Design", icon: "api", level: 72, years: 1, category: "Backend" },
  { name: "JDBC", icon: "database", level: 68, years: 1, category: "Backend" },

  // Languages
  { name: "Java", icon: "java", level: 80, years: 2, category: "Languages" },
  { name: "C++", icon: "cpp", level: 65, years: 2, category: "Languages" },
  { name: "JavaScript", icon: "javascript", level: 80, years: 3, category: "Languages" },

  // Databases
  { name: "MySQL", icon: "mysql", level: 75, years: 2, category: "Databases" },

  // Tools
  { name: "Git & GitHub", icon: "git", level: 82, years: 2, category: "Tools" },
  { name: "Figma", icon: "figma", level: 60, years: 1, category: "Tools" },
  { name: "Canva", icon: "canva", level: 70, years: 2, category: "Tools" },
  { name: "Jupyter Notebook", icon: "jupyter", level: 55, years: 1, category: "Tools" },
  { name: "Anaconda", icon: "anaconda", level: 50, years: 1, category: "Tools" },

  // AI Tools
  { name: "Claude", icon: "claude", level: 85, years: 1, category: "AI Tools" },
];
