# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder portfolio with real content from Dennis Alimpolos's CV and GitHub history, and add a scroll-driven home page with one pinned signature moment.

**Architecture:** Keep the existing Next.js 16 App Router structure — it already provides SEO metadata, sitemap/robots, theming, MDX case studies and an accessible layout. Content stays centralised in `src/lib/site.ts` and `content/projects/*.mdx`. Animation is added as three isolated client-component primitives under `src/components/motion/`; every page stays a Server Component and only opts into motion by composing those primitives.

**Tech Stack:** Next.js 16.3.1 (App Router, RSC), React 19.2.8, TypeScript 5, Tailwind CSS v4, `motion` v13.1.1, next-mdx-remote, next-themes, lucide-react.

**Spec:** `docs/superpowers/specs/2026-08-21-portfolio-redesign-design.md`

## Global Constraints

- **No test framework exists in this repo.** The acceptance harness built in Task 1 (`npm run verify`) plus `npm run build` and `npm run lint` are the test cycle. Every task ends by running them.
- **No invented content.** Every fact must trace to the CV (`CV ALIMPOLOS, DENNIS`, Canva `DAFgb4oifuE`) or verified GitHub history. No fabricated metrics, testimonials, or client logos.
- **Banned strings anywhere in `src/` or `content/`:** `TODO`, `20XX`, `Sample`, `sample-`, `example.com`, `hello@dabcas.dev`, `Add your`, `Institution`.
- **Contact email:** `imdennisalimpolos@gmail.com` (never `mr.dennisalimpolos@gmail.com`).
- **Payroll project:** no `links.live`, no `links.repo`, no screenshots. Case study only.
- **Reduced motion is mandatory.** Every motion primitive must render its final visual state immediately when `useReducedMotion()` is true.
- **Motion may only animate `transform` and `opacity`.**
- **Animated components are client components** (`"use client"`); pages remain Server Components.
- **`site.url`** stays the Vercel deployment URL — `dabcas.dev` is not owned.
- **Commit after every task.** Author `Dennis Alimpolos <imdennisalimpolos@gmail.com>`.

---

### Task 1: Acceptance harness

Builds the check script that every later task is verified against. Written first so it fails against the current placeholder content, then goes green as tasks land.

**Files:**
- Create: `scripts/verify-site.mjs`
- Modify: `package.json` (add `verify` script)

**Interfaces:**
- Consumes: nothing.
- Produces: `npm run verify` — exits 0 on pass, 1 with a printed failure list. Later tasks rely on this exact command.

- [ ] **Step 1: Write the failing check script**

Create `scripts/verify-site.mjs`:

