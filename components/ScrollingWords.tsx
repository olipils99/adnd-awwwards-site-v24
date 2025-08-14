"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const ROWS = [
  ["ensemencement","traitement","contrôle","🌱","ensemencement","contrôle"],
  ["aération","gazon","sol","🌿","contrôle","aération","gazon"],
  ["traitement","🌾","contrôle","ensemencement","aération"],
];

function Row({ items, reverse=false }: { items: (string)[]; reverse?: boolean }){
  const id = useId();
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4 py-2 will-change-transform"
        initial={{ x: reverse ? "-20%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-20%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...items, ...items, ...items].map((word, i) => (
          <span
            key={`${id}-${i}-${word}`}
            className="px-5 py-3 rounded-full bg-white text-gray-900 border border-black/10 text-lg md:text-xl shadow-sm"
            style={
              word.includes("🌱") || word.includes("🌿")
                ? { backgroundColor: "white" }
                : {}
            }
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollingWords(){
  return (
    <section aria-label="Mots-clés" className="py-10 md:py-16 bg-[#0b1a0f] text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-sm uppercase tracking-wider opacity-70 mb-3">Nos expertises</div>
      </div>
      <div className="space-y-2">
        <Row items={ROWS[0]} />
        <Row items={ROWS[1]} reverse />
        <Row items={ROWS[2]} />
      </div>
    </section>
  );
}
