import { NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * Sends through Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set (see
 * .env.example). Without them the route reports that email isn't configured and
 * the form falls back to a mailto: link, so nothing silently swallows a message.
 */

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot — real users never fill this in. */
  company?: unknown;
};

const MAX_MESSAGE_LENGTH = 5000;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: ContactPayload) {
  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const message = asTrimmedString(payload.message);
  const errors: string[] = [];

  if (name.length < 2) errors.push("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email address.");
  if (message.length < 10) errors.push("Please include a little more detail.");
  if (message.length > MAX_MESSAGE_LENGTH) errors.push("That message is too long.");

  return { name, email, message, errors };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Bot filled the hidden field — accept silently so it doesn't retry.
  if (asTrimmedString(payload.company)) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message, errors } = validate(payload);

  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0] }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Please use the email link below." },
      { status: 501 },
    );
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
  } catch (err) {
    console.error("Contact form delivery failed (network error):", err);
    return NextResponse.json(
      { error: "Something went wrong sending that. Please email me directly." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    console.error("Contact form delivery failed:", response.status, await response.text());
    return NextResponse.json(
      { error: "Something went wrong sending that. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
