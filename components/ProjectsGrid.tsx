import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import OptimizedImage from "./OptimizedImage";

export default function ProjectsGrid() {
  if (!PROJECTS.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-sm text-gray-500">
        Aucun projet à afficher. Vérifie{" "}
        <code className="font-mono">lib/data.generated.ts</code>.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-8 sm:grid-cols-2">
        {PROJECTS.map((p, index) => (
          <Link
            key={p.slug}
            href={`/projets/${p.slug}`}
            className="group block overflow-hidden rounded-2xl ring-1 ring-black/5 bg-white shadow-sm hover:shadow-md hover:ring-black/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative aspect-[16/10] w-full">
              <OptimizedImage
                src={p.img}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width:1024px) 560px, 90vw"
                priority={true}
                loading="eager"
                quality={75}
                placeholder="blur"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {!!p.video && (
                <div className="absolute top-3 left-3 rounded-full bg-black/70 text-white text-xs px-2 py-1 backdrop-blur-sm">
                  ▶︎ vidéo
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {p.title}
              </h3>
              {!!p.summary && (
                <p className="mt-1 text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                  {p.summary}
                </p>
              )}
              {p.gallery && p.gallery.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  {p.gallery.length} photo{p.gallery.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