```js
#!/usr/bin/env node
/**
 * Acceptance checks for the portfolio. This repo has no unit-test framework;
 * these assertions are the test cycle. Run with `npm run verify`.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const failures = [];
const fail = (msg) => failures.push(msg);

/** Every file under a directory, recursively, matching the given extensions. */
function walk(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full, exts);
    return exts.includes(extname(full)) ? [full] : [];
  });
}

const sourceFiles = [
  ...walk("src", [".ts", ".tsx", ".css"]),
  ...walk("content", [".mdx", ".md"]),
];

// --- 1. No placeholder text survives anywhere in shipped content ------------
const BANNED = [
  "TODO",
  "20XX",
  "Sample",
  "sample-",
  "example.com",
  "hello@dabcas.dev",
  "Add your",
];
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  for (const needle of BANNED) {
    if (text.includes(needle)) fail(`${file}: contains banned placeholder "${needle}"`);
  }
}

// --- 2. The wrong email must never ship ------------------------------------
for (const file of sourceFiles) {
  if (readFileSync(file, "utf8").includes("mr.dennisalimpolos@gmail.com")) {
    fail(`${file}: uses the wrong contact email`);
  }
}

// --- 3. Exactly the four real projects exist -------------------------------
const EXPECTED_PROJECTS = [
  "lopez-payroll",
  "merit-demerit-tracker",
  "sulyap-alumni",
  "sisters-and-mom-pastry",
];
const projectFiles = existsSync("content/projects")
  ? readdirSync("content/projects").filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""))
  : [];
for (const slug of EXPECTED_PROJECTS) {
  if (!projectFiles.includes(slug)) fail(`content/projects/${slug}.mdx is missing`);
}
for (const slug of projectFiles) {
  if (!EXPECTED_PROJECTS.includes(slug)) fail(`content/projects/${slug}.mdx is not an approved project`);
}

// --- 4. The payroll case study must not link the live app -----------------
const payrollPath = "content/projects/lopez-payroll.mdx";
if (existsSync(payrollPath)) {
  const payroll = readFileSync(payrollPath, "utf8");
  if (payroll.includes("lopez-industries-payroll-system.vercel.app")) {
    fail(`${payrollPath}: must not link the live payroll app (real employee wage data)`);
  }
}

// --- 5. The services page is gone; DABCAS is demoted -----------------------
if (existsSync("src/app/services")) fail("src/app/services still exists — it should be deleted");

// --- 6. Real facts are present in site.ts ---------------------------------
const sitePath = "src/lib/site.ts";
if (existsSync(sitePath)) {
  const siteSrc = readFileSync(sitePath, "utf8");
  const REQUIRED = [
    "imdennisalimpolos@gmail.com",
    "dennis-alimpolos-228753210",
    "Saint Paul American School",
    "Polytechnic University of the Philippines",
    "Mabalacat",
  ];
  for (const needle of REQUIRED) {
    if (!siteSrc.includes(needle)) fail(`${sitePath}: missing required fact "${needle}"`);
  }
} else {
  fail(`${sitePath} is missing`);
}

// --- 7. Every motion primitive honours reduced motion ---------------------
for (const file of walk("src/components/motion", [".tsx"])) {
  if (!readFileSync(file, "utf8").includes("useReducedMotion")) {
    fail(`${file}: motion primitive does not call useReducedMotion()`);
  }
}

if (failures.length > 0) {
  console.error(`\nverify-site: ${failures.length} failure(s)\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("");
  process.exit(1);
}
console.log("verify-site: all checks passed");
```

- [ ] **Step 2: Add the npm script**

In `package.json`, add to `"scripts"`:

```json
"verify": "node scripts/verify-site.mjs"
```

- [ ] **Step 3: Run it to verify it FAILS**

Run: `npm run verify`
Expected: FAIL. The sample projects, `hello@dabcas.dev`, the `TODO` comments and `src/app/services` all still exist, so it should report roughly a dozen failures.

- [ ] **Step 4: Commit**

```bash
git add scripts/verify-site.mjs package.json
git commit -m "test: add acceptance harness for portfolio content"
```

---

### Task 2: Real personal content in site.ts

Replaces every placeholder in the single source of truth, demotes DABCAS, and deletes the services page.

**Files:**
- Modify: `src/lib/site.ts` (full rewrite of the exported constants)
- Delete: `src/app/services/page.tsx` (and the now-empty `src/app/services/` directory)
- Modify: `src/components/site-footer.tsx:70-77` (footer credit line)

**Interfaces:**
- Consumes: `npm run verify` from Task 1.
- Produces: `site`, `nav`, `skills`, `bio`, `experience`, `education`, `approach` from `@/lib/site`.
  - `site.name: string`, `site.role: string`, `site.tagline: string`, `site.intro: string`, `site.location: string`, `site.timezone: string`, `site.availableForWork: boolean`, `site.availabilityNote: string`, `site.email: string`, `site.phone: string`, `site.socials: { github: string; linkedin: string }`, `site.resumeUrl: string`, `site.url: string`, `site.company: { name: string; descriptor: string; note: string }`
  - `nav: readonly { href: string; label: string }[]` — Work, About, Contact only.
  - `skills: readonly { group: string; items: readonly string[] }[]`
  - `bio: readonly string[]`
  - `experience: readonly { role: string; org: string; period: string; description: string }[]`
  - `education: readonly { title: string; org: string; period: string }[]`
  - `approach: readonly { title: string; description: string }[]` — **new export**, used by Task 6's "How I work" section.
  - `stats: readonly { value: number; suffix: string; label: string }[]` — **new export**, used by Task 6's counter row.
  - **`services` and `process` exports are removed.**

- [ ] **Step 1: Rewrite `src/lib/site.ts`**

Replace the entire file with:

```ts
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
```

- [ ] **Step 2: Delete the services page**

```bash
git rm -r src/app/services
```

- [ ] **Step 3: Update the footer credit line**

In `src/components/site-footer.tsx`, the footer currently reads `{site.company.tagline}` and credits DABCAS. Replace the `<div className="max-w-xs">` block (lines ~20-24) with:

```tsx
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {site.company.note}
            </p>
          </div>
