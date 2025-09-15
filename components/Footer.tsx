import Link from "next/link";
import Image from "next/image";

// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200 bg-white">
      {/* Décor à droite (grille + dégradés) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[28rem] md:block lg:w-[34rem]"
      >
        {/* voile dégradé */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-white to-white" />
        {/* grille douce avec masque pour fondre côté contenu */}
        <div className="diagonal-grid absolute inset-0" />
        {/* halos subtils */}
        <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-emerald-300/25 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-sky-300/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Brand / pitch */}
          <div className="pr-0 md:pr-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="ADND" className="h-9 w-auto" />
            <p className="mt-5 max-w-md text-balance text-slate-600">
              Aménagement paysager durable pour résidences et entreprises —
              qualité, propreté et respect des délais, saison après saison.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/soumission"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow-sm transition
                           hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span className="translate-y-px">Demander une soumission</span>
                <span
                  aria-hidden
                  className="block h-[1px] w-4 origin-left scale-x-0 bg-white/80 transition group-hover:scale-x-100"
                />
              </a>
              <a
                href="mailto:operations@adndgroupesaisonnier.com?subject=Soumission"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-slate-700 transition
                           hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Écrire un courriel
              </a>
            </div>
          </div>

          {/* Sections (tes 4 onglets) */}
          <div>
            <div className="text-sm font-semibold tracking-wide text-slate-900">
              Sections
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a className="link-underline" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="link-underline" href="#realisations">
                  Réalisations
                </a>
              </li>
              <li>
                <a className="link-underline" href="#equipe">
                  Équipe
                </a>
              </li>
              <li>
                <a className="link-underline" href="#temoignages">
                  Témoignages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="relative">
            <div className="text-sm font-semibold tracking-wide text-slate-900">
              Nous joindre
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a
                  className="link-underline"
                  href="mailto:operations@adndgroupesaisonnier.com"
                >
                  operations@adndgroupesaisonnier.com
                </a>
              </li>
              <li>
                <a className="link-underline" href="tel:+15145550123">
                  +1 (514) 555-0123
                </a>
              </li>
              <li>Rive-Nord de Montréal, QC</li>
            </ul>

            {/* petite carte “verre” pour le look */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18)]">
              <div className="text-xs uppercase tracking-widest text-slate-500">
                Disponibilités
              </div>
              <div className="mt-1 text-sm text-slate-700">
                Réponse sous 24–48 h (jours ouvrables)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-start text-sm text-slate-500">
          © {new Date().getFullYear()} ADND — Tous droits réservés · Construit
          et imaginé par{" "}
          <Link
            href="https://kotra.app"
            target="_blank"
            className="font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
          >
            KOTRA
            <Image
              src="/logo-kotra.svg"
              alt="KOTRA"
              width={20}
              height={20}
              className="inline-block"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
