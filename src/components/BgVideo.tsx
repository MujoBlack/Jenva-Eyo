"use client";

import { useEffect, useRef } from "react";

type Props = {
  name: string;
  className: string;
  children?: React.ReactNode;
};

/**
 * Full-bleed looping background video (muted, inline). Pauses when the
 * visitor prefers reduced motion, like the original site did.
 */
export default function BgVideo({ name, className, children }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) video.pause();
      else video.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className={`w-background-video ${className}`}>
      <video
        ref={ref}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={`/media/${name}-poster.jpg`}
      >
        <source src={`/media/${name}.mp4`} type="video/mp4" />
      </video>
      {children}
    </div>
  );
}
