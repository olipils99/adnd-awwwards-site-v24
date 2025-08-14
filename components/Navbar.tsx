"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="ADND" width={100} height={100} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link
            href="/services"
            className="opacity-80 hover:opacity-100 link-underline"
          >
            Services
          </Link>
          <Link
            href="/projets"
            className="opacity-80 hover:opacity-100 link-underline"
          >
            Réalisations
          </Link>
          <Link
            href="/equipe"
            className="opacity-80 hover:opacity-100 link-underline"
          >
            Équipe
          </Link>
          <a
            href="/#temoignages"
            className="opacity-80 hover:opacity-100 link-underline"
          >
            Témoignages
          </a>
          <a
            href="/soumission"
            className="px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-medium"
          >
            Soumission
          </a>
        </nav>
      </div>
      <motion.div
        className="h-[3px] bg-brand-500/80 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
