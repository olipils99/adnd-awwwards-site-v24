"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { SERVICES, SECTION_ORDER, SECTION_LABELS, servicePath } from "@/lib/data";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();

  // Desktop dropdown state
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close desktop dropdown on outside click / escape
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || triggerRef.current?.contains(t))
        return;
      setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150); // 150ms delay before closing
  };

  // Keyboard open with ArrowDown on trigger
  function onTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      // Focus first item next tick
      setTimeout(() => {
        const first = menuRef.current?.querySelector<HTMLAnchorElement>(
          'a[data-menuitem="true"]',
        );
        first?.focus();
      }, 0);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0a1a0e]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0a1a0e]/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="sr-only">ADND Groupe Saisonnier</span>
          <Image
            src="/logo-white.svg"
            alt="ADND"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Services (dropdown) */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Invisible hitbox for easier hover */}
            <div className="absolute -inset-2 z-10" />
            <button
              ref={triggerRef}
              aria-expanded={open}
              aria-controls={menuId}
              aria-haspopup="menu"
              className={cn(
                "group inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium",
                "text-neutral-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                "transition-colors duration-200"
              )}
              onClick={() => setOpen((v) => !v)}
              onKeyDown={onTriggerKeyDown}
            >
              Services
              <svg
                className={cn(
                  "h-4 w-4 transition-transform",
                  open && "rotate-180",
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Menu */}
            <div
              id={menuId}
              ref={menuRef}
              role="menu"
              aria-labelledby={menuId}
              className={cn(
                "absolute right-0 mt-2 w-[320px] rounded-xl border border-white/10 bg-[#0f2416] p-4 shadow-2xl outline-none",
                "transition-opacity duration-150",
                open
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0",
              )}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="space-y-2">
                {SECTION_ORDER.map((category) => {
                  const categoryServices = SERVICES.filter(s => s.category === category);
                  if (categoryServices.length === 0) return null;
                  
                  return (
                    <Link
                      key={category}
                      href={`/services/${category}`}
                      data-menuitem="true"
                      role="menuitem"
                      className={cn(
                        "block rounded-lg p-3 focus:outline-none",
                        "hover:bg-emerald-500/10 focus-visible:ring-2 focus-visible:ring-emerald-400",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">
                          {SECTION_LABELS[category]}
                        </p>
                        <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="mt-1 text-xs text-neutral-400">
                        {categoryServices.length} service{categoryServices.length > 1 ? 's' : ''}
                      </p>
                    </Link>
                  );
                })}
                <div className="mt-4 border-t border-white/10 pt-3">
                  <Link
                    href="/services"
                    className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-neutral-300 hover:bg-white/5 hover:text-white"
                  >
                    Voir tous les services →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <NavLink href="/projets" label="Projets" />
          <NavLink href="/equipe" label="Équipe" />
          <NavLink href="/temoignages" label="Témoignages" />

          <Link
            href="/soumission"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Soumission
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:hidden"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          "md:hidden transition-[max-height,opacity] overflow-hidden",
          mobileOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-2 border-t border-white/10 px-4 pb-6 pt-3">
          {/* Services - 4 main categories only */}
          <p className="px-2 text-xs font-medium uppercase tracking-wide text-neutral-400">
            Services
          </p>
          <ul className="space-y-1">
            {SECTION_ORDER.map((category) => {
              const categoryServices = SERVICES.filter(s => s.category === category);
              if (categoryServices.length === 0) return null;
              
              return (
                <li key={category}>
                  <Link
                    href={`/services/${category}`}
                    className="block rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-white/5 hover:text-white"
                  >
                    <div className="flex items-center justify-between">
                      <span>{SECTION_LABELS[category]}</span>
                      <span className="text-xs text-neutral-500">
                        {categoryServices.length}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/services"
                className="block rounded-lg px-3 py-2 text-sm text-neutral-200 hover:bg-white/5 hover:text-white"
              >
                Voir tous les services →
              </Link>
            </li>
          </ul>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href="/projets"
              className="rounded-lg bg-white/5 px-3 py-2 text-center text-sm text-neutral-100 hover:bg-white/10"
            >
              Projets
            </Link>
            <Link
              href="/equipe"
              className="rounded-lg bg-white/5 px-3 py-2 text-center text-sm text-neutral-100 hover:bg-white/10"
            >
              Équipe
            </Link>
            <Link
              href="/temoignages"
              className="rounded-lg bg-white/5 px-3 py-2 text-center text-sm text-neutral-100 hover:bg-white/10"
            >
              Témoignages
            </Link>
            <Link
              href="/soumission"
              className="rounded-lg bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-emerald-950 hover:bg-emerald-400"
            >
              Soumission
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-2 py-1.5 text-sm font-medium text-neutral-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        active && "text-white",
      )}
    >
      {label}
    </Link>
  );
}
