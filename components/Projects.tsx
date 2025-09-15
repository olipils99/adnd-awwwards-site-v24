"use client";
import Link from "next/link";
import { useRef } from "react";
import Reveal from "./Reveal";
import { PROJECTS } from "@/lib/data";
import OptimizedImage from "./OptimizedImage";
// import ImagePreloader from "./ImagePreloader";

function withInertia(el: HTMLDivElement, v0: number, onDone: () => void) {
  let v = v0,
    raf = 0;
  const friction = 0.92; // Moins de friction pour plus de fluidité
  const step = () => {
    el.scrollLeft -= v * 16;
    v *= friction;
    if (Math.abs(v) < 0.01) { // Seuil plus bas pour arrêter plus tôt
      cancelAnimationFrame(raf);
      onDone();
      return;
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

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
  const abs = Math.abs;

  if (!PROJECTS.length) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    state.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
    };
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
    state.current.v = 0.8 * state.current.v + 0.2 * (delta / dt);
    if (abs(dx) > 5) draggingRef.current = true; // Seuil pour détecter le drag
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
    
    // Réinitialiser le flag de drag après un court délai
    setTimeout(() => {
      draggingRef.current = false;
    }, 50);
    withInertia(el, state.current.v, () => {
      const children = Array.from(
        el.querySelectorAll("figure[data-item]"),
      ) as HTMLElement[];
      if (!children.length) {
        el.classList.remove("dragging");
        return;
      }
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = children[0],
        best = Infinity;
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
    // Si on a fait du drag, on empêche le clic
    if (draggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Sinon, on laisse le clic fonctionner normalement
    return true;
  };
  const preventDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section id="realisations" className="py-24 bg-[#011700]">
      {/* <ImagePreloader 
        images={PROJECTS.slice(0, 8).map(p => p.img)} 
        priority={true} 
      /> */}
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
              {PROJECTS.slice(0, 8).map((p, index) => (
                <Link
                  key={p.slug}
                  href={`/projets/${p.slug}`}
                  onClick={onClickCard}
                >
                  <figure
                    className="p-1 snap-start hover:-translate-y-2 transition-transform duration-200 group"
                    data-item
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                      <OptimizedImage
                        src={p.img}
                        alt={p.title}
                        width={1600}
                        height={1200}
                        className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-300"
                        priority={true}
                        loading="eager"
                        quality={75}
                        placeholder="blur"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {!!p.video && (
                        <div className="absolute top-3 left-3 rounded-full bg-black/70 text-white text-xs px-2 py-1 backdrop-blur-sm">
                          ▶︎ vidéo
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <figcaption className="p-4 text-sm bg-white rounded-xl mt-2 ring-1 ring-black/5 group-hover:ring-blue-200 transition-all duration-200">
                      <div className="font-semibold text-gray-900 pointer-events-none group-hover:text-blue-600 transition-colors duration-200">
                        {p.title}
                      </div>
                      {!!p.summary && (
                        <div className="text-gray-600 pointer-events-none line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                          {p.summary}
                        </div>
                      )}
                      {p.gallery && p.gallery.length > 0 && (
                        <div className="mt-1 text-xs text-gray-500">
                          {p.gallery.length} photo{p.gallery.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </figcaption>
                  </figure>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
