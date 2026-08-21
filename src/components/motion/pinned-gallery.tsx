"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

/**
 * Pins a row of project cards and slides them sideways as the user scrolls down.
 *
 * The outer element is tall; the inner one sticks to the viewport while that
 * height scrolls past, which is what converts vertical scroll into horizontal
 * travel. Below `md`, and whenever reduced motion is set, this degrades to a
 * plain vertical grid — pinned horizontal scrolling fights a phone's own
 * gestures and has no business being there.
 */
export function PinnedGallery({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Travel far enough that the last card lands fully on screen.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  const stack = (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );

  if (reduced) {
    return <div className="mx-auto w-full max-w-5xl px-6">{stack}</div>;
  }

  return (
    <>
      {/* Small screens: no pinning. */}
      <div className="mx-auto w-full max-w-5xl px-6 md:hidden">{stack}</div>

      {/* md and up: the pinned horizontal travel. */}
      <div ref={ref} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-[8vw]">
            {projects.map((project) => (
              <div key={project.slug} className="w-[68vw] shrink-0 lg:w-[42vw]">
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
