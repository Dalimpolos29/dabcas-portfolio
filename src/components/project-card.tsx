import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/motion/project-cover";
import { StatusPill } from "@/components/ui";
import type { Project } from "@/lib/projects";

/**
 * A project rendered as a ledger entry: ruled rather than carded, with the
 * cover as its attachment and the figures set in tabular mono so they stack
 * into a column down the page.
 */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col border-t-2 border-border-strong bg-surface transition-colors hover:bg-surface-raised">
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

        <p className="mt-1.5 text-sm text-fg-subtle">{project.client}</p>

        <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <dl className="mt-5 space-y-0 border-t border-border pt-4">
          <div className="flex items-baseline justify-between gap-4 py-1">
            <dt className="field">Stack</dt>
            <dd className="text-right font-mono text-xs text-fg-muted">
              {project.stack.slice(0, 3).join(" · ")}
              {project.stack.length > 3 && ` +${project.stack.length - 3}`}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-1">
            <dt className="field">Role</dt>
            <dd className="text-right font-mono text-xs text-fg-muted">{project.role}</dd>
          </div>
        </dl>

        <div className="rule-double mt-4 flex items-center gap-1.5 pt-4 text-sm font-medium text-accent">
          Read case study
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
