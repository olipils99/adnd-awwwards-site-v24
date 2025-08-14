import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container-g py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div>
            <div className="uppercase text-xs text-white/60 mb-2">Contact</div>
            <ul className="space-y-1 text-white/80">
              <li className="flex items-center gap-2">
                <Mail size={16} />{" "}
                <a href="mailto:olivier.pilon@kotra.app">
                  olivier.pilon@kotra.app
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />{" "}
                <a href="tel:+14383774674">+1 438 377 4674</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={16} />{" "}
                <a href="https://instagram.com" target="_blank" rel="noopener">
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin size={16} />{" "}
                <a href="https://linkedin.com" target="_blank" rel="noopener">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:text-right text-white/60 text-sm flex md:block items-end justify-between">
          <div>© {new Date().getFullYear()} Kotra — Tous droits réservés.</div>
        </div>
      </div>
    </footer>
  );
}
