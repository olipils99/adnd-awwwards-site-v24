export default function SocialsBar() {
  const socials = [
    { href: "https://instagram.com/adndgroupesaisonnier", label: "Instagram" },
    {
      href: "https://facebook.com/people/ADND-Groupe-Saisonnier/100090569079526/?_rdr",
      label: "Facebook",
    },
    {
      href: "https://linkedin.ca/in/adnd-groupe-saisonnier",
      label: "LinkedIn",
    },
  ];
  return (
    <section className="py-6 bg-gradient-to-r from-brand-200 flex align-center to-brand-100">
      <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center gap-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Suivez nos projets en direct
        </h3>
        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white border border-black/10 hover:bg-black/5"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
