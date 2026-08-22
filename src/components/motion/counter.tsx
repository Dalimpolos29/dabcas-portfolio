"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Counts up to `value` when scrolled into view. Under reduced motion the final
 * number is shown immediately.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const target = useMotionValue(0);
  const spring = useSpring(target, { duration: 1400, bounce: 0 });
  const display = useTransform(
    spring,
    (current) => `${prefix}${Math.round(current).toLocaleString()}${suffix}`,
  );

  useEffect(() => {
    if (reduced) {
      // The spring continuously follows `target` — jumping the spring alone
      // is not enough, because `target` is still 0 and the spring re-converges
      // straight back to it. Move both, so there is nothing left to follow.
      target.set(value);
      spring.jump(value);
      return;
    }
    if (inView) target.set(value);
  }, [inView, reduced, value, target, spring]);

  return (
    <span ref={ref} className={className}>
      <motion.span aria-hidden="true">{display}</motion.span>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
    </span>
  );
}
