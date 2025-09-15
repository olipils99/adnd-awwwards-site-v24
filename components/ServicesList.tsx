"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  SECTION_ORDER,
  SECTION_LABELS,
  SERVICES_BY_CATEGORY,
  servicePath,
} from "@/lib/data";

export default function ServicesList() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-2xl md:text-4xl font-semibold">Nos services</h2>
      <p className="mt-3 max-w-2xl text-gray-600">
        Des solutions claires et efficaces pour la maison et les espaces
        commerciaux.
      </p>

      {/* navigation d'ancrage */}
      <nav className="mt-6 flex flex-wrap gap-2">
        {SECTION_ORDER.map((cat) => (
          <a
            key={cat}
            href={`#${cat}`}
            className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-sm text-gray-700 hover:bg-white"
          >
            {SECTION_LABELS[cat]}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {SECTION_ORDER.map((cat) => {
          const list = SERVICES_BY_CATEGORY[cat] ?? [];
          if (!list.length) return null;

          return (
            <div id={cat} key={cat} className="scroll-mt-28">
              <div className="mb-6 flex items-end justify-between">
                <h3 className="text-3xl font-bold tracking-tight">
                  {SECTION_LABELS[cat]}
                </h3>
                <a
                  href={`#${cat}`}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  #
                </a>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s, i) => (
                  <Link key={s.slug} href={servicePath(s)}>
                    <motion.article
                      whileHover={{ y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-5 backdrop-blur
                                 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] hover:bg-white
                                 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,.25)]"
                    >
                      {/* Accent discret */}
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-0.5
                                   bg-gradient-to-r from-[var(--brand,#2F6FE4)]/30 via-teal-400/20 to-emerald-400/30"
                      />

                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-lg md:text-xl font-semibold">
                          {s.title}
                        </h4>
                      </div>

                      {s.chips?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.chips.map((c) => (
                            <span
                              key={c}
                              className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs text-gray-700"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {s.excerpt ? (
                        <p className="mt-3 text-gray-600">{s.excerpt}</p>
                      ) : null}

                      <span className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--brand,#2F6FE4)]">
                        En savoir plus
                        <svg
                          className="h-4 w-4 transition group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
