/**
 * Absolute site URL for metadata, sitemap and structured data. Set
 * NEXT_PUBLIC_SITE_URL once the domain is live; until then Vercel's
 * production URL is used.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const SITE_TITLE = "Jenva Eyo — Afro-Pop artist from Uganda | Music, Live Shows";
export const SITE_DESCRIPTION =
  "From Uganda to your playlist: immersive Afro-Pop waves, heartfelt lyrics, and a new musical era. Music, live shows and the story of Jenva Eyo.";
export const TAGLINE = "From Uganda to your playlist: immersive Afro-Pop waves, heartfelt lyrics, and a new musical era.";