```

and change the import on line 4 from `import { CompanyMark } from "@/components/logo";` to `import { Logo } from "@/components/logo";`.

Then change the copyright line (~line 72) from `© {new Date().getFullYear()} {site.company.name}. Built by {site.name}.` to:

```tsx
            © {new Date().getFullYear()} {site.name}.
```

- [ ] **Step 4: Fix the stale comment in `src/components/logo.tsx`**

Line 41 says `Used on /services and in the footer.` That page no longer exists. Change the doc comment to:

```tsx
/** Studio lockup: wordmark plus descriptor. Kept for the DABCAS footnote. */
```

- [ ] **Step 5: Run the checks**

Run: `npm run verify && npm run build`
Expected: `verify` still fails (sample projects remain — that's Task 3) but must no longer report any `site.ts`, email, or `src/app/services` failure. `build` must pass — if it errors about `services`, `process`, or `CompanyMark` being imported somewhere, fix that import.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "content: replace placeholder site data with real CV facts, demote DABCAS"
```

---

### Task 3: Four real case studies

Deletes the sample MDX and writes the real ones. This is where the engineering depth lives.

**Files:**
- Delete: `content/projects/sample-inventory-platform.mdx`, `content/projects/sample-mobile-companion.mdx`, `content/projects/sample-portfolio-site.mdx`
- Create: `content/projects/lopez-payroll.mdx`, `content/projects/merit-demerit-tracker.mdx`, `content/projects/sulyap-alumni.mdx`, `content/projects/sisters-and-mom-pastry.mdx`

**Interfaces:**
- Consumes: the frontmatter shape read by `readProject()` in `src/lib/projects.ts:47-68` — `title`, `summary`, `role`, `client`, `year`, `stack[]`, `highlights[]`, `featured`, `status`, `links{live,repo,caseStudy}`, `cover`, `order`.
- Produces: four slugs consumed by `generateStaticParams()` in `src/app/work/[slug]/page.tsx`: `lopez-payroll`, `merit-demerit-tracker`, `sulyap-alumni`, `sisters-and-mom-pastry`.

- [ ] **Step 1: Delete the samples**

```bash
git rm content/projects/sample-inventory-platform.mdx content/projects/sample-mobile-companion.mdx content/projects/sample-portfolio-site.mdx
```

- [ ] **Step 2: Write `content/projects/lopez-payroll.mdx`**

