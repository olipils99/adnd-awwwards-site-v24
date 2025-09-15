"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function WipeCSS() {
  const pathname = usePathname();

  // Ensure the overlay root exists once
  useEffect(() => {
    const id = "__wipe__";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    }
  }, []);

  // Helper: play the wipe
  function play() {
    const el = document.getElementById("__wipe__");
    if (!el) return;
    // re-trigger even if animation is mid-flight
    el.classList.remove("playing");
    // force reflow so the class re-applies cleanly
    // @ts-ignore
    void el.offsetWidth;
    el.classList.add("playing");
    // auto-remove after anim
    setTimeout(() => el.classList.remove("playing"), 600);
  }

  // 1) Route changes
  useEffect(() => {
    // skip very first load if you want; comment next line to play on first load too
    if (performance.getEntriesByType("navigation")[0]) {
      // small delay so new page paints under the wipe
      setTimeout(play, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 2) Anchor clicks (e.g., href="#services"), even if hashchange is intercepted
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const a = t?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const isSamePageAnchor =
        href.startsWith("#") ||
        (a instanceof HTMLAnchorElement &&
          a.origin === location.origin &&
          a.pathname === location.pathname &&
          a.hash.length > 0);
      if (isSamePageAnchor) play();
    };
    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  // 3) Manual trigger: window.dispatchEvent(new CustomEvent('play-wipe'))
  useEffect(() => {
    const handler = () => play();
    // @ts-ignore
    window.addEventListener("play-wipe", handler);
    // @ts-ignore
    return () => window.removeEventListener("play-wipe", handler);
  }, []);

  return null;
}
