"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const FLOWERS = [
  "/flowers/leaf-1.svg",
  "/flowers/flower-1.svg",
  "/flowers/leaf-2.svg",
  "/flowers/flower-2.svg",
  "/flowers/leaf-3.svg",
];

export default function EcoDesign() {
  return (
    <section className="relative overflow-hidden bg-[#011700]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Reveal>
            <div className="text-sm uppercase tracking-wider text-brand-700">
              Design & performance écologique
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mt-2">
              Beau, durable, facile à vivre
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-gray-400 mt-3 max-w-xl">
              Nous sélectionnons des matériaux durables, optimisons l’arrosage
              et favorisons la biodiversité. Un extérieur pensé pour les
              familles, avec un entretien simple.
            </p>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Reveal delay={0.18}>
              <div className="card p-4">
                <div className="font-medium">Gestion de l’eau</div>
                <p className="text-sm text-gray-600">
                  Dalles perméables, drainage discret.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="card p-4">
                <div className="font-medium">Sélection végétale</div>
                <p className="text-sm text-gray-600">
                  Essences adaptées et rustiques.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="card p-4">
                <div className="font-medium">Matériaux locaux</div>
                <p className="text-sm text-gray-600">
                  Empreinte réduite, look naturel.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.36}>
              <div className="card p-4">
                <div className="font-medium">Éclairage efficient</div>
                <p className="text-sm text-gray-600">
                  LEDs basse conso, ambiances douces.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative h-[360px] md:h-[460px]">
          <motion.div
            className="absolute inset-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: { opacity: 1 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.25, delayChildren: 0.1 },
              },
            }}
          >
            {FLOWERS.map((src, i) => (
              <motion.div
                key={src}
                className="absolute drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.85, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  delay: i * 0.2,
                }}
                style={{
                  top: `${10 + ((i * 14) % 70)}%`,
                  left: `${((i * 22) % 70) + 10}%`,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  width={160}
                  height={160}
                  className="w-[120px] md:w-[160px] h-auto select-none pointer-events-none"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
