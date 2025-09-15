import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, SECTION_LABELS, type Category } from "@/lib/data";

type Params = { category: string };

// ---------- Static params (SSG) ----------
export function generateStaticParams() {
  return Object.keys(SECTION_LABELS).map((category) => ({
    category,
  }));
}

// ---------- SEO ----------
export function generateMetadata({ params }: { params: Params }): Metadata {
  const category = params.category as Category;
  const categoryLabel = SECTION_LABELS[category];
  const categoryServices = SERVICES.filter(s => s.category === category);
  
  if (!categoryLabel || categoryServices.length === 0) return {};
  
  const title = `${categoryLabel} — Services ADND`;
  const description = `Découvrez nos services d'${categoryLabel.toLowerCase()} : ${categoryServices.map(s => s.title).join(', ')}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/services/${category}`,
      type: "website",
    },
  };
}

// ---------- UI helpers ----------
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}

export default function ServiceCategoryPage({ params }: { params: Params }) {
  const category = params.category as Category;
  const categoryLabel = SECTION_LABELS[category];
  const categoryServices = SERVICES.filter(s => s.category === category);
  
  if (!categoryLabel || categoryServices.length === 0) return notFound();

  return (
    <div className="relative">
      {/* gentle hero gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_0%_-10%,#e8f7ee,transparent)] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-6 py-16 relative">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/services" className="text-sm text-emerald-700/70 hover:text-emerald-700">
            Services
          </Link>
          <span className="mx-2 text-sm text-gray-400">/</span>
          <span className="text-sm text-gray-600">{categoryLabel}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-4">
            {categoryLabel}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos services d'{categoryLabel.toLowerCase()} professionnels pour entretenir et embellir vos espaces verts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {categoryServices.map((service) => (
            <div
              key={service.slug}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-black/10 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                {service.title}
              </h3>
              
              {service.excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.excerpt}
                </p>
              )}

              {service.chips && service.chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.chips.slice(0, 3).map((chip) => (
                    <Chip key={chip}>{chip}</Chip>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <Link
                  href={`/services/${service.category}/${service.slug}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm group-hover:underline"
                >
                  En savoir plus →
                </Link>
                {service.duration && (
                  <span className="text-xs text-gray-500">
                    {service.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Prêt à transformer vos espaces verts ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contactez-nous pour une estimation gratuite et découvrez comment nos services d'{categoryLabel.toLowerCase()} peuvent améliorer votre propriété.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/soumission"
              className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-white shadow-sm hover:bg-emerald-700 transition font-medium"
            >
              Demander une soumission
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              >
                <path d="M10.22 3.22a.75.75 0 011.06 0l5.5 5.5a.75.75 0 010 1.06l-5.5 5.5a.75.75 0 11-1.06-1.06L14.94 10 10.22 5.28a.75.75 0 010-1.06z" />
                <path d="M3 10a.75.75 0 01.75-.75h10.69a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" />
              </svg>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-emerald-600 bg-white px-6 py-3 text-emerald-600 hover:bg-emerald-50 transition font-medium"
            >
              Nous contacter
            </Link>
          </div>
        </section>

        {/* Back to all services */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Voir tous les services
          </Link>
        </div>
      </div>
    </div>
  );
}
