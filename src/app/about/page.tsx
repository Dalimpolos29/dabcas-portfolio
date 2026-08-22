import type { Metadata } from "next";
import { ArrowRight, Download } from "lucide-react";
import { AvailabilityBadge, ButtonLink, Chip, Container } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { bio, education, experience, site, skills } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — ${site.role} based in ${site.location}. Background, stack and how I work.`,
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">About</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">{site.name}</h1>
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
            <div className="space-y-5 text-[16px] leading-relaxed text-fg-muted">
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <section className="mt-14">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Experience
              </h2>
              <ol className="mt-6 space-y-8">
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

          <section className="mt-14 rounded-(--radius-card) border border-border bg-surface p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              Freelance
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {site.company.note} It&apos;s how the client work above is invoiced — I&apos;m looking
              for a full-time role, and freelance projects continue alongside it.
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
