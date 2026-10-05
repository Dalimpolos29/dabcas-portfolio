import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { Callout, mdxComponents } from "@/components/mdx";
import { ButtonLink, Chip, Container, StatusPill } from "@/components/ui";
import { getAllProjects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const facts = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client },
    { label: "Year", value: String(project.year) },
  ];

  return (
    <article className="py-12 sm:py-16">
      <Container>
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-3.5" />
          All projects
        </Link>

        <header className="mt-8 border-b border-border pb-10">
          <div className="flex items-center gap-3">
            <StatusPill status={project.status} />
            <span className="font-mono text-xs text-fg-subtle">{project.year}</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-fg-muted">{project.summary}</p>

          {(project.links.live || project.links.repo || project.links.caseStudy) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {project.links.live && (
                <ButtonLink href={project.links.live} size="sm">
                  Visit site
                  <ExternalLink className="size-3.5" />
                </ButtonLink>
              )}
              {project.links.repo && (
                <ButtonLink href={project.links.repo} variant="secondary" size="sm">
                  <GithubIcon className="size-3.5" />
                  Source
                </ButtonLink>
              )}
              {project.links.caseStudy && (
                <ButtonLink href={project.links.caseStudy} variant="secondary" size="sm">
                  More detail
                  <ExternalLink className="size-3.5" />
                </ButtonLink>
              )}
            </div>
          )}
        </header>

        {project.cover && (
          <div className="relative mt-10 aspect-16/9 overflow-hidden rounded-(--radius-card) border border-border bg-surface-raised">
            <Image
              src={project.cover}
              alt={`${project.title} screenshot`}
              fill
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-headings:font-semibold prose-a:text-accent prose-a:underline-offset-4 prose-pre:border prose-pre:border-border prose-pre:bg-surface-raised prose-pre:text-fg prose-img:rounded-lg prose-img:border prose-img:border-border">
            <MDXRemote
              source={project.content}
              components={{ ...mdxComponents, Callout }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {/* Sidebar: scannable facts for anyone skimming */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-(--radius-card) border border-border bg-surface p-5">
              <dl className="space-y-4">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm">{fact.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                    Stack
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            {project.highlights.length > 0 && (
              <div className="mt-5 rounded-(--radius-card) border border-border bg-surface p-5">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                  Outcomes
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}
