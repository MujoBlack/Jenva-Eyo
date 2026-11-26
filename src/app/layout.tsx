import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { preload } from "react-dom";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Absolute base for share images and canonical URLs. Set NEXT_PUBLIC_SITE_URL
 * once the domain is live; until then Vercel's production URL is used.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jenva Eyo",
  description:
    "From Uganda to your playlist: immersive Afro-Pop waves, heartfelt lyrics, and a new musical era. Music, live shows and the story of Jenva Eyo.",
  openGraph: {
    title: "Jenva Eyo",
    description: "From Uganda to your playlist: immersive Afro-Pop waves, heartfelt lyrics, and a new musical era.",
    images: ["/media/jenva-short-poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2a2119",
};

/**
 * Runs before first paint: skip the preloader if it already played in this
 * session, or if the visitor arrived on an anchor link (#music etc.).
 */
const INTRO_SCRIPT = `try{if(sessionStorage.getItem("jenva-intro")||location.hash.length>1)document.documentElement.classList.add("no-intro")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // What the first screen needs, fetched before the CSS asks for it.
  preload("/media/jenva-short-poster.jpg", { as: "image", fetchPriority: "high" });
  preload("/media/jenva-logo.svg", { as: "image" });
  preload("/fonts/ltsuperiorserif-regular.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/geistmono-variablefont-wght.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });

  return (
    <html lang="en" className={instrumentSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
