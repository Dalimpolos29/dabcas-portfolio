import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { CompanyMark } from "@/components/logo";
import { Container } from "@/components/ui";
import { nav, site } from "@/lib/site";

const socialLinks = [
  { href: site.socials.github, label: "GitHub", Icon: GithubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
].filter((link) => Boolean(link.href));

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <CompanyMark />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{site.company.tagline}</p>
          </div>

          <div className="flex gap-14">
            <nav aria-label="Footer">
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Site
              </h2>
              <ul className="space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
                Elsewhere
              </h2>
              <ul className="space-y-2">
                {socialLinks.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      <Icon className="size-3.5" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company.name}. Built by {site.name}.
          </p>
          <p className="font-mono">
            {site.location} · {site.timezone}
          </p>
        </div>
      </Container>
    </footer>
  );
}
