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
        <div
          className="pointer-events-none absolute inset-0 bg-rules bg-rules-fade opacity-40"
          aria-hidden="true"
        />
        <Container className="relative py-20 sm:py-28">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="field text-accent">{site.name}</p>
              {site.availableForWork && <AvailabilityBadge label={site.availabilityNote} />}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-8 max-w-4xl font-display text-[2.6rem] leading-[0.98] tracking-[-0.035em] sm:text-6xl md:text-7xl">
              {site.tagline}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl border-l-2 border-accent pl-5 text-[17px] leading-relaxed text-fg-muted">
              {site.intro}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
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

      {/* Proof counters — read as a ledger column, figures right-aligned */}
      <section className="border-b border-border bg-surface">
        <Container>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 0.08}
                className="border-b border-border px-1 py-7 sm:px-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:first:pl-1"
              >
                <div className="flex items-baseline justify-between gap-4 lg:block">
                  <dt className="field lg:mb-3">{stat.label}</dt>
                  <dd>
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="block font-mono text-3xl font-medium tracking-tight text-accent tabular-nums sm:text-4xl"
                    />
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
            <p className="field mb-4 flex items-center gap-3 text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              Selected work
            </p>
            <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl">
              Four systems people use daily
            </h2>
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
            <h2 className="max-w-2xl font-display text-3xl leading-[1.05] sm:text-4xl">
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
