import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-5xl px-6 ${className}`}>{children}</div>;
}

/** A page section with a consistent heading treatment. */
export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>}
            {description && <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-60";

const buttonSizes = {
  sm: "h-9 px-3.5",
  md: "h-11 px-5",
} as const;

const buttonVariants = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary: "border border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-raised",
  ghost: "text-fg-muted hover:bg-surface-raised hover:text-fg",
} as const;

type ButtonStyleProps = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

function buttonClass({ variant = "primary", size = "md" }: ButtonStyleProps, className = "") {
  return `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]} ${className}`;
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & ButtonStyleProps) {
  return <button className={buttonClass({ variant, size }, className)} {...props} />;
}

/** Renders an internal Next link or a plain anchor for external/mailto targets. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ComponentProps<"a"> & ButtonStyleProps & { href: string }) {
  const styles = buttonClass({ variant, size }, className);
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={styles} target="_blank" rel="noreferrer noopener" {...props}>
      {children}
    </a>
  );
}

/** Small technology / metadata pill. */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-surface-raised px-2 py-0.5 font-mono text-[11px] text-fg-muted ${className}`}
    >
      {children}
    </span>
  );
}

/** Pulsing dot + label, used for the "available for work" signal. */
export function AvailabilityBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-fg-muted">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
      </span>
      {label}
    </span>
  );
}

const statusStyles = {
  live: "border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "in-progress": "border-amber-600/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  archived: "border-border bg-surface-raised text-fg-subtle",
} as const;

const statusLabels = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
} as const;

export function StatusPill({ status }: { status: keyof typeof statusStyles }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
