import type { NavLink, SocialLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certificates" },
  { label: "GitHub", href: "#github" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

/** Precomputed once so scroll-observing hooks get a stable array identity. */
export const NAV_HREFS: string[] = NAV_LINKS.map((l) => l.href);

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Dhruv481821", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dhurv-sharma-sd/",
    icon: "linkedin",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/dhruv__321/",
    icon: "leetcode",
  },
  {
    label: "Email",
    href: "mailto:sharmadhruv2403@gmail.com",
    icon: "mail",
  },
];