```mdx
---
title: "Payroll & Attendance System"
summary: "A DOLE-compliant payroll platform for a Philippine manufacturer, with a three-stage approval workflow and an audit trail that reconciles to the centavo."
role: "Solo developer"
client: "Lopez Industries"
year: 2026
order: 1
featured: true
status: live
stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Zustand", "React Hook Form", "Vercel"]
highlights:
  - "Replaced a spreadsheet payroll process for a workforce paid on multi-shift, project-tracked attendance"
  - "Found and fixed a race condition that could double-apply loan deductions to a worker's pay"
  - "Migrated ₱4.2M of purchase-order history reconciled to the centavo, behind 162 tests"
  - "Closed a security hole exposing all 59 database functions to the public API key"
links: {}
---

The system this replaced was a spreadsheet, and the money it moves belongs to people who
notice immediately when it is wrong. That shaped every decision in it.

## What it does

Attendance is encoded against multi-shift days — day, night and overtime, each with project
tracking and 1–16 hour validation — then flows into DOLE 2025 compliant payroll processing and
generated payslips. Nothing reaches an employee's pay without passing through three separate
hands: **Data Encoder → Auditor → Approver**.

That workflow is the product. A single person cannot both enter a number and approve it.

## The bug worth talking about

Approving a payroll run applies financial deductions — loan and cash-advance instalments.
The approve handler checked the run's status, then applied the deductions.

Two clicks arriving close together both passed the status check before either had written its
result. The deductions applied twice. A worker's loan instalment came out of their pay twice in
one run, and I found it in production.

The fix was to stop treating status as something you read and then act on, and start treating it
as something you *claim*:

- The transition from `audited` to `approved` is now an atomic conditional update. Whichever
  request wins the claim proceeds; the loser sees the run is no longer `audited` and stops.
- Deductions only ever run after a successful claim, so concurrent or repeated requests cannot
  re-apply them.
- Reverting a run to draft had exactly the same shape of bug, so it got the same treatment.

Reverting also had a second, quieter defect: it reversed deductions against *any* active service
belonging to the employee, which meant it could credit back an older written-off loan while
leaving the real one untouched. Reversal is now scoped to the specific service whose deduction
history contains the run being reverted.

## Getting the historical data in

The client had years of purchase orders and liquidations in spreadsheets, and the acceptance
condition was absolute: the migrated totals had to match the source **to the centavo**, with the
original values preserved verbatim rather than cleaned up.

Reconciling surfaced problems in the source data that nobody had known were there:

- 157 rows where the recorded subtotal did not equal quantity × cost — ₱46,745 of drift
- 34 duplicate purchase-request numbers
- ₱1.31M of labour cost recorded in a log but never carried into the financial totals

Original values live on in `legacy_*` columns so any figure can be traced back to the sheet it
came from. The migration runs behind 162 tests, and the money boundary is proven by script rather
than asserted.

## Locking down the database

Midway through, I checked what the public API key could actually reach and found that **all 59
Postgres functions were callable by the anonymous role** — the migrations had created them
without ever revoking execute.

Rather than patch the exposed ones, I rebuilt the permission model in three tiers: anonymous gets
nothing, the authenticated role gets the 35 identity and business functions it genuinely needs,
and the service role gets 5 sign-in and account functions. `ALTER DEFAULT PRIVILEGES` keeps future
functions locked by default, sensitive columns use column-level grants so the service role cannot
overwrite an email or a role, and regression tests assert the scopes do not silently widen again.

I rejected the quick versions of this fix — blanket grants, `SECURITY DEFINER` login functions,
moving the lockout into the browser — because each one trades a real boundary for a shorter diff.

## Status

Running in production. The live application is not linked here: it holds real employee wage data.
Happy to walk through the codebase in an interview.
```

- [ ] **Step 3: Write `content/projects/merit-demerit-tracker.mdx`**

