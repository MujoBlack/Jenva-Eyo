"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import BgVideo from "./BgVideo";
import { SHOWS } from "@/lib/content";

gsap.registerPlugin(Flip, useGSAP);

/**
 * Berlin / Zurich / Geneva tabs. The yellow highlight pill moves to the
 * clicked tab with Flip (0.4s, power1.inOut) and the panel track slides
 * by -100% per index (0.6s, power2.inOut), as on the original site.
 */
export default function LiveShows() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { contextSafe } = useGSAP({ scope: root });

  const select = contextSafe((i: number) => {
    if (i === active || !root.current) return;
    const hl = root.current.querySelector<HTMLElement>(".tab-highlight");
    const tabs = root.current.querySelectorAll<HTMLElement>(".tab-btn");
    const track = root.current.querySelector<HTMLElement>(".panels-track");
    if (!hl || !track) return;

    const state = Flip.getState(hl);
    tabs[i].appendChild(hl);
    Flip.from(state, { duration: 0.4, ease: "power1.inOut" });
    gsap.to(track, { xPercent: -100 * i, duration: 0.6, ease: "power2.inOut" });
    setActive(i);
  });

  // Standard tabs keyboard pattern: arrows move between tabs, Home/End jump.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const n = SHOWS.length;
    const next =
      e.key === "ArrowRight" ? (active + 1) % n
      : e.key === "ArrowLeft" ? (active - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    root.current?.querySelectorAll<HTMLElement>(".tab-btn")[next]?.focus();
  };

  return (
    <div className="services" ref={root}>
      <div className="tabs-wrap" role="tablist" aria-label="Live shows" onKeyDown={onKeyDown}>
        {SHOWS.map((show, i) => (
          <button
            key={show.city}
            type="button"
            role="tab"
            id={`show-tab-${i}`}
            aria-controls={`show-panel-${i}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className={`tab-btn${i === active ? " is-active" : ""}`}
            onClick={() => select(i)}
          >
            <div className="tab-inner">
              <div className="label">{show.city}</div>
            </div>
            {i === 0 && <div className="tab-highlight" />}
          </button>
        ))}
      </div>
      <div className="panels-outer">
        <div className="panels-track">
          {SHOWS.map((show, i) => (
            <div
              key={show.city}
              className="panel"
              role="tabpanel"
              id={`show-panel-${i}`}
              aria-labelledby={`show-tab-${i}`}
              inert={i !== active}
            >
              <div className="panel-content">
                <div className="panel-inner">
                  <div className="text-scroll-right white">{show.city}</div>
                  <div className="label white">
                    {show.caption}
                    {show.mention && (
                      <>
                        <a href={show.mention.href} target="_blank" rel="noopener">
                          {show.mention.text}
                        </a>
                        {show.mention.after}
                      </>
                    )}
                  </div>
                  <a href={show.insta} target="_blank" rel="noopener" className="link-block w-inline-block">
                    <span className="heading-405">Watch on Insta</span>
                  </a>
                </div>
                <div className="absolute-video">
                  <BgVideo name={show.video} className="video-services" enabled={i === active} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
