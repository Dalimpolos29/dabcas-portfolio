import Link from "next/link";
import { useId } from "react";
import { site } from "@/lib/site";

/**
 * The DABCAS mark: a hexagonal block — one component of a larger system —
 * carrying a "D" with an aquamarine node at its centre. "D" serves both
 * DABCAS and Dennis. The fill runs teal → aquamarine, the site's two colours.
 *
 * Kept in sync with `src/app/icon.svg` and `public/brand/`.
 */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  // Gradient ids must be unique per instance: the header and footer both
  // render the mark on the same page.
  const fill = `dabcas-fill-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={fill} x1="10" y1="6" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0f766e" />
          <stop offset="0.5" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#7fffd4" />
        </linearGradient>
      </defs>
      <path
        d="M32 6.5 54 19.25v25.5L32 57.5 10 44.75v-25.5Z"
        fill={`url(#${fill})`}
        stroke={`url(#${fill})`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M32 6.5 54 19.25 32 32 10 19.25Z" fill="#fff" fillOpacity="0.1" />
      <path
        d="M23 20h8a12 12 0 0 1 0 24h-8Z"
        stroke="#fff"
        strokeWidth="5.5"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="32" r="3" fill="#7fffd4" />
    </svg>
  );
}

/** Header/footer lockup: mark, DABCAS wordmark, and the person behind it. */
export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-md"
      aria-label={`${site.company.name} — ${site.name}, home`}
    >
      <LogoMark className="size-9 transition-transform duration-500 ease-out group-hover:rotate-[30deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-extrabold tracking-[0.16em]">
          {site.company.name}
        </span>
        <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-fg-subtle">
          {site.name}
        </span>
      </span>
    </Link>
  );
}
