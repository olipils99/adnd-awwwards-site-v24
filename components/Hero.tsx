"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
  // subtle parallax on the heading
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const k = 0.03; // parallax intensity
    const onMove = (e: MouseEvent) => {
      x.set((e.clientX - window.innerWidth / 2) * -k);
      y.set((e.clientY - window.innerHeight / 2) * -k);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <section className="relative  z-50 overflow-hidden">
      {/* Background image */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/GARE_1.jpg" // put the file in /public/media
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* soft white scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:py-36">
        <motion.h1
          style={{ x: springX, y: springY }}
          className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl text-gray-900"
        >
          Aménagement paysager <span className="text-brand-700">familial</span>{" "}
          et durable.
        </motion.h1>

        <p className="mt-6 max-w-2xl text-gray-700">
          Conception, réalisation et entretien d’espaces verts où il fait bon se
          réunir.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/services"
            className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium"
          >
            Découvrir nos services
          </a>
          <a
            href="/soumission"
            className="px-5 py-3 rounded-full border border-gray-300 bg-white/80 backdrop-blur"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
