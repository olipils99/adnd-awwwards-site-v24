"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const BLOOMS = [
  { src: "/flowers/leaf-1.svg", x: "8%", y: "10%", r: -12 },
  { src: "/flowers/flower-1.svg", x: "70%", y: "12%", r: 8 },
  { src: "/flowers/leaf-2.svg", x: "18%", y: "55%", r: 6 },
  { src: "/flowers/flower-2.svg", x: "60%", y: "58%", r: -6 },
  { src: "/flowers/leaf-3.svg", x: "40%", y: "28%", r: 0 },
];

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.28, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.85, y: 26 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function BloomSection() {
  const { scrollYProgress } = useScroll();
  const driftY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#022400] to-[#022400]">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {BLOOMS.map((b) => (
          <motion.div
            key={b.src}
            variants={item}
            style={{ top: b.y, left: b.x, y: driftY, rotate: b.r }}
            className="absolute w-[110px] md:w-[160px] drop-shadow-lg"
            aria-hidden
          >
            <Image
              src={b.src}
              alt=""
              width={200}
              height={200}
              className="w-full h-auto select-none pointer-events-none"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
              Faites fleurir <span className="italic">votre</span> extérieur
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-white/90 text-lg">
              On conçoit des cours conviviales et durables. Des matériaux
              choisis, un entretien simple et un design pensé pour la famille.
              Faites pousser un lieu de vie qui vous ressemble.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex gap-4">
            <a
              href="/services"
              className="px-5 py-3 rounded-full bg-white text-brand-700 font-medium"
            >
              Découvrir nos services
            </a>
            <a
              href="/soumission"
              className="px-5 py-3 rounded-full border border-white/70 text-white hover:bg-white/10"
            >
              Demander une soumission
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
