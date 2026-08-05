import type {
  Achievement,
  BlogPost,
  Certificate,
  CodingProfile,
  EducationItem,
  Service,
  Testimonial,
} from "@/types";

export const EDUCATION: EducationItem[] = [
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "International Institute of Technology and Management, Murthal, Haryana",
    duration: "2023 – 2027 (Expected) · Currently in 3rd Year",
    detail: "CGPA: 7.5 / 10",
    coursework: ["DBMS", "Operating Systems", "Data Structures", "Java", "Web Development"],
  },
  {
    id: "senior-secondary",
    degree: "Senior Secondary (Class XII)",
    institution: "Higher Secondary Education",
    duration: "Completed",
    detail: "Percentage: 67%",
    coursework: [],
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "git-github-bootcamp",
    title: "Git & GitHub Bootcamp",
    issuer: "LetsUpgrade, in collaboration with NSDC & ITM Edutech Training Pvt. Ltd.",
    date: "April 2026",
    skills: ["Git", "GitHub", "Version Control"],
    verifyUrl: "https://letsupgrade.in/verify",
    fileUrl: "/certificates/git-github-bootcamp.pdf",
  },
  {
    id: "be10x-ai-tools",
    title: "AI Tools Workshop",
    issuer: "be10x",
    date: "March 2026",
    skills: ["AI-Assisted Presentations", "Data Analysis", "Code Debugging"],
    fileUrl: "/certificates/be10x-ai-tools.pdf",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "hackrust",
    title: "HackRust 1.0 Participant",
    org: "Deenbandhu Chhotu Ram University of Science and Technology (DCRUST), Murthal",
    date: "April 2026",
    detail: "Competed as part of Team CodeRed in a university-organized hackathon.",
  },
];

export const CODING_PROFILES: CodingProfile[] = [
  {
    platform: "LeetCode",
    handle: "dhruv__321",
    url: "https://leetcode.com/u/dhruv__321/",
    icon: "leetcode",
  },
  {
    platform: "GitHub",
    handle: "Dhruv481821",
    url: "https://github.com/Dhruv481821",
    icon: "github",
  },
];

export const SERVICES: Service[] = [
  {
    id: "frontend-dev",
    title: "Frontend Development",
    description: "Responsive, accessible interfaces built with HTML, CSS, JavaScript, and React.",
    icon: "layout",
  },
  {
    id: "react-dev",
    title: "React Development",
    description: "Component-driven UIs with clean state management and reusable architecture.",
    icon: "component",
  },
  {
    id: "api-integration",
    title: "API Integration",
    description: "Connecting front ends to REST APIs with the Fetch API, including error handling.",
    icon: "plug",
  },
  {
    id: "backend-basics",
    title: "Backend Fundamentals",
    description: "REST API design in core Java with JDBC and MySQL, from schema to endpoint.",
    icon: "server",
  },
  {
    id: "responsive-web",
    title: "Responsive Websites",
    description: "Layouts that hold up cleanly from 320px mobile screens to 4K displays.",
    icon: "smartphone",
  },
  {
    id: "perf-optimization",
    title: "Performance Optimization",
    description: "Lazy loading, code splitting, and image optimization for fast-loading pages.",
    icon: "zap",
  },
];

// Placeholder — replace once you have real testimonials from mentors, teammates, or hackathon collaborators.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Add a teammate or mentor",
    role: "Role · Organization",
    quote:
      "This is placeholder testimonial content. Swap in a real quote from someone you've worked with once you have one.",
    avatar: "/testimonials/placeholder-1.svg",
  },
  {
    id: "t2",
    name: "Add a hackathon collaborator",
    role: "Role · Organization",
    quote:
      "This is placeholder testimonial content. Swap in a real quote from someone you've worked with once you have one.",
    avatar: "/testimonials/placeholder-2.svg",
  },
];

// Placeholder — replace with real write-ups once published.
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "Building a REST API in Core Java Without a Framework",
    excerpt:
      "Notes on wiring up com.sun.net.httpserver for a real project — what a framework normally hides, and what I learned by not using one.",
    tag: "Backend",
    readTime: "6 min read",
    date: "Coming soon",
    cover: "/blog/placeholder-1.svg",
  },
  {
    id: "b2",
    title: "What I Learned Modeling a MySQL Schema From Scratch",
    excerpt: "Working through normalization, foreign keys, and JDBC connections for the first time.",
    tag: "Databases",
    readTime: "5 min read",
    date: "Coming soon",
    cover: "/blog/placeholder-2.svg",
  },
  {
    id: "b3",
    title: "DBMS Theory vs. Building With a Real Database",
    excerpt: "Where the classroom concepts actually showed up once I had to build something that worked.",
    tag: "Learning",
    readTime: "4 min read",
    date: "Coming soon",
    cover: "/blog/placeholder-3.svg",
  },
];

export const STATS = [
  { label: "Years Learning", value: 3, suffix: "+" },
  { label: "Projects Built", value: 3, suffix: "" },
  { label: "Certificates", value: 2, suffix: "" },
  { label: "Coursework Areas", value: 5, suffix: "" },
];
