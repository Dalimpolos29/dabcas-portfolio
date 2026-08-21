"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Under reduced motion it renders the final state instantly, with no perceived
 * motion.
 *
 * `initial` is unconditional — identical on the server and on the client's
 * first render — so the SSR HTML never depends on `useReducedMotion()` (which
 * is `null` on the server and resolves synchronously on the client's first
 * paint). Only `transition` varies: reduced-motion users still animate from
 * `initial` to the `whileInView` target, but over zero duration, which reads
 * as an instant snap rather than motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        reduced ? { duration: 0 } : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
