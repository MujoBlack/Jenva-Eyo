import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What jenva-eyo's website collects and how to have it removed.",
};

export default function Privacy() {
  return (
    <main id="main" className="plain-page">
      <Link href="/" className="label plain-page-back">
        ← Back to the site
      </Link>
      <h1 className="text-h2">Privacy</h1>

      <h2 className="title-number-item">Newsletter</h2>
      <p>
        If you join the rhythm circle, we keep your email address to send you new music and show dates, about once a
        month. We use it for nothing else and never sell or share it. Every email has an unsubscribe link, and you can
        also write to us to have your address deleted.
      </p>

      <h2 className="title-number-item">Visits</h2>
      <p>
        The site counts visits and clicks without cookies and without identifying you (Vercel Web Analytics). The site
        sets no cookies. It remembers in your own browser whether you paused motion and whether the intro already played.
      </p>

      <h2 className="title-number-item">Links to other sites</h2>
      <p>
        Links to Instagram, Spotify, YouTube, PayPal and other platforms take you to their sites, where their own privacy
        policies apply.
      </p>

      <h2 className="title-number-item">Contact</h2>
      <p>
        Questions or deletion requests: <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>
      </p>
    </main>
  );
}
