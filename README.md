# dabcas-portfolio

Personal portfolio and studio site for **Dennis Alimpolos** — built for job applications, with
**DABCAS** (the freelance practice) as a first-class part of the site rather than a separate one.

Live at [dabcas.dev](https://dabcas.dev).

## Stack

| Concern    | Choice                                     |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 16 (App Router, RSC)               |
| Language   | TypeScript                                 |
| Styling    | Tailwind CSS v4 + CSS custom properties    |
| Content    | MDX files in `content/projects/`           |
| Icons      | lucide-react                               |
| Theming    | next-themes (light / dark / system)        |
| Hosting    | Vercel                                     |

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## The two files you'll edit most

### `src/lib/site.ts` — everything about you

Name, role, tagline, location, availability, the DABCAS brand copy, services, process, skills,
experience, education, email and social links. **No component hardcodes personal information**, so
changing anything here updates the whole site.

Look for `TODO:` comments — those mark the placeholders that still need your real details:

- `email` — currently `hello@dabcas.dev`; point it at a real inbox
- `socials.linkedin` — empty, so the link is hidden until you add it
- `resumeUrl` — expects a PDF at `public/dennis-alimpolos-cv.pdf`
- `experience` / `education` — sample entries to replace

Set `availableForWork: false` when you stop looking; the badges disappear everywhere at once.

### `content/projects/*.mdx` — your projects

One file per project. The filename becomes the URL (`inventory.mdx` → `/work/inventory`).

```mdx
---
title: "Inventory Platform"
summary: "One sentence. Shows on cards and in search results."
role: "Solo developer"
client: "Acme Retail"       # or "Personal project"
year: 2026
order: 1                     # lower numbers appear first
featured: true               # featured projects lead the homepage
status: live                 # live | in-progress | archived
stack: ["Next.js", "PostgreSQL", "Prisma"]
highlights:                  # 2–4 outcomes; numbers beat adjectives
  - "Cut reconciliation time from 6 hours to 20 minutes"
links:
  live: "https://example.com"
  repo: "https://github.com/you/repo"
---

## The problem

Markdown from here down. GitHub-flavoured markdown is supported, plus one
custom component:

<Callout>Use this for a pull-quote or an important aside.</Callout>
```

Three `sample-*.mdx` files ship with the repo so you can see the layout working. **Delete them
before publishing** — they're clearly labelled as samples, but they describe work that isn't yours.

Screenshots go in `public/projects/` and are referenced with `cover: "/projects/name.png"`. Without
a cover, cards fall back to a labelled placeholder, so the grid stays tidy either way.

## Design tokens

The palette lives at the top of `src/app/globals.css` as CSS custom properties. Change `--accent`
(and its dark-mode counterpart) to re-skin the site — every component reads the tokens and nothing
hardcodes a hex value.

The `D` monogram in `src/components/logo.tsx` does double duty: Dennis and DABCAS share an initial,
so one mark carries both the personal portfolio and the studio brand.

## Contact form

`POST /api/contact` validates input, filters bots with a honeypot field, and sends through
[Resend](https://resend.com) when configured. Copy `.env.example` to `.env.local` and fill in the
three variables, then add the same values in Vercel → Settings → Environment Variables.

If they're not set, the form returns a clear message pointing visitors at your email address rather
than pretending the message went through.

## Deploying

1. Push this branch and import the repo at [vercel.com/new](https://vercel.com/new) — Next.js is
   detected automatically, no build configuration needed.
2. In Vercel → Settings → Domains, add `dabcas.dev` and `www.dabcas.dev`.
3. In Cloudflare DNS for `dabcas.dev`:
   - `A` record, name `@`, value `76.76.21.21`, proxy status **DNS only (grey cloud)**
   - `CNAME` record, name `www`, value `cname.vercel-dns.com`, proxy status **DNS only**

   The grey cloud matters. Cloudflare's proxy in front of Vercel double-proxies the request and
   commonly causes redirect loops and stale caching. Let Vercel terminate TLS.
4. Verify the exact record values in Vercel's domain panel — it prints them for your project, and
   Vercel's shared IP does change occasionally.

## Project structure

```
content/projects/       Case studies (MDX). Add a file, get a page.
public/                 Static assets — résumé PDF, project screenshots
src/app/                Routes: /, /work, /work/[slug], /about, /services, /contact
src/app/api/contact/    Contact form handler
src/components/         Header, footer, cards, UI primitives
src/lib/site.ts         All personal + brand configuration
src/lib/projects.ts     Reads and sorts the MDX files
```
