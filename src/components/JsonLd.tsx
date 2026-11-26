import { BOOKING_EMAIL, SOCIALS, UPCOMING } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

/**
 * Structured data for search engines: the artist, with links to every
 * profile (Google uses these for the artist knowledge panel). Upcoming
 * shows become MusicEvent entries as soon as they have a date.
 */
export default function JsonLd() {
  const artist = {
    "@type": "MusicGroup",
    "@id": `${SITE_URL}/#artist`,
    name: "Jenva Eyo",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    genre: ["Afropop", "Afrobeats", "Hip hop"],
    foundingLocation: { "@type": "Place", name: "Uganda" },
    image: `${SITE_URL}/opengraph-image`,
    email: `mailto:${BOOKING_EMAIL}`,
    sameAs: SOCIALS.map((s) => s.href),
  };
  const events = UPCOMING.filter((s) => s.date).map((s) => ({
    "@type": "MusicEvent",
    name: s.name,
    startDate: s.date,
    location: { "@type": "Place", name: s.venue ?? s.city ?? s.name, address: s.city },
    performer: { "@id": artist["@id"] },
    ...(s.tickets ? { offers: { "@type": "Offer", url: s.tickets } } : {}),
  }));
  const data = { "@context": "https://schema.org", "@graph": [artist, ...events] };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
