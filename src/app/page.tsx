import Link from "next/link";
import { ArrowRight, Eye, GraduationCap, ShieldCheck, Sparkle, Zap } from "lucide-react";
import { Counter } from "@/components/motion/counter";
import { HeroReel } from "@/components/motion/hero-reel";
import { PinnedGallery } from "@/components/motion/pinned-gallery";
import { Reveal } from "@/components/motion/reveal";
import { AvailabilityBadge, ButtonLink, Container, Eyebrow } from "@/components/ui";
import { getAllProjects } from "@/lib/projects";
import { approach, site, skills, stats } from "@/lib/site";

const approachIcons = { zap: Zap, shield: ShieldCheck, eye: Eye } as const;

const toolkit = skills.flatMap((group) => group.items);

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      {/* Hero — short copy on the left, the HyperFrames reel on the right */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="aurora aurora-a -left-40 -top-40 size-[34rem]" />
          <div className="aurora aurora-b -bottom-48 right-0 size-[30rem]" />
        </div>

        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-24">
          <div>
            <Reveal>
              {site.availableForWork && <AvailabilityBadge label={site.availabilityNote} />}
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 font-display text-[2.6rem] leading-[0.98] tracking-[-0.035em] sm:text-6xl">
                I build <span className="text-brand">web systems</span> people run on every day.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-fg-muted">{site.intro}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/work">
                  See my work
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Get in touch
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={24}>
            <div className="relative mx-auto w-full max-w-[30rem]">
              <div
                aria-hidden="true"
                className="bg-brand absolute -inset-3 rounded-[2rem] opacity-30 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-aqua/40 bg-[#021a18] shadow-2xl">
                <HeroReel className="block aspect-square w-full" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Proof counters */}
      <section className="border-b border-border bg-surface">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 0.08}
                className="flex flex-col-reverse border-border px-2 py-8 text-center odd:border-r lg:border-r lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
              >
                <dt className="field mt-2">{stat.label}</dt>
                <dd>
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-brand block font-display text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl"
                  />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Selected work */}
      <section className="border-b border-border py-16 sm:py-20">
        <Container className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl">
              Four systems, in daily use
            </h2>
          </Reveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            All projects
            <ArrowRight className="size-4" />
          </Link>
        </Container>

        <PinnedGallery projects={projects} />
      </section>

      {/* How I work — icon tiles, one line each */}
      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <Eyebrow>How I work</Eyebrow>
            <h2 className="mb-10 font-display text-3xl leading-[1.05] sm:text-4xl">
              Fast, and accountable for it
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {approach.map((item, index) => {
              const Icon = approachIcons[item.icon];
              return (
                <Reveal key={item.title} delay={index * 0.08} className="h-full">
                  <div className="lift h-full rounded-(--radius-card) border border-border bg-bg p-6">
                    <span className="bg-brand inline-flex size-11 items-center justify-center rounded-xl text-[#022c29]">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-4 flex items-center gap-4 rounded-(--radius-card) border border-border bg-bg p-5 sm:p-6">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <GraduationCap className="size-5" />
              </span>
              <p className="text-[15px] text-fg-muted">
                <span className="font-semibold text-fg">I teach what I build.</span> STEAM teacher
                at Saint Paul American School — AI, web dev and robotics.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Toolkit — a moving ticker instead of a wall of lists */}
      <section className="border-y border-border py-10" aria-label="Toolkit">
        <div className="marquee overflow-hidden">
          <ul className="marquee-track flex w-max items-center gap-8">
            {[...toolkit, ...toolkit].map((item, index) => (
              <li
                key={`${item}-${index}`}
                aria-hidden={index >= toolkit.length ? true : undefined}
                className="flex items-center gap-8 font-display text-2xl font-bold whitespace-nowrap text-fg-subtle sm:text-3xl"
              >
                {item}
                <Sparkle className="size-4 text-aqua" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="bg-brand relative overflow-hidden rounded-[1.75rem] p-10 text-center sm:p-14">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.35),transparent_50%)]"
              />
              <h2 className="relative font-display text-3xl leading-[1.05] text-[#022c29] sm:text-5xl">
                Hiring a developer?
              </h2>
              <p className="relative mt-3 text-[16px] text-[#022c29]/80">Let&apos;s talk.</p>
              <div className="relative mt-8">
                <ButtonLink
                  href="/contact"
                  className="bg-[#022c29]! text-white! hover:bg-[#04423d]!"
                >
                  Get in touch
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
