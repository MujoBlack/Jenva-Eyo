import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup endpoint.
 *
 * The newsletter service hasn't been chosen yet. Until it is, set
 * NEWSLETTER_WEBHOOK_URL to any endpoint that accepts a JSON POST of
 * `{ email }` (a Zapier/Make webhook, a Google Apps Script, a service's
 * own webhook). Without it the route answers 503 so visitors see the
 * error message instead of a false "thank you".
 */
export async function POST(req: Request) {
  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (typeof email !== "string" || email.length > 256 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "Newsletter not configured" }, { status: 503 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "jenva-site", at: new Date().toISOString() }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
