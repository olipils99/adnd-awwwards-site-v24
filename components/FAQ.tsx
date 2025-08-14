"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = [
  { q: "Combien de temps dure un projet typique?", a: "Selon l’ampleur: de 2 à 4 semaines pour une cour familiale complète." },
  { q: "Offrez-vous des plans 3D?", a: "Oui, la conception 3D est incluse sur les projets d’envergure." },
  { q: "Pouvez-vous entretenir notre terrain après les travaux?", a: "Oui, nous proposons des contrats saisonniers souples." },
];

export default function FAQ(){
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-16 bg-[#F7FBF7]">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">Questions fréquentes</h2>
        <div className="mt-6 space-y-3">
          {ITEMS.map((it, i) => {
            const o = open === i;
            return (
              <div key={i} className="rounded-2xl border border-black/10 bg-white">
                <button onClick={()=> setOpen(o ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between">
                  <span className="font-medium">{it.q}</span>
                  <span className="text-2xl leading-none">{o ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {o && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-4 text-gray-700"
                    >
                      {it.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
