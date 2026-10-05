import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ContactForm } from "@/components/contact-form";
import { AvailabilityBadge, Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about roles, freelance projects or collaboration.`,
};

const channels = [
  { href: `mailto:${site.email}`, label: site.email, Icon: Mail },
  { href: site.socials.github, label: "GitHub", Icon: GithubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
].filter((channel) => Boolean(channel.href));

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div>
          <header className="max-w-xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="font-display text-4xl leading-[1.02] sm:text-5xl">
              Let&apos;s <span className="text-brand">talk</span>
            </h1>
            <p className="mt-4 text-[16px] text-fg-muted">
              Hiring, a {site.company.name} project, or a question — all welcome.
            </p>
          </header>

          <div className="mt-10">
            <ContactForm fallbackEmail={site.email} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {site.availableForWork && <AvailabilityBadge label={site.availabilityNote} />}

          <div className="mt-6 rounded-(--radius-card) border border-border bg-surface p-5">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
              Direct
            </h2>
            <ul className="mt-3 space-y-3">
              {channels.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="break-all">{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-border pt-4">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                Working hours
              </h2>
              <p className="mt-2 text-sm text-fg-muted">
                {site.location} · {site.timezone}
                <br />
                Usually replies within 2 days
              </p>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
