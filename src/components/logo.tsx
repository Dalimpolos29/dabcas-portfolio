import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The "D" monogram does double duty: Dennis and DABCAS share an initial, so
 * one mark carries both the personal portfolio and the studio brand.
 */
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" className="fill-fg" />
      <rect x="7" y="8" width="3.5" height="16" rx="1.25" className="fill-bg" />
      <path
        d="M13 8h3.2a8 8 0 0 1 0 16H13a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        className="fill-accent"
      />
    </svg>
  );
}

/** Header lockup: mark plus the person's name. */
export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 rounded-md"
      aria-label={`${site.name} — home`}
    >
      <LogoMark className="size-8 transition-transform duration-200 group-hover:scale-105" />
      <span className="text-[15px] font-semibold tracking-tight">{site.name}</span>
    </Link>
  );
}

/** Studio lockup: wordmark plus descriptor. Used on /services and in the footer. */
export function CompanyMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="size-10" />
      <div className="leading-tight">
        <div className="text-lg font-bold tracking-[0.16em]">{site.company.name}</div>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
          {site.company.descriptor}
        </div>
      </div>
    </div>
  );
}
