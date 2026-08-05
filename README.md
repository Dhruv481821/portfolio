# Dhruv Sharma — Portfolio

A premium, dark-themed developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- **React 19** + **TypeScript** — component architecture
- **Vite** — build tool, dev server, code splitting
- **Tailwind CSS v4** — utility-first styling with custom design tokens
- **Framer Motion** — scroll reveals, hover interactions, page transitions
- **GSAP** — reserved for any advanced timeline animation you add later
- **React Router DOM** — installed and ready if you expand into multi-page routing
- **Lenis** (`@studio-freight/lenis`) — smooth scrolling
- **EmailJS** — contact form email delivery, no backend required
- **React Helmet Async** — SEO meta tags, Open Graph, Twitter Cards, structured data
- **Lucide React** + **React Icons** — iconography

## Project Structure

```
src/
  components/
    layout/       Navbar, Footer
    sections/     One file per homepage section (Hero, About, Skills, Projects, ...)
    ui/           Reusable primitives (Button, GlassCard, Modal, Badge, ...)
    shared/       Cross-cutting UI (SEO, LoadingScreen, CursorGlow)
  hooks/          useActiveSection, useLenis, useCountUp, useMediaQuery
  context/        ThemeContext (dark/light toggle)
  animations/     Framer Motion variant presets
  utils/          cn() classname helper, scroll helper
  constants/      Profile info, navigation links, social links
  data/           Content: skills, projects, education, certificates, etc.
  types/          Shared TypeScript interfaces
public/
  resume/         Your resume PDF
  certificates/   Certificate PDFs
  projects/       Project cover images (SVG placeholders — swap for real screenshots)
```

**To edit content:** almost everything you'd want to change lives in `src/constants/` and `src/data/` — you rarely need to touch component code to update text, links, or add a project.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

### Other scripts

```bash
npm run build       # type-check + production build to dist/
npm run preview     # preview the production build locally
npm run lint        # run oxlint
npm run typecheck   # TypeScript check only, no build
```

## EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) to send messages without a backend.

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an **Email Service** (e.g. connect your Gmail) — note the **Service ID**.
3. Create an **Email Template** with variables `{{from_name}}`, `{{from_email}}`, and `{{message}}` — note the **Template ID**.
4. Under **Account → General**, copy your **Public Key**.
5. Copy `.env.example` to `.env` and fill in the three values:

```bash
cp .env.example .env
```

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

6. Restart the dev server so Vite picks up the new env vars.

Without these set, the form will show a friendly error and log a console warning — it won't crash the site.

## Updating Content

| What | Where |
|---|---|
| Name, bio, contact info, resume path | `src/constants/profile.ts` |
| Nav links, social links | `src/constants/navigation.ts` |
| Skills | `src/data/skills.ts` |
| Projects | `src/data/projects.ts` |
| Education, certificates, achievements, coding profiles, services, testimonials, blog | `src/data/profile-data.ts` |
| Resume PDF | `public/resume/` |
| Certificate PDFs | `public/certificates/` |
| Project cover images | `public/projects/` (replace the placeholder SVGs with real screenshots or graphics) |

The **Testimonials** and **Blog** sections currently ship with clearly-labeled placeholder content — replace it in `src/data/profile-data.ts` whenever you have real quotes or posts.

## GitHub Stats Section

The GitHub section pulls live data from two public, no-auth-required image services:
- `ghchart.rshah.org` — contribution heatmap
- `github-readme-stats.vercel.app` — stats card

Both read your public GitHub username (`Dhruv481821`, set in `src/components/sections/GitHubSection.tsx`) — no API key needed. If either service is slow or down, the images simply won't load; nothing else breaks.

## SEO Checklist

- Update `SITE_URL` in `src/components/shared/SEO.tsx` to your real deployed domain.
- Update the sitemap URL referenced in `public/robots.txt` and `public/sitemap.xml` to match your real domain.
- Replace `public/og-image.svg` with a real 1200×630 social preview image if you want a polished share card (SVG works, but a PNG/JPG renders more reliably across platforms — export one from Figma/Canva).

## Deployment

### Vercel

1. Push this project to a GitHub repository (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Add your three `VITE_EMAILJS_*` environment variables under **Settings → Environment Variables**.
5. Deploy. Vercel auto-deploys on every push to `main`.

### Netlify

1. Push this project to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Add the `VITE_EMAILJS_*` environment variables under **Site configuration → Environment variables**.
5. Deploy.

### GitHub Pages

GitHub Pages serves static files from a branch, so you'll build locally (or via GitHub Actions) and push the `dist/` output.

Quick manual version:
```bash
npm run build
npm install -D gh-pages
npx gh-pages -d dist
```
Then enable Pages in your repo settings, pointing at the `gh-pages` branch. Note: environment variables for EmailJS won't be available at runtime this way unless you bake them into the build before running `gh-pages -d dist` (e.g. `VITE_EMAILJS_SERVICE_ID=... npm run build`).

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Dhruv481821/<your-repo-name>.git
git push -u origin main
```

## Accessibility & Performance Notes

- Respects `prefers-reduced-motion` — smooth scroll, cursor glow, and schema-graph animations are disabled or reduced for users who request it.
- All interactive elements have visible focus states and ARIA labels.
- Below-the-fold sections are code-split with `React.lazy` to keep the initial bundle small.
- Images use `loading="lazy"` where applicable.
- Run `npm run build` and check the `dist/` output size, then test with Lighthouse in Chrome DevTools before deploying.

## License

Personal portfolio — content and resume are Dhruv Sharma's own. Code structure is free to reference for your own portfolio.
