"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/*
 * Every animation on the page, rebuilt from the original site's published
 * interaction config. Timings, positions and eases are copied 1:1; the
 * comments name the original interaction so the two can be compared.
 */

const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

/**
 * Split the visible copy of a <SplitTarget>. That copy is already
 * aria-hidden with a screen-reader twin beside it, so SplitText must not add
 * its own aria-label (not allowed on p/div) or hide anything else.
 */
const split = (target: string | Element, vars: SplitText.Vars) =>
  SplitText.create(typeof target === "string" ? `${target} .split-target` : target.querySelector(".split-target")!, {
    ...vars,
    aria: "none",
  });

function preloaderAndHero() {
  // i-fcd196e8 (page load)
  const tl = gsap.timeline();
  const words = split(".text-wrap-hero-middle .label", { type: "words" }).words;

  // The original animated width and height, which counts as layout shift.
  // The same motion with transforms: the overlay shrinks toward the right,
  // and the logo rises from the bottom of the screen to the top.
  const wrap = document.querySelector<HTMLElement>(".wrap-preloader-logo");
  const logo = document.querySelector<HTMLElement>(".preloader-logo");
  const rise = () => (wrap && logo ? -(wrap.offsetHeight - logo.offsetHeight) : 0);

  tl.fromTo(".overlay-preloader-logo", { scaleX: 1 }, { scaleX: 0, duration: 1.25, ease: "expo.inOut" }, 0)
    .fromTo(".preloader-logo", { y: 0 }, { y: rise, duration: 1.5, ease: "expo.inOut" }, 1.25)
    .to(".preloader", { opacity: 0, duration: 0.33, ease: "power1.in" }, 2.22)
    .set(".preloader", { display: "none" })
    .fromTo(
      words,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.35, stagger: { amount: 0.4 }, ease: "power3.inOut" },
      2.54,
    )
    .fromTo(".byq-logo", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power1.in" }, 2.54)
    .fromTo(".right-hero-year", { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power1.in" }, 2.54);

  // i-0608b2f1: the photo ring spins forever
  gsap.to(".circle-wrapper", { rotation: 360, duration: 20, ease: "none", repeat: -1 });
}

function navigation() {
  // Nav pills fill like progress bars while their section scrolls by.
  const fills: [string, string, number][] = [
    ["base", "section.base", 0.5], // i-6c02fc89
    ["makes", "section.makes", 0.8], // i-6a306ccb
    ["skills", "section.skills", 0.5], // i-2df63148
    ["story", "section.story", 0.5], // i-0e72ea1d
    ["signal", ".mask", 0.5], // i-2af58be2
  ];
  for (const [key, trigger, scrub] of fills) {
    gsap.fromTo(
      `.nav-link-bg.${key}`,
      { width: "0%" },
      {
        width: "100%",
        ease: "power1.in",
        scrollTrigger: { trigger, start: "top bottom", end: "bottom bottom", scrub },
      },
    );
  }

  // i-71c232d3: nav text turns black once the hero has scrolled away.
  gsap.to("[data-link='color-change']", {
    color: "black",
    ease: "expo.out",
    scrollTrigger: { trigger: ".navigation-change-color", start: "top top", end: "top top-=1", scrub: 0.4 },
  });
}

function vibeHeadline() {
  // i-8a76b2ea: four phrases rise in and out, char by char, while the photos scroll.
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".master-scroll-images", start: "top center", end: "bottom center", scrub: 0.5 },
  });

  const inAt = [0, 3.25, 6.5, 9.75];
  const outAt = [3, 6.25, 9.5, 12.75];
  const labelInAt = [0, 3.5, 6.75, 9.75];
  const doodles = ["wave-svg", "eye-svg", "gsap-svg", "smiley-svg"];
  const doodleInAt = [0, 3.5, 6.5, 9.75];
  const wrapIn: [number, number][] = [[0, 0.5], [3.25, 0.05], [6.5, 0.5], [9.75, 0]];
  const wrapOut: [number, number][] = [[4.75, 0.05], [8, 0.05], [11.25, 0.05], [15, 0]];

  for (let i = 0; i < 4; i++) {
    const n = i + 1;
    const chars = split(`.text-h2.scroll-${n}`, { type: "chars", mask: "chars" }).chars;
    tl.fromTo(
      chars,
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 0.75, stagger: { amount: 1 }, ease: "power3.inOut" },
      inAt[i],
    ).to(chars, { opacity: 0, yPercent: -100, duration: 0.75, stagger: { amount: 1 }, ease: "power3.inOut" }, outAt[i]);

    tl.fromTo(
      `.label.scroll-${n}`,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power1.in" },
      labelInAt[i],
    ).to(`.label.scroll-${n}`, { opacity: 0, y: -10, duration: 0.4, ease: "power1.in" }, outAt[i]);

    tl.fromTo(`.${doodles[i]}`, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.in" }, doodleInAt[i]).to(
      `.${doodles[i]}`,
      { opacity: 0, duration: 0.5, ease: "power1.in" },
      outAt[i],
    );

    tl.fromTo(
      `.scroll-wrapper-single._${n}`,
      { opacity: 0 },
      { opacity: 1, duration: wrapIn[i][1], ease: "power1.in" },
      wrapIn[i][0],
    ).to(`.scroll-wrapper-single._${n}`, { opacity: 0, duration: wrapOut[i][1], ease: "power1.in" }, wrapOut[i][0]);
  }
}

