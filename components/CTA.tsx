"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="card p-8 md:p-12 text-center !bg-[#011700]">
          <Reveal>
            <motion.h3
              className="text-2xl md:text-4xl font-semibold text-gray-200"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Prêts à sublimer votre extérieur?
            </motion.h3>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Parlez-nous de votre projet. Nous vous revenons rapidement avec
              une estimation gratuite.
            </p>
          </Reveal>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@adnd.example"
              className="px-6 py-3 rounded-full bg-brand-600 text-white font-medium"
            >
              Écrire à ADND
            </a>
            <a
              href="tel:+15145551234"
              className="px-6 py-3 rounded-full border border-gray/10 text-white hover:bg-gray/5"
            >
              Appeler: (514) 555-1234
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
