"use client";

import ParallaxDecor from "./ParallaxDecor";

export default function ServicesHero(){
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-200 to-white">
      <ParallaxDecor />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900">Nos services</h1>
        <p className="mt-4 text-gray-700 max-w-2xl">
          Du design à l’entretien — choisissez les solutions adaptées à votre famille et à votre terrain.
        </p>
      </div>
    </section>
  );
}