```mdx
---
title: "Merit & Demerit Tracker"
summary: "A school behaviour tracking system built and deployed in one day, now used daily by more than 200 students, teachers and administrators."
role: "Solo developer"
client: "Saint Paul American School"
year: 2026
order: 2
featured: true
status: live
stack: ["Next.js", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "Cloudflare", "Vercel"]
highlights:
  - "Nothing to deployed in a single day using AI-assisted development"
  - "200+ students, teachers and administrators using it daily"
  - "Replaced paper slips with a record that can actually be reported on"
links:
  live: "https://md-system.vercel.app"
---

I teach at this school. The behaviour system was paper slips, which meant the record existed but
could never be looked at — no one could answer "has this been getting worse this term?" without
going through a drawer.

I built and deployed the replacement in a day.

## Why one day was possible

Not because the problem was trivial, but because I already knew it exactly. I was inside the
institution that had it: I knew who issued slips, who needed to see them, what the pastoral care
conversation actually needed to show, and which parts of the paper process were ritual rather than
requirement.

Most of what makes a build slow is discovering the domain. I skipped that, and AI tooling covered
the mechanical distance between a decision and working code. What remained was:

- A Postgres schema modelling merit and demerit events against students and issuing staff
- Role-separated access — teachers log, administrators report
- Views that answer the question the paper system couldn't: how is this student trending?

## What it changed

It went into daily use across 200+ students, teachers and administrators. The point isn't the
speed — it's that behaviour discussions now start from a record instead of a recollection.

## What I'd tell you in an interview

Shipping in a day is a claim about throughput, and throughput without judgement is a liability.
The reason I'm comfortable making it here is that this system's failure modes are mild: a
mislogged merit point is embarrassing, not expensive. When I build something where a mistake costs
someone money, I move differently — see the payroll case study.
```

- [ ] **Step 4: Write `content/projects/sulyap-alumni.mdx`**

```mdx
---
title: "SULyap Alumni Platform"
summary: "A private community platform for the UPIS Batch 1984 alumni network — authentication, member directory, events and media, for 170–200 active members."
role: "Solo developer"
client: "UPIS Batch 1984"
year: 2026
order: 3
featured: true
status: live
stack: ["Next.js", "React", "Supabase", "PostgreSQL", "Cloudinary", "Chart.js", "Tailwind CSS"]
highlights:
  - "170–200 active members with authenticated profiles and a searchable directory"
  - "137 commits over roughly a year of continuous iteration"
  - "Patched a React Server Components CVE across the dependency tree"
links:
  live: "https://sulyap84.vercel.app"
  repo: "https://github.com/Dalimpolos29/84sulyap"
---

A private space for a graduating batch to find each other again, decades on. The requirement that
shaped it: members are not technical, and the sign-up friction had to be near zero or the network
simply wouldn't populate.

## What it does

- **Authenticated membership** via Supabase SSR auth, with profiles members maintain themselves
- **Directory** with search, so people can actually find the classmate they're looking for
- **Events** with admin controls for the organisers
- **Media** — image upload with cropping through Cloudinary, and a lightbox gallery

## Decisions worth explaining

**Server-side auth over client-side session handling.** Supabase's SSR helpers keep the session on
the server, so a member's first paint is already authenticated rather than flickering through a
logged-out state. For a non-technical audience, that flicker reads as "it's broken."

**Cloudinary instead of rolling image handling.** Members upload photos from phones, at whatever
dimensions the phone produced. Transformation and delivery are a solved problem and not where this
project's value was.

## Keeping it safe

A React Server Components CVE landed affecting `next` and the `react-server-dom-*` packages. I
patched the dependency tree and verified the whole workspace rather than only the direct
dependency. It's a small thing, but a community platform holding personal details of 200 people
doesn't get to sit on a known advisory.

137 commits in, it's still running and still getting changes.
```

- [ ] **Step 5: Write `content/projects/sisters-and-mom-pastry.mdx`**

