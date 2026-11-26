import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
