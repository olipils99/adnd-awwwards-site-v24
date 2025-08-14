export default function SocialsBar(){
  const socials = [
    { href: "https://instagram.com/yourbrand", label: "Instagram" },
    { href: "https://facebook.com/yourbrand", label: "Facebook" },
    { href: "https://www.tiktok.com/@yourbrand", label: "TikTok" },
    { href: "https://youtube.com/@yourbrand", label: "YouTube" },
    { href: "https://linkedin.com/company/yourbrand", label: "LinkedIn" },
  ];
  return (
    <section className="py-12 bg-gradient-to-r from-brand-200 to-brand-100">
      <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center gap-4">
        <h3 className="text-xl font-semibold text-gray-900">Suivez nos projets en direct</h3>
        <div className="flex gap-3">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-white border border-black/10 hover:bg-black/5">{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
