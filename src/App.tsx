import { lazy, Suspense, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/context/ThemeContext";
import { useLenis } from "@/hooks/useLenis";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { CursorGlow } from "@/components/shared/CursorGlow";
import { SEO } from "@/components/shared/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";

// Below-the-fold sections are code-split so the initial bundle stays lean.
const SkillsSection = lazy(() =>
  import("@/components/sections/SkillsSection").then((m) => ({ default: m.SkillsSection }))
);
const ProjectsSection = lazy(() =>
  import("@/components/sections/ProjectsSection").then((m) => ({ default: m.ProjectsSection }))
);
const ExperienceSection = lazy(() =>
  import("@/components/sections/ExperienceSection").then((m) => ({
    default: m.ExperienceSection,
  }))
);
const CertificatesSection = lazy(() =>
  import("@/components/sections/CertificatesSection").then((m) => ({
    default: m.CertificatesSection,
  }))
);
const EducationSection = lazy(() =>
  import("@/components/sections/EducationSection").then((m) => ({
    default: m.EducationSection,
  }))
);
const GitHubSection = lazy(() =>
  import("@/components/sections/GitHubSection").then((m) => ({ default: m.GitHubSection }))
);
const CodingProfilesSection = lazy(() =>
  import("@/components/sections/CodingProfilesSection").then((m) => ({
    default: m.CodingProfilesSection,
  }))
);
const ServicesSection = lazy(() =>
  import("@/components/sections/ServicesSection").then((m) => ({ default: m.ServicesSection }))
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  }))
);
const BlogSection = lazy(() =>
  import("@/components/sections/BlogSection").then((m) => ({ default: m.BlogSection }))
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection").then((m) => ({ default: m.ContactSection }))
);

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();

  useEffect(() => {
    /**
     * This splash is purely cosmetic — it isn't gating on any real work. 900ms
     * of deliberately blank screen on top of a 0.6s fade out meant 1.5s before
     * the page was usable, which reads as "slow site" no matter how fast
     * everything after it is. Trimmed to a brief beat that covers first paint.
     */
    const timer = window.setTimeout(() => setIsLoading(false), 280);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEO />
        <LoadingScreen isLoading={isLoading} />
        <CursorGlow />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-full focus:bg-[var(--color-electric)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <Suspense fallback={<SectionFallback />}>
            <SkillsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ExperienceSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <CertificatesSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <EducationSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <GitHubSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <CodingProfilesSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TestimonialsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <BlogSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </main>
        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
