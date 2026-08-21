"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

// `useState` + `useEffect(() => setMounted(true), [])` is the classic
// mount-detection idiom, but this project's lint config (react-hooks'
// set-state-in-effect rule) flags setState calls inside an effect body.
// `useSyncExternalStore` gets the same hydration-safe result — server and
// the client's first paint both read `false`, then it flips to `true` once
// the client has hydrated — without a setState-in-effect at all.
const subscribeNever = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

/**
 * Pins a row of project cards and slides them sideways as the user scrolls down.
 *
 * The outer element is tall; the inner one sticks to the viewport while that
 * height scrolls past, which is what converts vertical scroll into horizontal
 * travel. The row itself is a native horizontally-scrollable element — its
 * `scrollLeft` is driven directly from vertical scroll progress, measured
 * against the row's real `scrollWidth`, so the last card lands exactly on
 * screen at every breakpoint instead of overshooting by a percentage-based
 * transform. Being a real scroll container also means a keyboard user
 * tabbing into an off-screen card gets it scrolled into view for free —
 * standard browser focus-scrolling for a scrollable ancestor.
 *
 * Below `md`, and whenever reduced motion is set, this degrades to a plain
 * vertical grid — pinned horizontal scrolling fights a phone's own gestures
 * and has no business being there. The reduced/pinned choice is gated
 * behind `mounted` so the server render and the client's first render agree
 * (avoids a hydration mismatch); it switches to the reduced-motion tree
 * right after mount if needed.
 */
export function PinnedGallery({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mounted = useMounted();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = p * (el.scrollWidth - el.clientWidth);
  });

  const stack = (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );

  if (mounted && reduced) {
    return <div className="mx-auto w-full max-w-5xl px-6">{stack}</div>;
  }

  return (
    <>
      {/* Small screens: no pinning. */}
      <div className="mx-auto w-full max-w-5xl px-6 md:hidden">{stack}</div>

      {/* md and up: the pinned horizontal travel. */}
      <div ref={ref} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div
            ref={scrollerRef}
            className="scrollbar-hide flex gap-8 overflow-x-auto px-[8vw]"
          >
            {projects.map((project) => (
              <div key={project.slug} className="w-[68vw] shrink-0 lg:w-[42vw]">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
