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
  const gallery: string[] = proj.gallery ?? [proj.img];

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
            <li>Budget: {proj.details?.budget || "Sur mesure"}</li>
            <li>Durée: {proj.details?.duration || "2-4 semaines"}</li>
            <li>Matériaux: {proj.details?.materials?.join(", ") || "bois, pavé, plantations"}</li>
            {proj.details?.location && <li>Localisation: {proj.details.location}</li>}
            {proj.details?.year && <li>Année: {proj.details.year}</li>}
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
              className="relative aspect-[16/10] overflow-hidden rounded-xl border border-black/10 group cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <Image
                src={src}
                alt={`Photo ${i + 1} — ${proj.title}`}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                loading={i < 4 ? "eager" : "lazy"}
                priority={i < 4}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
