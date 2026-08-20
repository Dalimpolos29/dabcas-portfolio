import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold">This page doesn&apos;t exist</h1>
      <p className="mt-3 max-w-sm text-[15px] text-fg-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          See my work
        </ButtonLink>
      </div>
    </Container>
  );
}
