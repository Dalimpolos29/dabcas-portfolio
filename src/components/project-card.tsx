import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Chip, StatusPill } from "@/components/ui";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-(--radius-card) border border-border bg-surface transition-colors hover:border-border-strong">
      {project.cover ? (
        <div className="relative aspect-16/9 overflow-hidden border-b border-border bg-surface-raised">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        // Placeholder keeps the grid even until you add screenshots.
        <div className="relative flex aspect-16/9 items-center justify-center overflow-hidden border-b border-border bg-surface-raised">
          <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
          <span className="relative rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
            {project.stack[0] ?? project.title}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex items-center gap-2.5">
          <StatusPill status={project.status} />
          <span className="font-mono text-[11px] text-fg-subtle">{project.year}</span>
        </div>

        <h3 className="text-lg font-semibold">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
          {project.stack.length > 4 && <Chip>+{project.stack.length - 4}</Chip>}
        </div>

        <div className="mt-5 flex items-center gap-1.5 pt-4 text-sm font-medium text-accent border-t border-border">
          Read case study
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
