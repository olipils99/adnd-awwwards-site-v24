// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { SmoothScrollProvider } from "./providers";
import dynamic from "next/dynamic";

import ScrollToTopOnRouteChange from "../components/ScrollToTopOnRouteChange";
import WipeCSS from "../components/WipeCSS"; // ⬅️ use CSS wipe

const QuickDock = dynamic(() => import("../components/QuickDock"), {
  ssr: false,
});

export const metadata: Metadata = {
  /* … your metadata … */
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className="min-h-screen antialiased gradient-radial">
        <WipeCSS /> {/* green wipe (CSS-only) */}
        <ScrollToTopOnRouteChange />
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
        <QuickDock />
      </body>
    </html>
  );
}
