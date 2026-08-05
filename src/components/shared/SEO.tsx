import { Helmet } from "react-helmet-async";
import { PROFILE } from "@/constants/profile";

const SITE_URL = "https://dhruvsharma.dev"; // Replace with your deployed domain

export function SEO({
  title = `${PROFILE.name} — ${PROFILE.role}`,
  description = PROFILE.tagline,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
}) {
  const url = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}/og-image.svg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    url: SITE_URL,
    email: PROFILE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bhiwani",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.leetcode],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={`${PROFILE.name} Portfolio`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}