function tracks() {
  // i-c4fffa49: each sticky track card shrinks as the next one slides over it.
  for (const card of q(".master-snap-section")) {
    gsap.fromTo(
      card,
      { scale: 1 },
      { scale: 0.6, ease: "power1.in", scrollTrigger: { trigger: card, start: "top top", end: "bottom top", scrub: true } },
    );
  }

  // IX2 "Section / Change Color": all sections go dark while the Tracks stretch scrolls by.
  const cream = "#ebe8db";
  const dark = "#2a2119";
  const sections = q(".section");
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: ".color-change", start: "top bottom", end: "bottom top", scrub: 1 },
  });
  tl.fromTo(sections, { backgroundColor: cream, color: dark }, { backgroundColor: dark, color: "#ffffff", duration: 10 }, 0)
    .to(sections, { backgroundColor: cream, color: dark, duration: 7 }, 80)
    .set({}, {}, 100);
}

function story() {
  // i-ec7ec0f4: stat numbers roll up when they come into view.
  for (const num of q(".number-animate > *")) {
    const chars = split(num, { type: "chars", mask: "chars" }).chars;
    gsap.fromTo(
      chars,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.5,
        delay: 0.3,
        stagger: { amount: 1 },
        ease: "power1.in",
        scrollTrigger: { trigger: num.parentElement, start: "top bottom", toggleActions: "play none none none" },
      },
    );
  }
}

function signal() {
  // i-eef0c60c: the "Start the rhythm" block and the photo ring zoom.
  const labelChars = split(".label-wrap-signal", { type: "chars" }).chars;
  // Split inside the h2, so the heading stays one heading.
  const lines = split(".heading-signal h2", { type: "lines", mask: "lines" }).lines;

  gsap
    .timeline({
      defaults: { ease: "power1.in" },
      scrollTrigger: { trigger: "section.signal", start: "top top", end: "bottom bottom", scrub: 0.8 },
    })
    .fromTo(labelChars, { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, duration: 0.2, stagger: { amount: 1, from: "end" } }, 0)
    .to(labelChars, { opacity: 0, yPercent: -100, duration: 0.2, stagger: { amount: 1, from: "start" } }, 2.88)
    .fromTo(lines, { opacity: 0, yPercent: -100 }, { opacity: 1, yPercent: 0, duration: 1, stagger: { amount: 0.3 } }, 0.16)
    .to(lines, { yPercent: 100, duration: 1, stagger: { amount: 0.3 } }, 2.35)
    .fromTo(".button-wrap-signal", { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, duration: 0.33 }, 0.15)
    .to(".button-wrap-signal", { opacity: 0, duration: 0.33 }, 2.89)
    .fromTo(".circle-wrapper", { yPercent: 0, scale: 1 }, { yPercent: 110, scale: 2.75, duration: 2.5, ease: "power3.inOut" }, 3.01);
}

function photoRing() {
  // Custom script: place the 24 photos on a circle, each turned to the tangent.
  const wrapper = document.querySelector<HTMLElement>(".circle-wrapper");
  const items = q(".circle-image");
  if (!wrapper || !items.length) return;
  const r = Math.min(wrapper.offsetWidth, wrapper.offsetHeight) / 2 - 50;
  const step = 360 / items.length;
  items.forEach((item, i) => {
    const angle = step * i;
    const rad = (angle * Math.PI) / 180;
    gsap.set(item, {
      x: Math.cos(rad) * r,
      y: Math.sin(rad) * r,
      rotation: angle + 90,
      transformOrigin: "50% 50%",
      position: "absolute",
    });
  });
}

function footer() {
  // i-ddfb1295: endless logo marquee.
  gsap.fromTo(".footer-marquee-item-wrap", { xPercent: 0 }, { xPercent: -100, duration: 20, ease: "none", repeat: -1 });

  // IX2 "Divider / Expand"
  for (const divider of q(".section-divider")) {
    gsap.fromTo(
      divider,
      { width: "0%" },
      { width: "100%", duration: 1, ease: "sine.out", scrollTrigger: { trigger: divider, start: "top bottom" } },
    );
  }
}

export default function Motion() {
  useGSAP(() => {
    photoRing();
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", (context) => {
      preloaderAndHero();
      // Split text only once the real fonts are in, so lines break where they will stay.
      const scrollScenes = context.add("scrollScenes", () => {
        navigation();
        vibeHeadline();
        tracks();
        story();
        signal();
        footer();
        ScrollTrigger.refresh();
      });
      let live = true;
      document.fonts.ready.then(() => live && scrollScenes());
      return () => {
        live = false;
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".preloader", { display: "none" });
    });
  });

  return null;
}
