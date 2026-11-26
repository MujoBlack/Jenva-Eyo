import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { TAGLINE } from "@/lib/site";

export const alt = "Jenva Eyo: Afro-Pop artist from Uganda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The link preview card: hero photo, the logo and the tagline. */
export default async function OpengraphImage() {
  const dir = join(process.cwd(), "public/media");
  const [logo, photo] = await Promise.all([
    readFile(join(dir, "jenva-logo.svg"), "utf8"),
    readFile(join(dir, "jenva-short-poster.jpg")),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#2a2119" }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={photoSrc} width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            background: "linear-gradient(90deg, rgba(42,33,25,0.85) 0%, rgba(42,33,25,0.35) 60%, rgba(42,33,25,0) 100%)",
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={logoSrc} width={330} height={307} />
          <div style={{ display: "flex", maxWidth: 620, color: "#ffda3d", fontSize: 30, lineHeight: 1.3 }}>
            {TAGLINE}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
