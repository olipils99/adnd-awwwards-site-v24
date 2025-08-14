// app/projets/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECTS } from "../../../lib/data";
import Reveal from "@/components/Reveal";
import VideoMedia from "@/components/VideoMedia";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({ params }: Params) {
  const proj = PROJECTS.find((p) => p.slug === params.slug);
  if (!proj) return notFound();

  const coverImg = proj.img ?? "/images/proj-1.jpg";
  const gallery: string[] =
    proj.gallery ??
    Array.from({ length: 8 }, (_, i) => `/images/proj-${(i % 4) + 1}.jpg`);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
          {proj.title}
        </h1>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-3 text-gray-700 max-w-3xl">{proj.summary}</p>
      </Reveal>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            {proj.video ? (
              <VideoMedia
                src={proj.video}
                poster={proj.poster ?? coverImg}
                className="absolute inset-0"
              />
            ) : (
              <Image
                src={coverImg}
                alt={proj.title}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 66vw, 100vw"
                priority
              />
            )}
          </div>
        </div>

        <aside className="card p-6">
          <h2 className="font-semibold">Détails</h2>
          <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
            <li>Budget: Sur mesure</li>
            <li>Durée: 2-4 semaines</li>
            <li>Matériaux: bois, pavé, plantations</li>
          </ul>
        </aside>
      </div>

      <Reveal>
        <section className="mt-12" aria-label="Galerie">
          <h3 className="text-xl font-semibold">Galerie</h3>
        </section>
      </Reveal>

      <section className="mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[16/10] overflow-hidden rounded-xl border border-black/10"
            >
              <Image
                src={src}
                alt={`Photo ${i + 1} — ${proj.title}`}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
