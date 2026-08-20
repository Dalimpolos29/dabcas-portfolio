import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { CompanyMark } from "@/components/logo";
import { ButtonLink, Container, Section } from "@/components/ui";
import { process, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `${site.company.name} — ${site.company.tagline} Web and mobile application development by ${site.name}.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden="true" />
        <Container className="relative py-16 sm:py-20">
          <CompanyMark />
          <h1 className="mt-8 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {site.company.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-fg-muted">
            {site.company.pitch}
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact">
              Start a project
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section eyebrow="Services" title="What I take on">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-(--radius-card) border border-border bg-surface p-6"
            >
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-fg-muted">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Process"
        title="How a project runs"
        description="Predictable and written down, so you always know what happens next."
        className="border-t border-border bg-surface"
      >
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, index) => (
            <li key={step.title}>
              <div className="flex size-8 items-center justify-center rounded-lg bg-accent-soft font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-border">
        <div className="rounded-(--radius-card) border border-border bg-surface p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold sm:text-3xl">Have something you need built?</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
            Tell me what you&apos;re trying to do and roughly when you need it. I&apos;ll tell you
            honestly whether I&apos;m the right person for it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">
              Start a conversation
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="secondary">
              {site.email}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
