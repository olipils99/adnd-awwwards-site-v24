"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const items = [
  { icon: "🌿", title: "Matériaux durables", desc: "Sélection locale, gestion des déchets et compostage des résidus verts." },
  { icon: "👨‍👩‍👧‍👦", title: "Pensé pour la famille", desc: "Espaces sécuritaires où enfants et amis peuvent se réunir." },
  { icon: "🗓️", title: "Suivi simple", desc: "Plan de projet clair, échéancier et messages centralisés." },
  { icon: "🧑‍🎨", title: "Design 3D", desc: "Rendus immersifs pour valider le résultat final avant travaux." },
];

export default function IconFeatures(){
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal><h2 className="text-2xl md:text-4xl font-semibold text-gray-900">Pourquoi ADND</h2></Reveal>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i*0.06}>
              <div className="card p-6 text-center h-full">
                <div className="text-4xl">{it.icon}</div>
                <div className="mt-3 font-semibold">{it.title}</div>
                <p className="text-gray-600 mt-2">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
