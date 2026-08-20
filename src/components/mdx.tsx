import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

/**
 * Styling for MDX case studies. Typography comes from the prose classes on the
 * wrapper; these overrides only handle links and callouts.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }: ComponentProps<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
        {children}
      </a>
    );
  },
};

/** Use inside MDX for a pull-quote style aside: <Callout>…</Callout> */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-6 rounded-(--radius-card) border-l-2 border-accent bg-accent-soft px-5 py-4 text-[15px] leading-relaxed text-fg">
      {children}
    </aside>
  );
}
