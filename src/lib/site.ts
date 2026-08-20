/**
 * Single source of truth for everything personal and brand-related.
 * Edit this file first — nearly every page reads from it.
 */

export const site = {
  // ---- Person -------------------------------------------------------------
  name: "Dennis Alimpolos",
  shortName: "Dennis",
  role: "Full-Stack Developer",
  // One line. Shows up in the hero, page titles and social share cards.
  tagline: "I design and ship full-stack web applications end to end.",
  // Two or three sentences. Hero paragraph.
  intro:
    "I build production web applications from database to interface — Next.js and TypeScript on the front, typed APIs and Postgres behind them. I'm currently extending that into mobile, so the products I ship live everywhere my clients' users do.",
  location: "Philippines",
  timezone: "GMT+8",
  // Set to false when you're not looking. Toggles the badge in the header/hero.
  availableForWork: true,
  availabilityNote: "Open to full-time roles and freelance projects",

  // ---- Studio / freelance brand -------------------------------------------
  company: {
    name: "DABCAS",
    // Shown under the wordmark
    descriptor: "Software Studio",
    tagline: "Software built properly, by the person who'll maintain it.",
    // The pitch on /services
    pitch:
      "DABCAS is my independent software practice. You work directly with the developer writing the code — no account managers, no handoffs, no team churn halfway through the build.",
    founded: 2026,
  },

  // ---- Contact ------------------------------------------------------------
  // TODO: point this at a real inbox (a domain address looks better than a
  // personal one on a public site — e.g. set up hello@dabcas.dev forwarding).
  email: "hello@dabcas.dev",
  socials: {
    github: "https://github.com/Dalimpolos29",
    linkedin: "", // TODO: add your LinkedIn URL
    x: "", // optional
  },
  // TODO: add your CV to public/ and set this to e.g. "/dennis-alimpolos-cv.pdf".
  // Left empty so the site never ships a Résumé button that 404s.
  resumeUrl: "",

  // ---- Deployment ---------------------------------------------------------
  url: "https://dabcas.dev",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

/** Grouped skills for the About page. Keep each group to ~6 items. */
export const skills = [
  {
    group: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Zustand", "React Hook Form"],
  },
  {
    group: "Backend",
    items: ["Node.js", "REST & Server Actions", "PostgreSQL", "Prisma", "Supabase", "Auth / RBAC"],
  },
  {
    group: "Mobile",
    items: ["React Native", "Expo", "Native modules", "App Store deployment"],
  },
  {
    group: "Tooling & Delivery",
    items: ["Git", "Claude Code", "Vercel", "Docker", "GitHub Actions", "Playwright"],
  },
] as const;

/** What DABCAS sells. Rendered as cards on /services. */
export const services = [
  {
    title: "Web Applications",
    description:
      "Full-stack builds from an empty repository to a deployed product — auth, database design, admin tooling, payments and the interface on top.",
    deliverables: ["Next.js + TypeScript", "Postgres schema & migrations", "CI/CD pipeline", "Handover documentation"],
  },
  {
    title: "Mobile Applications",
    description:
      "Cross-platform apps that share a codebase and a backend with your web product, so features ship once instead of twice.",
    deliverables: ["React Native / Expo", "Shared API layer", "Offline-capable storage", "Store submission"],
  },
  {
    title: "Rescue & Modernisation",
    description:
      "An existing codebase that's slow, fragile or abandoned by its last developer. I audit it, stabilise it, then move it forward without a rewrite.",
    deliverables: ["Technical audit", "Dependency & security upgrades", "Performance work", "Test coverage"],
  },
] as const;

/** How you work. Rendered as a numbered process strip on /services. */
export const process = [
  {
    title: "Scope",
    description:
      "A call and a written brief. I define what's being built, what it costs and when it lands — before any code exists.",
  },
  {
    title: "Build",
    description:
      "Short cycles with a deployed preview link at the end of each one. You see progress continuously, not at the end.",
  },
  {
    title: "Ship",
    description:
      "Deployment to your infrastructure, with monitoring, documentation and a walkthrough so nothing depends on me being reachable.",
  },
  {
    title: "Support",
    description:
      "A defined support window after launch, and an optional retainer if you want continuous improvement rather than a finished artefact.",
  },
] as const;

/** Long-form bio for /about. Each string is a paragraph. */
export const bio = [
  "I'm a full-stack developer. Most of my work is building web applications end to end — designing the data model, writing the API, then building the interface that sits on top of it. I like owning the whole path from an empty repository to something people actually use.",
  "My default stack is TypeScript everywhere: Next.js on the front, Node and Postgres behind it. I'm deliberately extending that into mobile with React Native, because most of the products worth building don't stop at the browser.",
  "I work heavily with AI tooling — Claude Code is part of my day-to-day. It changes how much ground one developer can cover, but it doesn't change who's responsible for the result. I read every line that ships, and I can explain why each decision was made.",
  "Outside of client work I'm building DABCAS into an independent software practice, so the way I work solo is the way I intend to keep working: clearly scoped, well documented, and handed over in a state someone else could pick up.",
] as const;

/** Timeline for /about. Newest first. */
export const experience = [
  {
    role: "Founder & Developer",
    org: "DABCAS",
    period: "2026 — Present",
    description:
      "Independent software practice building web and mobile applications for clients, from scoping through deployment and support.",
  },
  // TODO: replace the entries below with your real roles, or delete them.
  {
    role: "Full-Stack Developer",
    org: "Add your employer or client",
    period: "20XX — 20XX",
    description:
      "What you owned, what you shipped, and the measurable result. One or two sentences is plenty.",
  },
] as const;

/** Optional: education, certifications, courses. Delete the array to hide the section. */
export const education = [
  {
    title: "Add your degree, bootcamp or certification",
    org: "Institution",
    period: "20XX",
  },
] as const;
