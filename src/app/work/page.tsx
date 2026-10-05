import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects — web applications and client builds.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <Eyebrow>Work</Eyebrow>
        <h1 className="font-display text-4xl leading-[1.02] sm:text-5xl">
          Shipped and <span className="text-brand">in use</span>
        </h1>
        <p className="mt-4 text-[16px] text-fg-muted">The problem, the decisions, what shipped.</p>
      </header>

      {projects.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.08} className="h-full">
              <ProjectCard project={project} priority={index < 2} />
            </Reveal>
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
