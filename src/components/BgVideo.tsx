"use client";

import { useEffect, useRef, useState } from "react";
import { onMotionChange } from "@/lib/motion-pref";

type Props = {
  name: string;
  className: string;
  children?: React.ReactNode;
  /** Load right away (the hero). Other videos wait until they are about to be seen. */
  eager?: boolean;
  /** False keeps the video unloaded (a Live Shows tab that hasn't been opened). */
  enabled?: boolean;
};

/** Visitors who asked to save data, or are on 2G, get the poster only. */
function saveData() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)2g$/.test(c.effectiveType ?? ""));
}

/**
 * Full-bleed looping background video (muted, inline).
 *
 * The poster shows first. The video file is attached only when the video
 * comes within one screen of view, plays while it is on screen and pauses
 * when it leaves. Phones get a smaller encode (`<name>-mobile.mp4`).
 * Paused under reduced motion or the "Pause motion" toggle.
 */
export default function BgVideo({ name, className, children, eager = false, enabled = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  // Decide when to attach the source.
  useEffect(() => {
    const video = ref.current;
    if (!video || load || !enabled || saveData()) return;
    if (eager) {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [eager, enabled, load]);

  // React has just rendered the <source> tags: make the element pick one.
  useEffect(() => {
    if (load) ref.current?.load();
  }, [load]);

  // Once attached: play only while visible, and never while motion is paused.
  useEffect(() => {
    const video = ref.current;
    if (!video || !load) return;
    let visible = false;
    let paused = false;
    const apply = () => {
      if (visible && enabled && !paused) video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      apply();
    });
    io.observe(video);
    const off = onMotionChange((p) => {
      paused = p;
      apply();
    });
    return () => {
      io.disconnect();
      off();
    };
  }, [load, enabled]);

  return (
    <div className={`w-background-video ${className}`}>
      <video ref={ref} loop muted playsInline preload="none" poster={`/media/${name}-poster.jpg`}>
        {load && (
          <>
            <source src={`/media/${name}-mobile.mp4`} type="video/mp4" media="(max-width: 767px)" />
            <source src={`/media/${name}.mp4`} type="video/mp4" />
          </>
        )}
      </video>
      {children}
    </div>
  );
}
