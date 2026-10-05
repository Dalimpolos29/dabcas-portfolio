import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/project-cover";
import { Chip, StatusPill } from "@/components/ui";
import type { Project } from "@/lib/projects";

/**
 * A project card: the cover does the talking, with a two-line summary and
 * the stack as chips. The full story lives on the case-study page.
 */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="lift group relative flex h-full flex-col overflow-hidden rounded-(--radius-card) border border-border bg-surface">
      <div className="relative aspect-16/9 border-b border-border">
        {project.cover ? (
          <ProjectCover src={project.cover} alt={`${project.title} interface`} priority={priority} />
        ) : (
          <div className="flex size-full items-center justify-center bg-surface-raised">
            <span className="field">{project.stack[0] ?? project.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="field" data-figure>
            {project.year}
          </span>
          <StatusPill status={project.status} />
        </div>

        <h3 className="mt-3 font-display text-xl leading-tight tracking-tight sm:text-2xl">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-fg-subtle">{project.client}</p>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((item) => (
            <li key={item}>
              <Chip>{item}</Chip>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-sm font-medium text-accent">
          Read case study
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
