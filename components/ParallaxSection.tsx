"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";

export default function ParallaxSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  // Progress is 0 when the section enters viewport, 1 when it leaves
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Speeds (less movement if user prefers reduced motion)
  const leafRange = reduce ? ["0%", "0%"] : ["-16%", "16%"]; // IMG_9589
  const flowerRange = reduce ? ["0%", "0%"] : ["22%", "-22%"]; // IMG_9582
  const heroYRange = reduce ? ["0%", "0%"] : ["6%", "-6%"];
  const heroScale = reduce ? [1, 1] : [1.06, 1];

  const yLeaf = useTransform(scrollYProgress, [0, 1], leafRange);
  const yFlower = useTransform(scrollYProgress, [0, 1], flowerRange);
  const yHero = useTransform(scrollYProgress, [0, 1], heroYRange);
  const sHero = useTransform(scrollYProgress, [0, 1], heroScale);

  return (
    <section
      ref={ref}
      aria-label="Design & performance écologique"
      className="relative overflow-hidden bg-[#f4f8f4]"
    >
      {/* BG subtle gradient to give depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,#dff5e6_0%,transparent_60%)]" />

      {/* Floating decorations (hidden on very small screens) */}
      <motion.div
        style={{ y: yLeaf }}
        className="hidden sm:block absolute -top-10 left-4 md:left-16 z-10 pointer-events-none w-[160px] md:w-[220px]"
      >
        <Image
          src="/images/IMG_9589.jpg"
          alt=""
          width={320}
          height={200}
          className="w-full h-auto rounded-xl shadow-lg opacity-70"
          priority
        />
      </motion.div>

      <motion.div
        style={{ y: yFlower }}
        className="hidden sm:block absolute -bottom-6 right-3 md:right-20 z-10 pointer-events-none w-[180px] md:w-[260px]"
      >
        <Image
          src="/images/IMG_0809.jpg"
          alt=""
          width={420}
          height={280}
          className="w-full h-auto rounded-xl shadow-lg opacity-70"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text */}
        <div>
          <span className="block text-sm md:text-base font-semibold tracking-widest text-emerald-700">
            Design & performance écologique
          </span>
          <h2 className="mt-2 text-3xl md:text-5xl font-semibold text-slate-900">
            Design & performance{" "}
            <span className="text-emerald-700">écologique</span>
          </h2>
          <p className="mt-4 text-slate-700 text-base md:text-lg leading-relaxed max-w-[55ch]">
            Nous combinons l’architecture paysagère, des matériaux durables et
            un sens du détail pour créer des lieux où il fait bon vivre. Nos
            équipes accompagnent votre projet de A à Z : conception 3D, gestion
            de chantier, plantations et entretien.
          </p>
        </div>

        {/* Hero (slight parallax + zoom-out) */}
        <motion.div
          style={{ y: yHero, scale: sHero, willChange: "transform" }}
          className="rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/10 bg-white"
        >
          <div className="aspect-[16/10] w-full">
            <Image
              src="/images/IMG_8012.jpg"
              alt="Jardin contemporain"
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
