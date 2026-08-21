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
