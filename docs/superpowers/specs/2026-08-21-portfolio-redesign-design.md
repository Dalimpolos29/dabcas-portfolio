# Portfolio Redesign — Design Spec

**Date:** 2026-08-21
**Repo:** `Dalimpolos29/dabcas-portfolio` → branch `portfolio-rebuild`
**Goal:** A scroll-animated personal portfolio that wins Dennis Alimpolos a developer role.

---

## 1. Decisions made (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Base | Adapt existing repo, not rebuild | Repo builds clean, has SEO/a11y/MDX/theming already. Local copy was broken and untracked. |
| Audience | Remote-first, PH-friendly | Reads to both; engineering leads, local context as proof not framing. |
| Headline framing | AI-assisted speed | Matches his current CV positioning ("AI-assisted Full-Stack Developer"). |
| Proof framing | Depth-first | Case studies carry engineering substance so a skeptical reviewer finds it. |
| Teaching | Included, as an asset | Domain insider who builds the software his own school runs on. Never in the hero. |
| DABCAS | Demoted | One line in About + footer. `/services` deleted. |
| Payroll client | Case study only | App is publicly reachable and holds real wage data. No live link. |
| Motion | Kinetic, one signature moment | Pinned horizontal project scroll + scrub counters; restraint elsewhere. |
| Animation lib | `motion` v13 (Framer Motion) | Already shipped in `84sulyap`; one mental model; handles pinning via sticky + `useScroll`. |
| Contact email | `imdennisalimpolos@gmail.com` | Matches current CV. |
| Domain | Vercel URL for now | `dabcas.dev` does not resolve — Dennis does not own it. `site.url` defaults to the Vercel deployment URL; swapping in a custom domain later is a one-line change in `src/lib/site.ts`. Not a blocker. |

---

## 2. Source of truth for content

All personal facts come from the Canva CV **"CV ALIMPOLOS, DENNIS"** (design `DAFgb4oifuE`, updated 2026-08-18)
and verified GitHub/Hindsight data. No invented content. No placeholder projects.

**Person**
- Dennis Alimpolos — Dau, Mabalacat, Pampanga, Philippines (GMT+8)
- `imdennisalimpolos@gmail.com` · +63 976 157 1657
- LinkedIn: `dennis-alimpolos-228753210` · GitHub: `Dalimpolos29`

**Experience (newest first)**
1. **STEAM Teacher (Technology)** — Saint Paul American School, Clark, Pampanga. Current.
   Teaches AI, web development, programming, robotics. Uses n8n and Claude with students.
   Builds internal school systems (attendance, scoring, robotics curriculum).
2. **AI-Assisted Full-Stack Developer (Freelance)** — 2023–Present.
   Payroll & Attendance, Merit & Demerit, Alumni Platform, Pastry PWA.
3. **Technical Support Specialist** — Apple / HelpFlow.

**Education**
- Polytechnic University of the Philippines — Bachelor in Business Teacher Education, 2009–2013
- Justice Cecilia Muñoz Palma HS, 2005–2009

Self-taught as a developer. Stated plainly, not hidden — four shipped products is the counter-argument to a non-CS degree.

---

## 3. Projects (4 real case studies, sample MDX deleted)

| Project | Users | Live | Repo |
|---|---|---|---|
| Lopez Industries Payroll & Attendance | 6+ staff | **no link** (real wage data) | private |
| Merit & Demerit Tracker | 200+ students, teachers, admins | md-system.vercel.app | private |
| SULyap Alumni Platform | 170–200 active | sulyap84.vercel.app | public |
| Sisters & Mom Pastry PWA | 100–130 customers | sistersandmom.site | public |

**Depth material available (verified from commits/Hindsight):**
- *Payroll* — race condition on concurrent approval re-applying loan/CA deductions; fixed by claiming
  `audited→approved` atomically before applying financial effects. Revert path made atomic the same way.
  Real incident 2026-07-17. DOLE 2025 compliance. Encoder → Auditor → Approver workflow.
  Serverless PDF payslips (`puppeteer-core` + `@sparticuz/chromium-min`). 165 commits.
- *Payroll/procurement DB* — migration reconciled to the centavo (PO Log ₱4,219,847.77,
  Liquidation ₱581,768.15); 162 tests; found 157 rows where subtotal ≠ qty × cost (₱46,745),
  34 duplicate PR numbers, ₱1.31M unrecorded labour. Legacy values preserved verbatim in `legacy_*` fields.
- *Payroll security* — found all 59 Postgres functions callable by the public anon key; implemented
  three-tier permissions (anon none / authenticated 35 / service_role 5) with `ALTER DEFAULT PRIVILEGES`,
  column-level grants, and regression tests asserting scopes don't silently widen.
- *SULyap* — 137 commits; Supabase SSR auth, Cloudinary, chart.js; patched a React Server Components CVE.
- *Pastry* — 36 commits; web-push notifications, Resend, product variant grouping, Supabase storage.

Numbers beat adjectives. Every highlight must be traceable to the above.

---

## 4. Site structure

```
/                 scroll narrative (all kinetic work lives here)
/work             all four projects
/work/[slug]      case study, depth-first
/about            bio, timeline, education, teaching, skills
/contact          form (Resend, already built)
```

`/services` is **deleted**. DABCAS survives as one About line + a footer note.

### Home scroll sequence
1. **Hero** — name, "AI-Assisted Full-Stack Developer", speed claim. Availability badge. Restrained entrance only.
2. **Proof counters** — scrub up on enter: `200+` users on one system · `4` shipped products · `3` live in production · `338` commits.
3. **Signature moment** — pinned section; four project cards travel horizontally as the user scrolls vertically.
4. **How I work** — the AI-assisted method, honestly stated, ending on ownership ("I read every line that ships").
5. **Toolkit** — skills grid, staggered reveal.
6. **Teaching** — short, as domain advantage.
7. **Contact CTA**.

---

## 5. Motion architecture

- Library: `motion` v13. Animated pieces are **client components only**; pages stay RSC.
- Primitives live in `src/components/motion/`:
  - `Reveal` — entrance fade/translate via `whileInView`, `once: true`.
  - `Counter` — scroll-scrubbed number count-up.
  - `PinnedGallery` — sticky container + `useScroll`/`useTransform` for the horizontal project travel.
- **Reduced motion is mandatory.** Every primitive reads `useReducedMotion()` and renders the final
  state immediately when set. `globals.css` already kills CSS transitions under the media query.
- **Mobile:** `PinnedGallery` falls back to a normal vertical stack below `md` — pinned horizontal
  scroll on a phone fights the browser's own gestures.
- **Budget:** no layout-thrashing properties. Transform and opacity only.

---

## 6. Non-goals

- No CMS, no blog, no analytics, no i18n.
- No live link or screenshots for the payroll app.
- No fabricated metrics, testimonials, or logos.
- No `/services` page.

---

## 7. Testing & acceptance

- `npm run build` passes with zero TypeScript errors.
- `npm run lint` clean.
- Every route renders: `/`, `/work`, `/work/[slug]` ×4, `/about`, `/contact`, 404.
- No placeholder text (`TODO`, `20XX`, `Sample`, `example.com`) anywhere in `src/` or `content/`.
- Reduced-motion: with the OS setting on, no element animates and all content is visible.
- Mobile viewport (375px): no horizontal body scroll.
- Manual preview at `http://100.102.48.81:3000`.
