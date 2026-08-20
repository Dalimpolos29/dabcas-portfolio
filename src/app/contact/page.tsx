import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ContactForm } from "@/components/contact-form";
import { AvailabilityBadge, Container } from "@/components/ui";
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
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">Contact</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">Let&apos;s talk</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
              Hiring, a project for {site.company.name}, or just a question about something I&apos;ve
              built — all welcome. I read everything and reply to anything genuine.
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
