"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const ICONROW = [
  { i: "/icons/leaf.svg", t: "Écologie" },
  { i: "/icons/shield.svg", t: "Durabilité" },
  { i: "/icons/thumb.svg", t: "Qualité" },
];

export default function GrowthStory() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const vine = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const bg = useTransform(scrollYProgress, [0, 1], ["#F0FDF4", "#010D00"]);

  return (
    <section ref={ref} className="relative">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ background: bg }}
      />
      <div className="mx-auto max-w-7xl px-4">
        <div className="sticky top-20 h-[70vh] hidden md:block">
          {/* Vine line grows with progress */}
          <div className="relative h-full">
            <div className="absolute left-6 top-0 bottom-0 w-[3px] bg-black/10 rounded-full" />
            <motion.div
              className="absolute left-6 bottom-0 w-[3px] bg-brand-600 rounded-full origin-bottom"
              style={{ height: vine }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-[30vh] md:space-y-[60vh] py-24">
          <div className="md:pl-24">
            <Reveal>
              <h3 className="text-3xl md:text-5xl font-semibold text-gray-900">
                1 · La graine
              </h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 text-gray-700 max-w-2xl">
                On écoute vos besoins, on mesure l’espace et on récolte vos
                inspirations.
              </p>
            </Reveal>
          </div>

          <div className="md:pl-24">
            <Reveal>
              <h3 className="text-3xl md:text-5xl font-semibold text-gray-700">
                2 · La pousse
              </h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 text-gray-700 max-w-2xl">
                On conçoit en 3D, on choisit les matériaux et on organise le
                chantier.
              </p>
            </Reveal>
          </div>

          <div className="md:pl-24">
            <Reveal>
              <h3 className="text-3xl md:text-5xl font-semibold text-gray-600">
                3 · Le jardin
              </h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 text-gray-700 max-w-2xl">
                On réalise, plante et éclaire. Puis on vous remet un plan
                d’entretien simple.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 md:pl-24">
            <div className="flex gap-4 flex-wrap">
              {ICONROW.map((x, idx) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 border border-black/10"
                >
                  <img src={x.i} alt="" width="18" height="18" />
                  <span className="text-sm">{x.t}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
