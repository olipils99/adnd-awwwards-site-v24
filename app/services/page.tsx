// app/services/page.tsx
import Link from "next/link";
import ServicesHero from "@/components/ServicesHero";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { BEFORE_AFTER_IMAGES } from "@/lib/beforeAfterData";
import FAQ from "@/components/FAQ";
import SocialsBar from "@/components/SocialsBar";

import {
  SECTION_ORDER,
  SECTION_LABELS,
  SERVICES_BY_CATEGORY,
  servicePath,
} from "@/lib/data"; // <- sinon: "../../lib/data"

export const metadata = { title: "Services — ADND Paysage" };

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <ServicesHero />

      {/* Corps avec 4 sections */}
      <div className="bg-gradient-to-b from-white via-brand-50/60 to-white dark:from-transparent dark:via-white/5 dark:to-transparent">
        <main className="container mx-auto max-w-7xl px-4 py-12 space-y-16">
          {/* Petite nav d'ancrage */}
          <nav className="flex flex-wrap gap-2 mb-2">
            {SECTION_ORDER.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80 hover:bg-white/20"
              >
                {SECTION_LABELS[cat]}
              </a>
            ))}
          </nav>

          {SECTION_ORDER.map((cat) => {
            const items = SERVICES_BY_CATEGORY[cat] ?? [];
            if (!items.length) return null;

            return (
              <section id={cat} key={cat} className="scroll-mt-28">
                <header className="mb-6 flex items-end justify-between">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {SECTION_LABELS[cat]}
                  </h2>

                  <a
                    href={`#${cat}`}
                    aria-label="Lien d'ancrage"
                    className="text-sm text-white/50 hover:text-white/80"
                  >
                    #
                  </a>
                </header>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      href={servicePath(s)}
                      className="group rounded-xl border border-white/10 bg-white/5 p-5 transition
                                 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,.4)]"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand,#2F6FE4)] opacity-60 group-hover:opacity-100" />
                      </div>

                      {s.excerpt && (
                        <p className="mt-2 text-sm leading-6 text-white/70">
                          {s.excerpt}
                        </p>
                      )}

                      {s.chips?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.chips.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-white/10 px-2 py-0.5 text-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <span className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--brand,#2F6FE4)]">
                        En savoir plus
                        <svg
                          className="h-4 w-4 transition group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>

      {/* Sections additionnelles */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <BeforeAfterSlider images={BEFORE_AFTER_IMAGES} />
        </div>
      </section>
      <FAQ />
      <SocialsBar />
    </>
  );
}
