"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Sends a Vercel Analytics event for any click on an element with
 * `data-track="<Event name>"` (plus an optional `data-track-label`), so
 * server-rendered sections need no client code of their own.
 */
export default function Tracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const label = el.dataset.trackLabel;
      track(el.dataset.track!, label ? { label } : undefined);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