```mdx
---
title: "Sisters & Mom — Pastry PWA"
summary: "An installable progressive web app for a family pastry business: catalogue, ordering, checkout and push notifications for 100–130 customers."
role: "Solo developer"
client: "Sisters & Mom"
year: 2026
order: 4
featured: false
status: live
stack: ["Next.js", "TypeScript", "Supabase", "Web Push", "Resend", "Vercel"]
highlights:
  - "100–130 customers ordering through it"
  - "Installable PWA with web push, so re-engagement doesn't depend on email"
  - "Product variants grouped into single cards instead of duplicate listings"
links:
  live: "https://sistersandmom.site"
  repo: "https://github.com/Dalimpolos29/sm_pastry"
---

A family pastry business selling through chat messages and a spreadsheet. The goal was an ordering
flow their customers would actually use on a phone, without asking anyone to install anything from
an app store.

## Why a PWA

The customers are on mobile and mostly on Android. A progressive web app installs from the browser,
updates without a review process, and — the part that mattered commercially — supports **web push**.
A bakery's business is repeat custom, and "the ube cheesecake is back" reaching someone's lock
screen converts in a way an email never did.

## What it does

- Catalogue with categories, backed by Supabase with image storage
- Ordering and checkout with order tracking
- Web push notifications for new batches and order updates
- Transactional email via Resend

## A modelling decision that paid off

Products come in variants — half dozen and a dozen, small and large, per-piece. Modelled naively,
each variant is its own product, and the catalogue becomes six near-identical cards for one cake.

Variants are now grouped: one product card with a selector, one image, one description. That
collapsed the catalogue to something browsable on a phone screen and removed a whole class of
"which one of these is the actual product?" confusion.

Image handling got the same treatment — uploads replace cleanly, deleting the old file from
storage rather than orphaning it, and files are named after the product instead of a random
string, so the storage bucket stays legible to a human.
```

- [ ] **Step 6: Verify the projects render**

Run: `npm run verify && npm run build`
Expected: `verify` passes all project checks. `build` generates `/work/lopez-payroll`, `/work/merit-demerit-tracker`, `/work/sulyap-alumni`, `/work/sisters-and-mom-pastry` as SSG routes.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "content: replace sample projects with four real case studies"
```

---

### Task 4: Motion primitives — Reveal and Counter

The two reusable animation building blocks. Both must degrade to a static final state under reduced motion.

**Files:**
- Create: `src/components/motion/reveal.tsx`
- Create: `src/components/motion/counter.tsx`

**Interfaces:**
- Consumes: `motion` v13 (`motion/react`).
- Produces:
  - `<Reveal delay?: number, y?: number, className?: string>{children}</Reveal>` — entrance animation on scroll into view, fires once.
  - `<Counter value: number, suffix?: string, prefix?: string, className?: string />` — counts up to `value` when scrolled into view.
  - Both consumed by Tasks 6 and 7.

- [ ] **Step 1: Write `src/components/motion/reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Under reduced motion it renders the final state with no animation at all.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Write `src/components/motion/counter.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Counts up to `value` when scrolled into view. Under reduced motion the final
 * number is shown immediately.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const target = useMotionValue(0);
  const spring = useSpring(target, { duration: 1400, bounce: 0 });
  const display = useTransform(
    spring,
    (current) => `${prefix}${Math.round(current).toLocaleString()}${suffix}`,
  );

  useEffect(() => {
    if (reduced) {
      spring.jump(value);
      return;
    }
    if (inView) target.set(value);
  }, [inView, reduced, value, target, spring]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
    </span>
  );
}
```

- [ ] **Step 3: Verify they compile and pass the reduced-motion check**

Run: `npm run verify && npm run build`
Expected: PASS. Check 7 in the harness asserts every file under `src/components/motion/` calls `useReducedMotion` — both do.

- [ ] **Step 4: Commit**

```bash
git add src/components/motion
git commit -m "feat: add Reveal and Counter motion primitives"
```

---

### Task 5: The signature moment — PinnedGallery

A sticky section where project cards travel horizontally as the page scrolls vertically. Falls back to a vertical stack on small screens and under reduced motion.

**Files:**
- Create: `src/components/motion/pinned-gallery.tsx`

**Interfaces:**
- Consumes: `Project` type from `@/lib/projects`, `ProjectCard` from `@/components/project-card`.
- Produces: `<PinnedGallery projects: Project[] />`, consumed by Task 6.

