"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";

/** Sections the nav can mark as current, top to bottom. */
const TARGETS = ["hero", ...NAV.map((n) => n.href.slice(1)), "signal"];

/**
 * Fixed nav. Each pill fills like a progress bar while its section scrolls
 * by (Motion.tsx), and the section in the middle of the screen gets a solid
 * "you are here" pill with aria-current. Support jumps to the Support
 * section, where the PayPal button and the reason to give are.
 */
export default function Nav() {
  const [current, setCurrent] = useState("hero");

  useEffect(() => {
    const els = TARGETS.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const mark = (id: string) => (current === id ? { "aria-current": "location" as const } : {});
  const cls = (id: string) => (current === id ? " is-current" : "");

  return (
    <div className="master-navigation">
      <div className="navbar w-nav">
        <div className="nav-container w-container">
          <div className="master-navigation-links">
            <nav className="wrap-navigation-links" aria-label="Main">
              <a href="#hero" className={`nav-link brand mobile-hidden w-inline-block${cls("hero")}`} {...mark("hero")}>
                <div className="button-label">Home</div>
              </a>
              {NAV.map((item) => {
                const id = item.href.slice(1);
                return (
                  <a
                    key={item.key}
                    data-link="color-change"
                    href={item.href}
                    className={`nav-link ${item.key} w-inline-block${cls(id)}`}
                    {...mark(id)}
                  >
                    <div className="button-label">{item.label}</div>
                    <div className={`nav-link-bg ${item.key}`} />
                  </a>
                );
              })}
              <a href="#signal" className={`nav-link cta mobile-hidden w-inline-block${cls("signal")}`} {...mark("signal")}>
                <div className="button-label">Support</div>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
