import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, SECTION_LABELS, type Category } from "@/lib/data";

type Params = { category: string; slug: string };

// ---------- Static params (SSG) ----------
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    category: service.category,
    slug: service.slug,
  }));
}

// ---------- SEO ----------
export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = SERVICES.find(
    (s) => s.category === params.category && s.slug === params.slug
  );
  
  if (!service) return {};
  
  const categoryLabel = SECTION_LABELS[service.category as Category];
  const title = `${service.title} — ${categoryLabel}`;
  const description = service.excerpt || `Service ${service.title} professionnel par ADND`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: service.cover ? [service.cover] : undefined,
      url: `/services/${service.category}/${service.slug}`,
      type: "article",
    },
  };
}

// ---------- UI helpers ----------
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
      {children}
    </span>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = SERVICES.find(
    (s) => s.category === params.category && s.slug === params.slug
  );
  
  if (!service) return notFound();

  const categoryLabel = SECTION_LABELS[service.category as Category];
  const hasGallery = service.gallery && service.gallery.length > 0;
  const includes = service.includes || [];
  const steps = service.steps || [];

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {service.cover ? (
          <Image
            src={service.cover}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-emerald-500 to-green-600" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <Link href="/services" className="text-emerald-300 hover:text-white transition-colors">
                  Services
                </Link>
                <span className="mx-2 text-white/60">/</span>
                <Link href={`/services/${service.category}`} className="text-emerald-300 hover:text-white transition-colors">
                  {categoryLabel}
                </Link>
                <span className="mx-2 text-white/60">/</span>
                <span className="text-white/80">{service.title}</span>
              </nav>

              {/* Title & Chips */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              
              {service.chips && service.chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.chips.map((chip) => (
                    <Chip key={chip}>{chip}</Chip>
                  ))}
                </div>
              )}

              {service.excerpt && (
                <p className="text-xl text-white/90 mb-8 max-w-2xl">
                  {service.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            {service.details && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">À propos</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.details}
                </p>
              </section>
            )}

            {/* What's Included */}
            {includes.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Ce que ça inclut</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Process Steps */}
            {steps.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre processus</h2>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-lg">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {hasGallery && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Galerie photos</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.gallery!.map((src, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={src}
                        alt={`${service.title} - Photo ${index + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <InfoCard title="Informations">
              <div className="space-y-4">
                {service.duration && (
                  <div>
                    <span className="font-medium text-gray-900">Durée :</span>
                    <p className="text-gray-600">{service.duration}</p>
                  </div>
                )}
                
                {service.pricingNote && (
                  <div>
                    <span className="font-medium text-gray-900">Tarification :</span>
                    <p className="text-gray-600">{service.pricingNote}</p>
                  </div>
                )}

                {service.zones && service.zones.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-900">Zones desservies :</span>
                    <p className="text-gray-600">{service.zones.join(", ")}</p>
                  </div>
                )}
              </div>
            </InfoCard>

            {/* CTA */}
            <InfoCard title="Prêt à commencer ?">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Contactez-nous pour une estimation gratuite et personnalisée.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/soumission"
                    className="block w-full bg-emerald-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Demander une soumission
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full border border-emerald-600 text-emerald-600 text-center py-3 px-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </InfoCard>

            {/* Related Services */}
            <InfoCard title="Autres services">
              <div className="space-y-3">
                {SERVICES
                  .filter((s) => s.category === service.category && s.slug !== service.slug)
                  .slice(0, 3)
                  .map((relatedService) => (
                    <Link
                      key={relatedService.slug}
                      href={`/services/${relatedService.category}/${relatedService.slug}`}
                      className="block p-3 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900">{relatedService.title}</h4>
                      {relatedService.excerpt && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {relatedService.excerpt}
                        </p>
                      )}
                    </Link>
                  ))}
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}