- [ ] **Step 1: Write `src/components/motion/pinned-gallery.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

/**
 * Pins a row of project cards and slides them sideways as the user scrolls down.
 *
 * The outer element is tall; the inner one sticks to the viewport while that
 * height scrolls past, which is what converts vertical scroll into horizontal
 * travel. Below `md`, and whenever reduced motion is set, this degrades to a
 * plain vertical grid — pinned horizontal scrolling fights a phone's own
 * gestures and has no business being there.
 */
export function PinnedGallery({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Travel far enough that the last card lands fully on screen.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  const stack = (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );

  if (reduced) {
    return <div className="mx-auto w-full max-w-5xl px-6">{stack}</div>;
  }

  return (
    <>
      {/* Small screens: no pinning. */}
      <div className="mx-auto w-full max-w-5xl px-6 md:hidden">{stack}</div>

      {/* md and up: the pinned horizontal travel. */}
      <div ref={ref} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-[8vw]">
            {projects.map((project) => (
              <div key={project.slug} className="w-[68vw] shrink-0 lg:w-[42vw]">
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run verify && npm run build`
Expected: PASS, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/pinned-gallery.tsx
git commit -m "feat: add pinned horizontal project gallery"
```

---

### Task 6: Home page scroll narrative

Assembles the primitives into the home page defined in spec §4.

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Reveal`, `Counter`, `PinnedGallery`, `getAllProjects()`, and `site`, `stats`, `skills`, `approach` from `@/lib/site`.
- Produces: the `/` route.

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Counter } from "@/components/motion/counter";
import { PinnedGallery } from "@/components/motion/pinned-gallery";
import { Reveal } from "@/components/motion/reveal";
import { AvailabilityBadge, ButtonLink, Chip, Container, Section } from "@/components/ui";
import { getAllProjects } from "@/lib/projects";
import { approach, site, skills, stats } from "@/lib/site";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden="true" />
        <Container className="relative py-20 sm:py-28">
          <Reveal>
            {site.availableForWork && <AvailabilityBadge label={site.availabilityNote} />}
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
              {site.tagline}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-fg-muted">{site.intro}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/work">
                See what I&apos;ve shipped
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Proof counters */}
      <section className="border-b border-border bg-surface py-14">
        <Container>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <div>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="block text-4xl font-semibold tracking-tight sm:text-5xl"
                    />
                    <span className="mt-2 block text-sm leading-snug text-fg-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Signature moment */}
      <section className="border-b border-border py-16 sm:py-20">
        <Container className="mb-10">
          <Reveal>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Selected work
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">Four systems people use daily</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
              Payroll, school administration, an alumni network and an ordering app. Each write-up
              covers the problem, the decisions and what shipped.
            </p>
          </Reveal>
        </Container>

        <PinnedGallery projects={projects} />

        <Container className="mt-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            All projects
            <ArrowRight className="size-4" />
          </Link>
        </Container>
      </section>

      {/* How I work */}
      <Section eyebrow="How I work" title="Fast, and accountable for it" className="bg-surface">
        <div className="grid gap-8 md:grid-cols-3">
          {approach.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="border-t border-border pt-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Teaching */}
      <Section eyebrow="Teaching" title="I teach the thing I build" className="border-t border-border">
        <Reveal>
          <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-fg-muted">
            <p>
              I&apos;m a STEAM technology teacher at Saint Paul American School, where I teach AI,
              web development, programming and robotics to high school students.
            </p>
            <p>
              It&apos;s also why the school systems here exist. I didn&apos;t have to interview
              anyone to learn how the merit and demerit process worked — I was inside it. Being the
              user and the developer at once removes the slowest part of building software for an
              institution.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Toolkit */}
      <Section
        eyebrow="Toolkit"
        title="What I build with"
        className="border-t border-border bg-surface"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, index) => (
            <Reveal key={group.group} delay={index * 0.06}>
              <div>
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Chip>{item}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="border-t border-border bg-surface">
        <Reveal>
          <div className="rounded-(--radius-card) border border-border bg-bg p-8 sm:p-12">
            <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
              I&apos;m looking for a developer role.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
              If you need someone who ships quickly and can still explain every decision six months
              later, I&apos;d like to talk.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact">
                Get in touch
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run verify && npm run build && npm run lint`
Expected: all PASS.

- [ ] **Step 3: Visual check**

Run: `npm run dev`
Open `http://100.102.48.81:3000`. Confirm: counters count up on scroll; the project row travels sideways while pinned; nothing jumps or overlaps.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rebuild home page as a scroll-driven narrative"
```

---

### Task 7: About page

Adds the teaching story and the self-taught framing, and animates the existing structure.

**Files:**
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `bio`, `education`, `experience`, `site`, `skills` from `@/lib/site`; `Reveal` from `@/components/motion/reveal`.
- Produces: the `/about` route.

- [ ] **Step 1: Wrap the About sections in Reveal**

In `src/app/about/page.tsx`, add the import:

```tsx
import { Reveal } from "@/components/motion/reveal";
```

Wrap the bio paragraph block, the Experience `<section>`, and the Education `<section>` each in a `<Reveal>`. For the experience list, wrap each `<li>` body in a `Reveal` with a staggered delay:

```tsx
              {experience.map((item, index) => (
                <li key={`${item.org}-${item.period}`} className="border-l-2 border-border pl-5">
                  <Reveal delay={index * 0.08}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-medium">
                        {item.role}
                        <span className="text-fg-muted"> · {item.org}</span>
                      </h3>
                      <span className="font-mono text-xs text-fg-subtle">{item.period}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
                  </Reveal>
                </li>
              ))}
```

- [ ] **Step 2: Add the DABCAS footnote**

Immediately after the closing `</section>` of the Education block, add:

```tsx
          <section className="mt-14 rounded-(--radius-card) border border-border bg-surface p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              Freelance
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {site.company.note} It&apos;s how the client work above is invoiced — I&apos;m looking
              for a full-time role, and freelance projects continue alongside it.
            </p>
          </section>
```

- [ ] **Step 3: Verify**

Run: `npm run verify && npm run build && npm run lint`
Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: rework About with teaching story and motion"
```

---

### Task 8: Final acceptance pass

**Files:**
- Modify: `README.md` (describe the real project)
- Possibly modify: any file failing a check below.

**Interfaces:**
- Consumes: everything above.
- Produces: a branch ready for review.

- [ ] **Step 1: Update the README**

Replace the "Live at dabcas.dev" claim (it does not resolve) and the two-files-you'll-edit section with an accurate description: the site is Dennis Alimpolos's portfolio, content lives in `src/lib/site.ts` and `content/projects/*.mdx`, motion primitives live in `src/components/motion/`, and `npm run verify` is the acceptance check.

- [ ] **Step 2: Run the whole suite**

```bash
npm run verify && npm run lint && npm run build
```
Expected: all three pass, and the build lists exactly these routes: `/`, `/_not-found`, `/about`, `/api/contact`, `/contact`, `/robots.txt`, `/sitemap.xml`, `/work`, `/work/lopez-payroll`, `/work/merit-demerit-tracker`, `/work/sisters-and-mom-pastry`, `/work/sulyap-alumni`. There must be **no** `/services` route.

- [ ] **Step 3: Reduced-motion check**

In the browser dev tools, emulate `prefers-reduced-motion: reduce`, then reload `http://100.102.48.81:3000`.
Expected: every section is visible immediately, counters show their final numbers, projects render as a vertical grid, nothing animates.

- [ ] **Step 4: Mobile check**

Set the viewport to 375px wide.
Expected: no horizontal scrolling of the page body; the pinned gallery is replaced by the stacked grid.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "docs: update README for the rebuilt portfolio"
```
