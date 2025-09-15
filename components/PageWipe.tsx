"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";

export default function PageWipe() {
  const pathname = usePathname();
  const controls = useAnimationControls();

  const firstLoad = useRef(true);
  const playingRef = useRef(false);
  const [show, setShow] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  // Create a portal container under <body>
  useEffect(() => {
    const id = "__page-wipe__";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    }
    setPortalEl(el);
    return () => {
      // keep it for reuse between navigations
    };
  }, []);

  const play = useCallback(async () => {
    if (playingRef.current) return;
    playingRef.current = true;
    setShow(true);

    // cover: left → right
    await controls.start({
      transformOrigin: "left",
      scaleX: 1,
      transition: { duration: 0.26, ease: "easeInOut" },
    });

    // reveal: right → left
    await controls.start({
      transformOrigin: "right",
      scaleX: 0,
      transition: { duration: 0.26, ease: "easeInOut" },
    });

    setShow(false);
    playingRef.current = false;
  }, [controls]);

  // Route changes (/a → /b)
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    play();
  }, [pathname, play]);

  // Anchor clicks (#services) — even if SmoothScroll prevents hashchange
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const a = target.closest("a");
      if (!a) return;

      const href = a.getAttribute("href") || "";
      // same-page anchors ( "#x" or "/current#x" )
      const isAnchor =
        href.startsWith("#") ||
        (a instanceof HTMLAnchorElement &&
          a.origin === location.origin &&
          a.pathname === location.pathname &&
          a.hash.length > 0);

      if (isAnchor) {
        // fire immediately so the wipe covers the scroll
        play();
      }
    };
    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [play]);

  // Optional manual trigger: window.dispatchEvent(new CustomEvent('play-wipe'))
  useEffect(() => {
    const handler = () => play();
    window.addEventListener("play-wipe", handler as any);
    return () => window.removeEventListener("play-wipe", handler as any);
  }, [play]);

  if (!portalEl || !show) return null;

  return createPortal(
    <motion.div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      initial={{ scaleX: 0, transformOrigin: "left" }}
      animate={controls}
      // Highest possible stacking, avoids any z-index/transform issues
      style={{
        zIndex: 2147483647,
        background:
          "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(5,150,105,1) 100%)",
        willChange: "transform",
      }}
    />,
    portalEl,
  );
}
