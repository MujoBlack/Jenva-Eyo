/**
 * "Pause motion" preference (WCAG 2.2.2). Shared by the toggle, the GSAP
 * loops in Motion.tsx and every BgVideo. Stored per browser; defaults to
 * paused when the visitor's system asks for reduced motion.
 */
const KEY = "jenva-motion";
const EVENT = "jenva:motion";

export function motionPaused(): boolean {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return saved === "paused";
  } catch {}
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setMotionPaused(paused: boolean) {
  try {
    localStorage.setItem(KEY, paused ? "paused" : "playing");
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: paused }));
}

/** Calls `fn` now and whenever the preference changes. Returns an unsubscribe. */
export function onMotionChange(fn: (paused: boolean) => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const run = () => {
    const paused = motionPaused();
    document.documentElement.dataset.motion = paused ? "paused" : "playing";
    fn(paused);
  };
  run();
  window.addEventListener(EVENT, run);
  mq.addEventListener("change", run);
  return () => {
    window.removeEventListener(EVENT, run);
    mq.removeEventListener("change", run);
  };
}
