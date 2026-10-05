"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * The home-page reel: an 8-second seamless loop authored as a HyperFrames
 * composition (`hyperframes/hero-reel/`) and rendered to video. The DABCAS
 * mark assembles, wires itself to the four shipped products and data flows
 * between them.
 *
 * It's decorative — the same facts are in the page text — so it's hidden from
 * assistive tech. Under reduced motion it stays on its poster frame.
 */
export function HeroReel({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      return;
    }
    // Autoplay can be refused (data saver, low power); the poster stands in.
    video.play().catch(() => {});
  }, [reduced]);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      className={className}
      poster="/media/hero-reel-poster.jpg"
      muted
      loop
      playsInline
      preload="metadata"
      width={1080}
      height={1080}
    >
      <source src="/media/hero-reel.webm" type="video/webm" />
      <source src="/media/hero-reel.mp4" type="video/mp4" />
    </video>
  );
}
