import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { SmoothScrollProvider } from "./providers";
import dynamic from "next/dynamic";
const QuickDock = dynamic(() => import("../components/QuickDock"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "ADND Paysagement — Aménagement paysager",
  description:
    "ADND conçoit et entretient des aménagements paysagers durables et chaleureux pour familles et entreprises au Québec.",
  openGraph: {
    title: "ADND Paysage",
    description:
      "Aménagement paysager haut de gamme • Conception, réalisation, entretien",
    url: "https://adnd.example",
    siteName: "ADND Paysage",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "fr_CA",
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased gradient-radial">
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
        <QuickDock />
      </body>
    </html>
  );
}

