"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  rounded?: boolean;
};

export default function VideoMedia({ src, poster, className, rounded = true }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.playsInline = true;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className + (rounded ? " rounded-2xl" : "")}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      controls={false}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      <source src={src} type="video/mp4" />
      Votre navigateur ne supporte pas la vidéo HTML5.
    </video>
  );
}
