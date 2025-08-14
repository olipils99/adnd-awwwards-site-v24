"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SERVICES, type Service } from "../lib/data";


const bands = [
  "bg-[#F1FBF5]",
  "bg-[#ECFDF5]",
  "bg-[#F7FEE7]",
  "bg-[#F0FDFA]"
];

export default function ServicesList() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-24">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">Nos services</h2>
      <p className="mt-3 text-gray-600 max-w-2xl">Des solutions claires et efficaces pour la maison et les espaces commerciaux.</p>

      <div className="mt-10 space-y-4">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <Link href={`/services/${s.slug}`} className="block group focus:outline-none">
              <motion.div
                whileHover={{ y: -2 }}
                className="w-full border border-black/10 rounded-2xl overflow-hidden transition-colors duration-300"
              >
                <div className={`p-5 md:p-7 rounded-2xl transition-colors duration-300 ${bands[i % bands.length]} group-hover:bg-brand-500`}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-3xl md:text-5xl font-semibold group-hover:text-black/90">{s.title}</h3>
                    <div className="hidden md:flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1 rounded-full border border-black/10 group-hover:border-black/20 bg-white/70 group-hover:bg-white/90 text-sm"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 group-hover:text-black/80">{s.excerpt}</p>
                </div>
              </motion.div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-sm text-gray-600">Survolez un service (il devient vert) puis cliquez pour tout savoir.</div>
    </section>
  );
}
