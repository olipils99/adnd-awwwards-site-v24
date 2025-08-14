"use client";

import { motion } from "framer-motion";

const items = [
  {
    quote: "Une équipe attentionnée et un résultat impeccable. Notre cour est devenue l’endroit préféré de la famille!",
    author: "Élise & Marc — Longueuil"
  },
  {
    quote: "Design 3D très utile pour se projeter. Le chantier a été propre et rapide, bravo!",
    author: "Sophie — Laval"
  },
  {
    quote: "Professionnels du début à la fin. On recommande sans hésiter.",
    author: "Noémie & Karim — Brossard"
  }
];

export default function Testimonials() {
  return (
    <section id="temoignages" className="mx-auto max-w-7xl px-4 py-24">
      <h2 className="text-center text-2xl md:text-4xl font-semibold">Ils nous font confiance</h2>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.blockquote
            key={t.author}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .3 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-white/90">“{t.quote}”</p>
            <footer className="mt-4 text-white/60">{t.author}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
