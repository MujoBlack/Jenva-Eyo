import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="plain-page not-found">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/jenva-logo.svg" alt="it's me Jenva Eyo" width={220} height={205} className="not-found-logo" />
      <h1 className="text-h2">This page has left the stage.</h1>
      <p>The link may be old or mistyped. The music is still playing on the home page.</p>
      <Link href="/" className="nav-link cta book-button w-inline-block">
        <div className="button-label">Back home</div>
      </Link>
    </main>
  );
}
