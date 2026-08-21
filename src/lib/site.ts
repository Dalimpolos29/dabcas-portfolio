/**
 * Single source of truth for everything personal.
 * Facts here come from the current CV and verified project history.
 */

export const site = {
  name: "Dennis Alimpolos",
  shortName: "Dennis",
  role: "AI-Assisted Full-Stack Developer",
  tagline: "I ship production web systems fast — and I own every line that goes out.",
  intro:
    "I build and deploy full-stack web applications that real organisations run on: payroll, school administration, alumni communities, online ordering. AI tooling is how I cover the ground of a whole team; the engineering judgement is mine.",
  location: "Mabalacat, Pampanga, Philippines",
  timezone: "GMT+8",
  availableForWork: true,
  availabilityNote: "Open to full-time developer roles, remote or hybrid",

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
  { value: 3, suffix: "", label: "live in production" },
  { value: 338, suffix: "", label: "commits across them" },
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

/** The "How I work" strip on the home page. */
export const approach = [
  {
    title: "Ship in days, not quarters",
    description:
      "The Merit & Demerit system went from nothing to deployed in a single day, and 200+ people used it daily after that. AI tooling collapses the distance between a decision and working software.",
  },
  {
    title: "Correctness before cleverness",
    description:
      "The systems I build handle wages, attendance records and student discipline. I write the migration that reconciles to the centavo and the test that stops a permission scope quietly widening.",
  },
  {
    title: "I read every line that ships",
    description:
      "Speed is only worth having if you can still explain the code. I can walk through any decision in these projects and tell you what it does and why it's there.",
  },
] as const;

export const bio = [
  "I'm a full-stack developer based in Pampanga, Philippines. I build web applications end to end — data model, API, and the interface on top — and I deploy them for people who then depend on them every day.",
  "I came to development from teaching, not from a computer science degree. I'm currently a STEAM technology teacher, which means I spend my days explaining how software works to teenagers and my evenings building the systems my school and my clients actually run on. Four of those are in production now.",
  "My stack is TypeScript everywhere: Next.js on the front, Supabase and Postgres behind it. I work heavily with AI tooling — Claude Code is part of my daily workflow. It changes how much ground one developer can cover; it doesn't change who's accountable for the result.",
  "The work I'm proudest of isn't the fastest thing I've built. It's a payroll approval path where I found a race condition that could double-apply loan deductions, and fixed it so it can't happen again. That's real money belonging to real people.",
] as const;

export const experience = [
  {
    role: "STEAM Teacher (Technology)",
    org: "Saint Paul American School, Clark",
    period: "Present",
    description:
      "Teach AI, web development, programming and robotics to high school students, using n8n and Claude in real project work. Also build the school's internal systems — attendance, scoring, and the merit/demerit platform used by 200+ students, teachers and administrators.",
  },
  {
    role: "AI-Assisted Full-Stack Developer (Freelance)",
    org: "DABCAS",
    period: "2023 — Present",
    description:
      "Design, build and deploy web systems for clients: a DOLE-compliant payroll and attendance platform, an alumni community for 170–200 members, and a pastry ordering PWA serving 100–130 customers. Scoping through deployment and support, solo.",
  },
  {
    role: "Technical Support Specialist",
    org: "Apple · HelpFlow",
    period: "Earlier",
    description:
      "Troubleshot technical issues across client systems and environments, and worked with cross-functional teams to resolve escalations. Where I learned to diagnose a problem from an unreliable description of it.",
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
