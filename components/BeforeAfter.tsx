"use client";

import Image from "next/image";
import { useState } from "react";

export default function BeforeAfter(){
  const [v, setV] = useState(50);
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">Avant / Après</h2>
        <p className="text-gray-700 mt-2">Glissez pour voir la transformation.</p>
        <div className="mt-6 relative rounded-2xl overflow-hidden border border-black/10">
          <div className="aspect-[16/9] relative">
            <Image src="/images/proj-1.svg" alt="Avant" fill className="object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: v + "%" }}>
              <Image src="/images/proj-2.svg" alt="Après" fill className="object-cover" />
            </div>
          </div>
          <input
            type="range" min={0} max={100} value={v}
            onChange={e=> setV(Number(e.target.value))}
            className="absolute left-0 right-0 bottom-4 mx-auto w-[80%]"
          />
        </div>
      </div>
    </section>
  );
}
