# dabcas-portfolio

Personal portfolio for **Dennis Alimpolos** — built for job applications, with DABCAS (the
freelance practice) as a footnote on the same site rather than a separate one.

## Stack

| Concern   | Choice                                  |
| --------- | ---------------------------------------- |
| Framework | Next.js 16 (App Router, RSC)             |
| Language  | TypeScript                               |
| Styling   | Tailwind CSS v4 + CSS custom properties  |
| Content   | MDX files in `content/projects/`         |
| Motion    | `motion` (Framer Motion's successor)     |
| Icons     | lucide-react                             |
| Theming   | next-themes (light / dark / system)      |
| Hosting   | Vercel                                    |

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
npm run verify   # acceptance check — see below
```

## Content: the two places you'll edit

### `src/lib/site.ts` — everything about you

Name, role, tagline, location, availability, headline stats, skills, experience, education,
email and social links. **Most personal facts live here, not scattered through components** —
changing a fact in this file updates every place it's used. A few pieces of page-specific prose
(the teaching paragraphs and "Four systems people use daily" on the home page, the freelance
sentence on the about page) are written directly into their pages rather than sourced from here.

`site.url` currently points at the Vercel-assigned URL. Adding a custom domain later is a
one-line change to that field plus the corresponding domain configuration in Vercel.

### `content/projects/*.mdx` — case studies

One file per project. The filename becomes the URL slug (`inventory.mdx` → `/work/inventory`).
Frontmatter drives the project cards and ordering (`title`, `summary`, `stack`, `highlights`,
`order`, `featured`, `status`, `links`); everything below the frontmatter is the case study body,
rendered as GitHub-flavoured markdown plus one custom component, `<Callout>`.

There are currently four case studies: `lopez-payroll`, `merit-demerit-tracker`,
`sulyap-alumni`, and `sisters-and-mom-pastry`. The Lopez Industries payroll system is
deliberately **case-study only** — the deployed app is publicly reachable but holds real
employee wage data, so its `links` are intentionally empty and the case study must never link
to it.

## Motion primitives

`src/components/motion/` holds three primitives — `Reveal`, `Counter`, and `PinnedGallery` —
used throughout the site for scroll-triggered animation. All three call `useReducedMotion()`
and honour `prefers-reduced-motion: reduce`: under reduced motion, content renders in its final
state immediately (no fade-in, counters show their end value, the pinned gallery degrades to a
plain vertical grid) with no perceived motion. This is a hard requirement, verified by
`npm run verify` (see below), not a nicety.

## `npm run verify` — the acceptance check

This repo has no unit-test framework; `scripts/verify-site.mjs` is the test cycle, run via
`npm run verify`. It checks that:

- No placeholder text (`TODO`, sample content, `example.com`, etc.) ships in `src/` or `content/`.
- The wrong contact email never ships.
- Exactly the four real case studies exist in `content/projects/` — no samples, no extras.
- The Lopez Industries case study never links the live payroll app.
- `src/app/services` does not exist (the services page was removed; DABCAS is a footnote, not
  a second product line).
- Required real facts (email, LinkedIn, schools, location) are present in `src/lib/site.ts`.
- Every motion primitive in `src/components/motion/` calls `useReducedMotion()`.

Run it alongside `npm run lint` and `npm run build` before shipping any change.

## Contact form

`POST /api/contact` validates input, filters bots with a honeypot field, and sends through
[Resend](https://resend.com) when configured. Copy `.env.example` to `.env.local` and fill in
the three variables, then add the same values in Vercel → Settings → Environment Variables.

If they're not set, the form returns a clear message pointing visitors at your email address
rather than pretending the message went through.

## Deploying

The site is hosted on Vercel. Push a branch and import the repo at
[vercel.com/new](https://vercel.com/new) — Next.js is detected automatically, no build
configuration needed. There is no custom domain configured; the live URL is whatever Vercel
assigns the project, and that value lives in `site.url` in `src/lib/site.ts`.

## Project structure

```
content/projects/       Case studies (MDX). Add a file, get a page.
public/                 Static assets — résumé PDF, project screenshots
src/app/                Routes: /, /work, /work/[slug], /about, /contact, /api/contact
src/components/         Header, footer, cards, UI primitives
src/components/motion/  Reveal, Counter, PinnedGallery — reduced-motion-aware
src/lib/site.ts         All personal + brand configuration
src/lib/projects.ts     Reads and sorts the MDX files
scripts/verify-site.mjs Acceptance checks run by `npm run verify`
```
