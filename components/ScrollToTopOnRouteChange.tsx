"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  useEffect(() => {
    const t = setTimeout(
      () => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }),
      0,
    );
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}
