import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/JsonLd";
import Tracking from "@/components/Tracking";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, TAGLINE } from "@/lib/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Jenva Eyo" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Jenva Eyo",
    title: "Jenva Eyo",
    description: TAGLINE,
    url: "/",
  },
  twitter: { card: "summary_large_image", site: "@Jenvaa_", creator: "@Jenvaa_" },
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
        <JsonLd />
        <Tracking />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
