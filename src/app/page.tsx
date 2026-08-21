import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { AvailabilityBadge, ButtonLink, Chip, Container, Section } from "@/components/ui";
import { getFeaturedProjects } from "@/lib/projects";
import { site, skills } from "@/lib/site";

export default function HomePage() {
  const projects = getFeaturedProjects(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden="true" />
        <Container className="relative py-20 sm:py-28">
          {site.availableForWork && <AvailabilityBadge label={site.availabilityNote} />}

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
            {site.tagline}
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-fg-muted">{site.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/work">
              View my work
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Based in</dt>
              <dd className="mt-1.5 text-sm">{site.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Focus</dt>
              <dd className="mt-1.5 text-sm">Web &amp; mobile products</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Studio</dt>
              <dd className="mt-1.5 text-sm">
                <Link href="/services" className="underline decoration-border underline-offset-4 hover:decoration-accent">
                  {site.company.name}
                </Link>
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* Selected work */}
      <Section
        eyebrow="Selected work"
        title="Things I've built"
        description="A few projects worth walking through — what the problem was, what I chose to build, and how it turned out."
      >
        {projects.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline underline-offset-4"
              >
                See all projects
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </>
        ) : (
          <p className="text-sm text-fg-muted">
            No projects yet — add an <code className="font-mono">.mdx</code> file under{" "}
            <code className="font-mono">content/projects/</code> to populate this section.
          </p>
        )}
      </Section>

      {/* Toolkit */}
      <Section
        eyebrow="Toolkit"
        title="What I build with"
        description="The stack I reach for by default. I pick tools that are boring to operate and pleasant to work in."
        className="border-t border-border bg-surface"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <div key={group.group}>
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
          ))}
        </div>
      </Section>
    </>
  );
}
