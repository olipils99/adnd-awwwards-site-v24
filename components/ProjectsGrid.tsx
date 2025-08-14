// components/ProjectsGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";

export default function ProjectsGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-8 mx-10 my-20">
      {PROJECTS.map((p) => (
        <Link
          key={p.slug}
          href={`/projets/${p.slug}`}
          className="group block rounded-2xl bg-white ring-1 ring-black/5 shadow-sm
             hover:ring-black/10 overflow-hidden"
        >
          {/* IMAGE */}
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={p.img ?? "/images/proj-1.jpg"} // JPG/PNG, not SVG
              alt={p.title}
              fill
              className="object-cover" // no w-full/h-full here
              sizes="(min-width:1024px) 50vw, 100vw"
              priority={false}
            />
          </div>

          {/* TEXT */}
          <div className="p-4">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-gray-600 text-sm">{p.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
