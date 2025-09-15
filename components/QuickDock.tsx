"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function QuickDock() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on(); // set initial state
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    // wrapper must NOT capture pointer events
    <div className="pointer-events-none fixed bottom-6 right-6 z-40">
      {!show ? null : (
        // only the dock itself is clickable
        <div
          className="pointer-events-auto rounded-2xl shadow-2xl bg-[#0a1a0e]/95 backdrop-blur-md
                        border border-white/20 flex items-center gap-1 px-3 py-2"
        >
          <Link 
            href="/" 
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
              isActive('/') 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <img src="/logo-white.svg" alt="ADND" className="w-6 h-6" />
            <span className="text-sm font-medium">Accueil</span>
          </Link>
          
          <div className="h-6 w-px bg-white/20" />
          
          <Link 
            href="/services" 
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive('/services') || pathname.startsWith('/services/')
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Services
          </Link>
          
          <Link 
            href="/projets" 
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive('/projets') || pathname.startsWith('/projets/')
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Projets
          </Link>
          
          <Link 
            href="/equipe" 
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive('/equipe')
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Équipe
          </Link>
          
          <div className="h-6 w-px bg-white/20" />
          
          <Link 
            href="/soumission" 
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive('/soumission')
                ? 'bg-emerald-500 text-emerald-950' 
                : 'bg-emerald-500/80 text-white hover:bg-emerald-500'
            }`}
          >
            Soumission
          </Link>
        </div>
      )}
    </div>
  );
}
