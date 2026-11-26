import Image from "next/image";
import BgVideo from "./BgVideo";
import LiveShows from "./LiveShows";
import Newsletter from "./Newsletter";
import SplitTarget from "./SplitTarget";
import { SparkleIcon, StarburstIcon } from "./Icons";
import {
  LINKS,
  NAV,
  RING_IMAGES,
  STATS,
  TRACKS,
  VIBE_IMAGES,
  VIBE_PHRASES,
  VIBE_ROWS,
  type Img,
} from "@/lib/content";

function Photo({ img, className = "image-cover", sizes }: { img: Img; className?: string; sizes: string }) {
  return <Image src={img.src} width={img.w} height={img.h} alt="" className={className} sizes={sizes} />;
}

export function Navigation() {
  return (
    <div className="master-navigation">
      <div className="navbar w-nav" role="banner">
        <div className="nav-container w-container">
          <div className="master-navigation-links">
            <nav className="wrap-navigation-links" aria-label="Main">
              <a href="#hero" aria-current="page" className="nav-link brand mobile-hidden w-inline-block w--current">
                <div className="button-label">HOME</div>
              </a>
              {NAV.map((item) => {
                const external = item.href.startsWith("http");
                return (
                  <a
                    key={item.key}
                    data-link="color-change"
                    href={item.href}
                    className={`nav-link ${item.key} w-inline-block`}
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    <div className="button-label">{item.label}</div>
                    <div className={`nav-link-bg ${item.key}`} />
                  </a>
                );
              })}
              <a href={LINKS.paypal} target="_blank" rel="noopener" className="nav-link cta mobile-hidden w-inline-block">
                <div className="button-label">SUPPORT ME</div>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="wrap-preloader-logo">
        <div className="logo-wrap-hero preloader-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/jenva-logo.svg" alt="" className="logo-hero" />
          <div className="overlay-preloader-logo" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="section hero-section">
      <BgVideo name="jenva-short" className="video-hero" eager>
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="master-hero-section">
            <h1 className="logo-wrap-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/jenva-logo.svg" alt="it's me Jenva Eyo" className="logo-hero" />
            </h1>
            <div className="bottom-tile-hero">
              <div className="byq-logo">
                <div className="icon-sparkle">
                  <StarburstIcon />
                </div>
                <div className="label">JENVAEYO®</div>
              </div>
              <div className="text-wrap-hero-middle">
                <p className="label hero-animated">
                  <SplitTarget>
                    From Uganda to your playlist — immersive Afro-Pop waves, heartfelt lyrics, and a new musical era.
                  </SplitTarget>
                </p>
              </div>
              <div className="right-hero-year">
                <div className="label">2025</div>
                <div className="icon-sparkle">
                  <SparkleIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BgVideo>
    </section>
  );
}

