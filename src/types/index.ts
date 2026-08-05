export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  years: number;
  category: SkillCategory;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Languages"
  | "Databases"
  | "Tools"
  | "AI Tools";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  cover: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  detail: string;
  coursework: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  verifyUrl?: string;
  fileUrl: string;
}

export interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  icon: string;
  stat?: string;
}

export interface Achievement {
  id: string;
  title: string;
  org: string;
  date: string;
  detail: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
  cover: string;
}
