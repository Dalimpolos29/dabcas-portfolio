import type { Metadata } from "next";
import { ArrowRight, Download, GraduationCap, Rocket, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { AvailabilityBadge, ButtonLink, Chip, Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { bio, education, experience, highlights, site, skills } from "@/lib/site";

const highlightIcons = { rocket: Rocket, school: GraduationCap, shield: ShieldCheck } as const;

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — ${site.role} based in ${site.location}. Background, stack and how I work.`,
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <Eyebrow>About</Eyebrow>
        <h1 className="font-display text-4xl leading-[1.02] sm:text-5xl">
          Hi, I&apos;m <span className="text-brand">{site.shortName}</span>.
        </h1>
        <p className="mt-2 text-[15px] text-fg-muted">
          {site.role} · {site.location}
        </p>
        {site.availableForWork && (
          <div className="mt-5">
            <AvailabilityBadge label={site.availabilityNote} />
          </div>
        )}
      </header>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_16rem] lg:gap-16">
        <div>
          <Reveal>
            <div className="space-y-4 text-[17px] leading-relaxed text-fg-muted">
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = highlightIcons[item.icon];
              return (
                <Reveal key={item.label} delay={index * 0.08} className="h-full">
                  <div className="lift h-full rounded-(--radius-card) border border-border bg-surface p-5">
                    <span className="bg-brand inline-flex size-10 items-center justify-center rounded-xl text-[#022c29]">
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-4 text-sm font-medium leading-snug">{item.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <section className="mt-14">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Experience
              </h2>
              <ol className="mt-6 space-y-8">
                {experience.map((item, index) => (
                  <li
                    key={`${item.org}-${item.period}`}
                    className="relative border-l-2 border-border pl-6 before:absolute before:-left-[7px] before:top-1.5 before:size-3 before:rounded-full before:bg-aqua before:ring-4 before:ring-bg"
                  >
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
              </ol>
            </section>
          </Reveal>

          {education.length > 0 && (
            <Reveal>
              <section className="mt-14">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                  Education
                </h2>
                <ul className="mt-6 space-y-4">
                  {education.map((item) => (
                    <li
                      key={item.title}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-4"
                    >
                      <div>
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        <p className="text-sm text-fg-muted">{item.org}</p>
                      </div>
                      <span className="font-mono text-xs text-fg-subtle">{item.period}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          <section className="mt-14 flex items-center gap-4 rounded-(--radius-card) border border-border bg-surface p-5">
            <LogoMark className="size-11 shrink-0" />
            <p className="text-sm leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">{site.company.name}</span> is my freelance
              practice — client work continues alongside a full-time role.
            </p>
          </section>

          <div className="mt-14 flex flex-wrap gap-3">
            <ButtonLink href="/contact">
              Get in touch
              <ArrowRight className="size-4" />
            </ButtonLink>
            {site.resumeUrl && (
              <ButtonLink href={site.resumeUrl} variant="secondary">
                <Download className="size-4" />
                Download résumé
              </ButtonLink>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">Stack</h2>
          <div className="mt-5 space-y-6">
            {skills.map((group) => (
              <div key={group.group}>
                <h3 className="mb-2.5 text-sm font-medium">{group.group}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Chip>{item}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Container>
  );
}
