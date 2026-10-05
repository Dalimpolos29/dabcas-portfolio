/**
 * Single source of truth for everything personal.
 * Facts here come from the current CV and verified project history.
 */

export const site = {
  name: "Dennis Alimpolos",
  shortName: "Dennis",
  role: "AI-Assisted Full-Stack Developer",
  tagline: "I build web systems people run on every day.",
  intro: "Full-stack developer. Payroll, school, community and ordering apps — shipped fast, owned line by line.",
  location: "Mabalacat, Pampanga, Philippines",
  timezone: "GMT+8",
  availableForWork: true,
  availabilityNote: "Open to full-time roles · remote or hybrid",

  email: "imdennisalimpolos@gmail.com",
  phone: "+63 976 157 1657",
  socials: {
    github: "https://github.com/Dalimpolos29",
    linkedin: "https://www.linkedin.com/in/dennis-alimpolos-228753210/",
  },
  // Add the PDF at public/dennis-alimpolos-cv.pdf to switch the Résumé button on.
  resumeUrl: "",

  url: "https://dabcas-portfolio.vercel.app",

  // The freelance practice. Deliberately a footnote, not a second brand.
  company: {
    name: "DABCAS",
    descriptor: "Freelance practice",
    note: "I take freelance work under the name DABCAS.",
  },
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Headline numbers for the home page. Every one is verifiable. */
export const stats = [
  { value: 200, suffix: "+", label: "users on one system" },
  { value: 4, suffix: "", label: "products shipped" },
  { value: 3, suffix: "", label: "with public demos" },
  { value: 338, suffix: "", label: "commits across three repos" },
] as const;

export const skills = [
  {
    group: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "PWA", "UI/UX Design"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "PostgreSQL", "Supabase", "REST APIs", "Auth & RBAC", "SQL migrations"],
  },
  {
    group: "Delivery",
    items: ["Git & GitHub", "Vercel", "CI/CD", "Cloudflare", "System architecture"],
  },
  {
    group: "AI-assisted",
    items: ["Claude Code", "Codex", "Prompt engineering", "n8n automation"],
  },
] as const;

/** The "How I work" tiles on the home page. One line each — the icon does the rest. */
export const approach = [
  {
    icon: "zap",
    title: "Ship in days",
    description: "Merit & Demerit went from idea to 200+ daily users in one day.",
  },
  {
    icon: "shield",
    title: "Correct first",
    description: "Wages and records that reconcile to the centavo.",
  },
  {
    icon: "eye",
    title: "Every line read",
    description: "AI speeds me up. I own and can explain what ships.",
  },
] as const;

export const bio = [
  "Full-stack developer in Pampanga, Philippines. I build web apps end to end — data model, API, interface — and deploy them for people who depend on them daily.",
  "I came to code from teaching, not a CS degree. TypeScript everywhere, Next.js and Supabase, with Claude Code in my daily workflow.",
] as const;

/** Quick facts on the About page, shown as icon tiles. */
export const highlights = [
  { icon: "rocket", label: "4 products in production" },
  { icon: "school", label: "STEAM teacher by day" },
  { icon: "shield", label: "Found and fixed a payroll race condition" },
] as const;

export const experience = [
  {
    role: "STEAM Teacher (Technology)",
    org: "Saint Paul American School, Clark",
    period: "Present",
    description:
      "Teach AI, web dev, programming and robotics. Built the school's merit/demerit platform, used by 200+ people.",
  },
  {
    role: "AI-Assisted Full-Stack Developer (Freelance)",
    org: "DABCAS",
    period: "2023 — Present",
    description:
      "Payroll and attendance, an alumni community, a pastry ordering PWA. Scoping to support, solo.",
  },
  {
    role: "Technical Support Specialist",
    org: "Apple · HelpFlow",
    period: "Earlier",
    description: "Diagnosed issues across client systems and resolved escalations.",
  },
] as const;

export const education = [
  {
    title: "Bachelor in Business Teacher Education",
    org: "Polytechnic University of the Philippines",
    period: "2009 — 2013",
  },
  {
    title: "Secondary School",
    org: "Justice Cecilia Muñoz Palma High School",
    period: "2005 — 2009",
  },
] as const;
