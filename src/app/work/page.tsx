import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Container } from "@/components/ui";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects — web applications, mobile apps and client builds.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">Work</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Projects</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
          Each write-up covers the problem, the decisions I made and what shipped. Where a project is
          public, the live site and source are linked.
        </p>
      </header>

      {projects.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-sm text-fg-muted">
          No projects yet. Add a file to <code className="font-mono">content/projects/</code>.
        </p>
      )}
    </Container>
  );
}
