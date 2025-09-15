"use client";

import { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Temporarily disable Lenis to fix webpack error
    // TODO: Re-enable Lenis once webpack issue is resolved
    /*
    let lenis: any;
    
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy?.();
      }
    };
    */
  }, []);

  return <>{children}</>;
}
