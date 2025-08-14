"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import { PROJECTS } from "../lib/data";
import VideoMedia from "./VideoMedia";
import Reveal from "./Reveal";

// Helper: inertia scrolling with decay
function withInertia(el: HTMLDivElement, v0: number, onDone: () => void) {
  let v = v0; // px/ms
  let raf = 0;
  const friction = 0.94; // decay per frame
  const step = () => {
    // 16ms/frame approx
    el.scrollLeft -= v * 16;
    v *= friction;
    if (Math.abs(v) < 0.02) {
      cancelAnimationFrame(raf);
      onDone();
      return;
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

const DistortedThumb = dynamic(() => import("./DistortedThumb"), {
  ssr: false,
});

export default function Projects() {
  const ref = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const state = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    v: 0,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    state.current.isDown = true;
    state.current.startX = e.clientX;
    state.current.startScroll = el.scrollLeft;
    state.current.lastX = e.clientX;
    state.current.lastT = performance.now();
    state.current.v = 0;
    draggingRef.current = false;
    el.classList.add("cursor-grabbing", "dragging");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !state.current.isDown) return;
    const now = performance.now();
    const dx = e.clientX - state.current.startX;
    const delta = e.clientX - state.current.lastX;
    const dt = Math.max(1, now - state.current.lastT);
    state.current.v = 0.8 * state.current.v + 0.2 * (delta / dt); // low-pass filtered velocity (px/ms)
    if (Math.abs(dx) > 4) draggingRef.current = true;
    el.scrollLeft = state.current.startScroll - dx;
    state.current.lastX = e.clientX;
    state.current.lastT = now;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
    state.current.isDown = false;
    el.classList.remove("cursor-grabbing");
    // inertia then snap
    const cancel = withInertia(el, state.current.v, () => {
      // Snap to nearest
      const children = Array.from(
        el.querySelectorAll("figure[data-item]"),
      ) as HTMLElement[];
      if (!children.length) {
        el.classList.remove("dragging");
        return;
      }
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = children[0];
      let best = Infinity;
      for (const c of children) {
        const mid = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < best) {
          best = d;
          nearest = c;
        }
      }
      el.scrollTo({
        left: Math.max(0, nearest.offsetLeft - 16),
        behavior: "smooth",
      });
      setTimeout(() => el.classList.remove("dragging"), 250);
    });
  };

  const onPointerLeave = (e: React.PointerEvent) => {
    if (state.current.isDown) onPointerUp(e);
  };

  const onClickCard = (e: React.MouseEvent) => {
    if (draggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const preventDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section id="realisations" className="py-24 bg-[#011700]">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-200">
              Réalisations
            </h2>
            <Link
              href="/projets"
              className="text-sm text-brand-700 hover:underline"
            >
              Voir toutes
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            ref={ref}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerLeave}
            onDragStart={preventDrag}
            className="mt-10 overflow-x-auto no-scrollbar cursor-grab snap-x snap-mandatory select-none touch-pan-y overscroll-x-contain"
          >
            <div className="grid grid-flow-col auto-cols-[80%] md:auto-cols-[40%] gap-6 pr-4">
              {PROJECTS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projets/${p.slug}`}
                  onClick={onClickCard}
                >
                  <motion.figure
                    whileHover={{ y: -8 }}
                    className="card p-1 snap-start"
                    data-item
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={p.img}
                        alt={p.title}
                        width={1600}
                        height={1200}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                      />
                    </div>
                    <figcaption className="p-4 text-sm">
                      <div className="font-semibold pointer-events-none">
                        {p.title}
                      </div>
                      <div className="text-gray-600 pointer-events-none">
                        {p.summary}
                      </div>
                    </figcaption>
                  </motion.figure>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
