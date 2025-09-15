"use client";

import { motion } from "framer-motion";

const team = [
  { name: "Nathan Dassylva", role: "Fondateur & PDG", img: "https://via.placeholder.com/400x300/10b981/ffffff?text=Nathan+Dassylva", bio: "20 ans d'expérience en aménagement résidentiel et commercial." },
  { name: "Alexis Daigneault", role: "Architecte paysagiste", img: "https://via.placeholder.com/400x300/059669/ffffff?text=Alexis+Daigneault", bio: "Design 3D, sélections de plantes, écoresponsabilité." },
  { name: "Équipe ADND", role: "Notre équipe complète", img: "/team/melissa.jpg", bio: "Une équipe passionnée et experte qui transforme vos espaces extérieurs." },
];

export default function Team(){
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <section className="md:col-span-1">
          <div className="text-sm uppercase tracking-wide text-brand-700">Notre équipe</div>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold text-gray-900">Humains avant tout</h1>
          <p className="mt-4 text-gray-700">Une équipe conviviale, experte et fière de créer des lieux de vie familiaux.</p>
        </section>

        <section className="md:col-span-2 grid sm:grid-cols-2 gap-6">
          {team.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{opacity:0, y:12}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:.4}}
              transition={{delay: i*0.05, type:"spring", stiffness:120, damping:18}}
              className="rounded-2xl overflow-hidden border border-black/10 bg-white"
            >
              <div className="aspect-[4/3] bg-black/5">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover"/>
              </div>
              <div className="p-5">
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-gray-600">{m.role}</div>
                <p className="mt-2 text-gray-700 text-sm">{m.bio}</p>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
}
