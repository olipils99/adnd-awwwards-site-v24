"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function QuickDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on(); // set initial state
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    // wrapper must NOT capture pointer events
    <div className="pointer-events-none fixed bottom-6 right-6 z-40">
      {!show ? null : (
        // only the dock itself is clickable
        <div
          className="pointer-events-auto rounded-full shadow-xl bg-white/90 backdrop-blur
                        border border-black/10 flex items-center gap-2 pl-2 pr-3 py-1.5"
        >
          <Link href="/" className="flex items-center gap-2 pr-2">
            <img src="/logo.svg" alt="ADND" className="w-12 h-12 ml-1" />
          </Link>
          <div className="h-5 w-px bg-black/10" />
          <Link href="/services" className="text-sm hover:underline">
            Services
          </Link>
          <Link href="/projets" className="text-sm hover:underline">
            Réalisations
          </Link>
          <Link href="/soumission" className="text-sm hover:underline">
            Soumission
          </Link>
        </div>
      )}
    </div>
  );
}
