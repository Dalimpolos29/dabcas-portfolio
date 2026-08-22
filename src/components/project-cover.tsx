import Image from "next/image";

/**
 * A project cover held in teal duotone at rest, releasing to full colour when
 * you point at it.
 *
 * Three shipped products, three unrelated brands — a navy auth screen, a cream
 * bakery, a dark red paper collage. Shown raw they fight each other and the
 * palette. The veil holds the whole wall in one identity; colour arrives only
 * on the entry you're actually looking at.
 *
 * Deliberately CSS-only, so this stays a Server Component: no hydration
 * surface, and nothing to go stale. Scroll-into-view was the wrong trigger —
 * inside the pinned gallery every card is in view simultaneously, so all four
 * veils fired at once and the clash came straight back.
 *
 * Only `opacity` transitions. On touch devices, where there is no hover, the
 * covers simply render in full colour (see `.cover-veil` in globals.css).
 */
export function ProjectCover({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="relative size-full overflow-hidden bg-surface-raised">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
      />

      <div data-veil aria-hidden="true" className="cover-veil pointer-events-none absolute inset-0">
        {/* Drains the source palette before the hue is replaced. */}
        <div className="absolute inset-0 bg-bg opacity-45" />
        <div className="duotone-veil absolute inset-0" />
      </div>

      {/* Keeps light-source covers legible against the dark ground. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/60 to-transparent"
      />
    </div>
  );
}