export function Vibe() {
  return (
    <div className="navigation-change-color">
      <section id="base" className="section base">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="scroll-section-top-tile">
            <div className="left-scroll-section">
              <div className="label">scroll gently into that Music soul.</div>
            </div>
            <div className="right-scroll-section">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/arrow-svg.svg" alt="" className="arrow-svg" />
              <p className="text-scroll-right">
                Pushing boundaries, blending genres and breaking stereotypes in the world of music mixing Afrobeats
                and Hip Hop
              </p>
            </div>
          </div>
          <div className="master-scroll">
            <div className="text-master-scroll-center">
              {VIBE_PHRASES.map((p, i) => {
                const n = i + 1;
                const doodle = (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.doodle.src} alt="" className={`${p.doodle.cls} hide`} />
                );
                return (
                  <div key={p.text} className={`scroll-wrapper-single _${n}`}>
                    {n % 2 === 0 && doodle}
                    <div className="label-wrap-scroll">
                      <div className={`label scroll-${n}`}>{p.label}</div>
                    </div>
                    <div className="text-wrap-scroll">
                      <h2 className={`text-h2 scroll-${n}`}>
                        <SplitTarget>{p.text}</SplitTarget>
                      </h2>
                    </div>
                    {n % 2 === 1 && doodle}
                  </div>
                );
              })}
            </div>
            <div className="images-scroll-block">
              <div className="master-scroll-images">
                {VIBE_IMAGES.map(({ slot, img }, i) => (
                  <div key={slot} className={slot}>
                    <Photo img={img} className={i === 0 ? "image-cover hide-2" : "image-cover"} sizes="360px" />
                  </div>
                ))}
                {VIBE_ROWS.map(({ row, items }) => (
                  <div key={row} className={row}>
                    {items.map(({ slot, img }) => (
                      <div key={slot} className={slot}>
                        <Photo img={img} sizes="360px" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Tracks() {
  return (
    <div className="color-change">
      <section id="makes" className="section makes">
        <div className="master-snap-sections">
          {TRACKS.map((t) => (
            <div key={t.title} className="master-snap-section _1">
              <Photo img={t.img} sizes="100vw" />
              <div className="snap-bottom-gradient">
                <div className="button-wrap-snap">
                  <div className="button-snap _1">
                    <a href={LINKS.stream} target="_blank" rel="noopener" className="w-inline-block" aria-label={`Stream ${t.title}`}>
                      <div className="button-visible-text _1">
                        <div className="label">STREAM</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function Lives() {
  return (
    <div className="color-light">
      <section id="skills" className="section skills">
        <div className="w-layout-blockcontainer main-container w-container">
          <div className="headline-skills">
            <div className="label">Live Shows</div>
            <div className="heading-skills">
              <h2 className="heading-large">We don’t just perform we ignite energy.</h2>
            </div>
          </div>
          <LiveShows />
        </div>
      </section>
    </div>
  );
}

export function Story() {
  return (
    <section id="story" className="section story">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="headline-story">
          <div className="left-text-story">
            <h2 className="text-h2">We thought we were making a music.</h2>
          </div>
          <div className="right-text-story">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/flower-svg.svg" alt="" className="svg-flower" />
            <p className="text-scroll-right">
              Turns out we were creating a world full of rhythm, soul, and stories. We lived it, felt it, recorded it,
              &amp; shared it with you.
            </p>
          </div>
        </div>
        <div className="story-number-grid">
          {STATS.map((s, i) => (
            <div key={s.title} className={i === 0 ? "story-grid-item" : `story-grid-item _${i + 1}`}>
              <div className="number-animate">
                <div className="text-number">
                  <SplitTarget>{s.value}</SplitTarget>
                </div>
              </div>
              <div className="text-wrap-story-item">
                <div className="title-number-item">{s.title}</div>
                <div className="label">{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-layout-blockcontainer main-container mobile-no-padding w-container">
        <BgVideo name="vid-2-jen" className="video-story" />
      </div>
    </section>
  );
}

export function Signal() {
  return (
    <section id="signal" className="section signal">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="master-signal">
          <div className="content-signal">
            <div className="label-wrap-signal">
              <div className="label">
                <SplitTarget>Start the rhythm</SplitTarget>
              </div>
            </div>
            <div className="headline-signal">
              <div className="heading-signal">
                <h2 className="heading-large">
                  <SplitTarget>We’ll feel the groove.</SplitTarget>
                </h2>
              </div>
            </div>
            <div className="button-wrap-signal">
              <a href={LINKS.paypal} target="_blank" rel="noopener" className="nav-link cta w-inline-block">
                <div className="button-label">Send your love</div>
              </a>
            </div>
          </div>
          <div className="circle-wrapper" aria-hidden="true">
            {RING_IMAGES.map((img, i) => (
              <Photo key={`${img.src}-${i}`} img={img} className="circle-image" sizes="110px" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const marqueeLogos = ["/media/jenva-footer.svg", "/media/footer-logo-1.svg", "/media/footer-logo-1.svg"];
  return (
    <footer className="footer">
      <div className="w-layout-blockcontainer main-container w-container">
        <Newsletter />
      </div>
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-item-wrap">
          {marqueeLogos.map((logo, i) => (
            <div key={i} className="single-footer-marquee-item">
              {[0, 1].map((k) => (
                <span key={k} style={{ display: "contents" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/media/light-eye-svg.svg" alt="" className="footer-icon-large" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt="" className="footer-logo-big" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="section-divider footer-divider" />
        <div className="bottom-tile-footer">
          <div className="label">🎶 gather where the music glow</div>
          <a href={LINKS.designer} target="_blank" rel="noopener" className="label">
            designed by fahaddeartist.com
          </a>
        </div>
      </div>
    </footer>
  );
}
