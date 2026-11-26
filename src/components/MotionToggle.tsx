"use client";

import { useEffect, useState } from "react";
import { motionPaused, onMotionChange, setMotionPaused } from "@/lib/motion-pref";

/**
 * Small fixed button that pauses everything that moves on its own: the
 * background videos, the spinning photo ring and the footer marquee.
 * Scroll-driven animations follow the visitor's own scrolling, so they stay.
 */
export default function MotionToggle() {
  const [paused, setPaused] = useState<boolean | null>(null);

  useEffect(() => onMotionChange(setPaused), []);

  if (paused === null) return null;
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={paused}
      aria-label="Pause motion"
      title={paused ? "Play motion" : "Pause motion"}
      onClick={() => setMotionPaused(!motionPaused())}
    >
      {paused ? (
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
