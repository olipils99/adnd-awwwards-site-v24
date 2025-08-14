"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import ParallaxDecor from "./ParallaxDecor";
import Reveal from "./Reveal";

export default function ParallaxSection() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section aria-label="Présentation" className="relative overflow-hidden">
      <ParallaxDecor />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-10 right-10 opacity-40 pointer-events-none"
      >
        <Image src="/images/IMG_0809.jpg" alt="" width={320} height={320} />
      </motion.div>
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 bottom-10 left-10 opacity-20 pointer-events-none"
      >
        <Image src="/images/IMG_9589.jpg" alt="" width={420} height={120} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
                Design <span className="text-brand-700">&</span> performance
                écologique
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-gray-700">
                Nous combinons l’architecture paysagère, des matériaux durables
                et un sens du détail pour créer des lieux où il fait bon vivre.
                Nos équipes accompagnent votre projet de A à Z : conception 3D,
                gestion de chantier, plantations et entretien.
              </p>
            </Reveal>
          </div>
          <div className="card p-1 bg-white">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/IMG_8012.jpg"
                alt="Jardin contemporain"
                width={1600}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
