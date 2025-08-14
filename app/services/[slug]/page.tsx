import { SERVICES } from "../../../lib/data";
import Image from "next/image";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export default function ServiceDetail({ params }: Params) {
  const svc = SERVICES.find(s => s.slug === params.slug);
  if (!svc) return <div className="mx-auto max-w-5xl p-6">Service introuvable.</div>;

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">{svc.title}</h1>
      <p className="mt-4 text-gray-700 max-w-3xl">{svc.excerpt}</p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="col-span-2 card p-2">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image src="/images/hero-yard.svg" alt={svc.title} width={1600} height={900} className="w-full h-full object-cover"/>
          </div>
        </div>
        <aside className="card p-6">
          <h2 className="text-lg font-semibold">Inclus avec ce service</h2>
          <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
            <li>Visite-conseil gratuite</li>
            <li>Devis détaillé</li>
            <li>Plan d’entretien personnalisé</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {svc.chips.map(c => <span key={c} className="px-3 py-1 rounded-full bg-brand-100 text-brand-900 border border-brand-300 text-sm">{c}</span>)}
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <h3 className="text-xl font-semibold">Galerie photos</h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="overflow-hidden rounded-xl border border-black/10">
              <Image src={`/images/proj-${(i%4)+1}.svg`} alt={`Photo ${i}`} width={800} height={600} className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-xl font-semibold">Vidéo</h3>
        <div className="mt-4 card p-2">
          <video className="w-full rounded-xl" controls poster="/images/proj-1.svg">
            <source src="/media/demo.mp4" type="video/mp4"/>
            Votre navigateur ne supporte pas la vidéo HTML5.
          </video>
        </div>
      </section>
    </main>
  );
}
