// lib/data.ts
// ------------------------------------------------------------
// Types & helpers communs aux pages et composants Services
// ------------------------------------------------------------

import { PROJECTS_UPDATED } from './projects-updated';

export type Project = {
  slug: string;
  title: string;
  img: string; // main image path under /public
  summary: string;
  description?: string;
  video?: string; // optional mp4 under /public
  poster?: string; // optional poster for the mp4
  gallery?: string[]; // all images for the project gallery
  details?: {
    budget?: string;
    duration?: string;
    materials?: string[];
    location?: string;
    year?: string;
  };
};

export const PROJECTS: Project[] = PROJECTS_UPDATED;

export type Category =
  | "entretien"
  | "fertilisation"
  | "amenagement"
  | "deneigement";

export type Service = {
  category: Category;
  slug: string;
  title: string;
  chips?: string[];
  excerpt?: string;

  // Détails pour la page
  cover?: string; // image hero
  gallery?: string[]; // images secondaires
  includes?: string[]; // Ce que ça inclut
  steps?: string[]; // Étapes d'intervention
  details?: string; // Paragraphe libre
  duration?: string; // Durée typique
  pricingNote?: string; // "à partir de...", "sur estimation", etc.
  zones?: string[]; // Territoires desservis
};

// Labels & ordre des sections (pour la liste et le méga-menu)
export const SECTION_LABELS: Record<Category, string> = {
  entretien: "Entretien paysager",
  fertilisation: "Fertilisation",
  amenagement: "Aménagement paysager",
  deneigement: "Déneigement",
};

export const SECTION_ORDER: Category[] = [
  "entretien",
  "fertilisation",
  "amenagement",
  "deneigement",
];

// Territoires (réutilisés)
const ZONES_DEFAULT = [
  "Terrebonne",
  "Mascouche",
  "Lachenaie",
  "Repentigny",
  "Blainville",
  "Laval",
];

// ------------------------------------------------------------
// SERVICES — REMPLIS avec du contenu prêt-à-l'emploi
// Les images référencées sont à placer dans /public/services/<slug>/
// (cover.jpg, 1.jpg, 2.jpg, etc.). Si absentes: la page charge quand même.
// ------------------------------------------------------------
export const SERVICES: Service[] = [
  // -----------------
  // ENTRET IEN
  // -----------------
  {
    category: "entretien",
    slug: "tonte-de-pelouse",
    title: "Tonte de pelouse",
    chips: ["Hebdomadaire", "Bordures", "Ramassage"],
    excerpt:
      "On tond proprement, on fait les bordures et on laisse tout nickel.",
    cover: "/services/tonte-de-pelouse/cover.jpg",
    gallery: [
      "/services/tonte-de-pelouse/1.jpg",
      "/services/tonte-de-pelouse/2.jpg",
      "/services/tonte-de-pelouse/3.jpg",
    ],
    includes: [
      "Tonte uniforme à hauteur adaptée",
      "Finitions des bordures et obstacles",
      "Soufflage des allées et trottoirs",
      "Ramassage ou mulching selon la saison",
    ],
    steps: ["Arrivée & repérage", "Tonte + finitions", "Soufflage & photos"],
    duration: "30–60 min selon la surface",
    pricingNote: "Forfait saisonnier ou prix à la visite",
    zones: ZONES_DEFAULT,
  },
  {
    category: "entretien",
    slug: "plates-bandes",
    title: "Entretien des plates-bandes",
    chips: ["Mauvaises herbes", "Paillis"],
    excerpt:
      "On désherbe, on égalise le paillis et on redonne des contours propres.",
    cover: "/services/plates-bandes/cover.jpg",
    gallery: ["/services/plates-bandes/1.jpg", "/services/plates-bandes/2.jpg"],
    includes: [
      "Désherbage manuel et sélectif",
      "Ajout/égalisation du paillis",
      "Bordures nettes",
      "Nettoyage final du secteur",
    ],
    steps: ["Inspection", "Désherbage/paillis", "Nettoyage"],
    duration: "2–4 h selon l'ampleur",
    pricingNote: "Sur estimation",
    details:
      "Idéal au printemps et à la mi-saison pour garder les massifs propres et sains.",
    zones: ZONES_DEFAULT,
  },
  {
    category: "entretien",
    slug: "ouverture-de-terrain",
    title: "Ouverture de terrain",
    chips: ["Printemps", "Ratissage"],
    excerpt:
      "Grand ménage de printemps : ratissage, collecte des débris, préparation.",
    cover: "/services/ouverture-de-terrain/cover.jpg",
    gallery: [
      "/services/ouverture-de-terrain/1.jpg",
      "/services/ouverture-de-terrain/2.jpg",
    ],
    includes: [
      "Ratissage complet des surfaces",
      "Ramassage et évacuation des débris",
      "Première coupe (en option)",
    ],
    steps: ["Inspection", "Ratissage & collecte", "Relevé des besoins"],
    duration: "½ à 1 journée",
    pricingNote: "Sur estimation",
    zones: ZONES_DEFAULT,
  },
  {
    category: "entretien",
    slug: "fermeture-de-terrain",
    title: "Fermeture de terrain",
    chips: ["Hivernisation"],
    excerpt:
      "On prépare le terrain pour l'hiver et on protège ce qui doit l'être.",
    cover: "/services/fermeture-de-terrain/cover.jpg",
    gallery: [
      "/services/fermeture-de-terrain/1.jpg",
      "/services/fermeture-de-terrain/2.jpg",
    ],
    includes: [
      "Dernière tonte haute",
      "Ramassage feuilles & débris",
      "Protection d'arbustes (option)",
    ],
    steps: ["Nettoyage", "Protection", "Rapport & conseils"],
    duration: "½ journée",
    pricingNote: "Sur estimation",
    zones: ZONES_DEFAULT,
  },
  {
    category: "entretien",
    slug: "taille-de-haie",
    title: "Taille de haie",
    chips: ["Cèdres", "Finition propre"],
    excerpt: "Coupe droite, régulière et sans dégâts sur vos plantations.",
    cover: "/services/taille-de-haie/cover.jpg",
    gallery: [
      "/services/taille-de-haie/1.jpg",
      "/services/taille-de-haie/2.jpg",
      "/services/taille-de-haie/3.jpg",
    ],
    includes: [
      "Taille faces + sommet au cordeau",
      "Collecte et évacuation des branches (option)",
      "Soufflage et nettoyage du site",
    ],
    steps: ["Préparation & mise à niveau", "Taille", "Nettoyage"],
    duration: "Selon longueur/hauteur",
    pricingNote: "Prix au mètre linéaire",
    zones: ZONES_DEFAULT,
  },

  // -----------------
  // FERTILISATION (forfaits informatifs)
  // -----------------
  {
    category: "fertilisation",
    slug: "fertilisation-essentiel",
    title: "Fertilisation — Essentiel",
    chips: ["2 visites", "Mauvaises herbes légères"],
    excerpt:
      "Programme simple pour verdir rapidement et maintenir une pelouse saine.",
    cover: "/services/fertilisation-essentiel/cover.jpg",
    includes: [
      "2 applications d'engrais équilibrés",
      "Contrôle ciblé des mauvaises herbes",
      "Conseils d'arrosage & tonte",
    ],
    steps: ["Visite 1 (printemps)", "Visite 2 (été)"],
    duration: "10–20 min/visite selon la surface",
    pricingNote: "Forfait indicatif — sur devis après évaluation",
    zones: ZONES_DEFAULT,
  },
  {
    category: "fertilisation",
    slug: "fertilisation-plus",
    title: "Fertilisation — Plus",
    chips: ["3 visites", "Renforcement"],
    excerpt:
      "Un suivi plus serré pour une pelouse dense, verte et mieux résistante.",
    cover: "/services/fertilisation-plus/cover.jpg",
    includes: [
      "3 applications d'engrais (printemps / été / fin d'été)",
      "Traitement plus complet des mauvaises herbes",
      "Recommandations d'entretien personnalisées",
    ],
    steps: ["V1 (printemps)", "V2 (été)", "V3 (fin d'été)"],
    duration: "10–20 min/visite selon la surface",
    pricingNote: "Forfait indicatif — sur devis après évaluation",
    zones: ZONES_DEFAULT,
  },
  {
    category: "fertilisation",
    slug: "fertilisation-premium",
    title: "Fertilisation — Premium",
    chips: ["4 visites", "Densité & couleur"],
    excerpt:
      "Le plan le plus complet pour une pelouse haut de gamme toute la saison.",
    cover: "/services/fertilisation-premium/cover.jpg",
    includes: [
      "4 applications séquencées",
      "Contrôle avancé des mauvaises herbes",
      "Ajustements selon météo et état du sol",
    ],
    steps: ["V1 (printemps)", "V2 (début été)", "V3 (fin été)", "V4 (automne)"],
    duration: "10–20 min/visite selon la surface",
    pricingNote: "Forfait indicatif — sur devis après évaluation",
    zones: ZONES_DEFAULT,
  },

  // -----------------
  // AMÉNAGEMENT
  // -----------------
  {
    category: "amenagement",
    slug: "pave-uni",
    title: "Pavé uni",
    chips: ["Entrées", "Terrasses", "Allées"],
    excerpt:
      "Conception & pose de pavé uni durable : esthétique, drainage et stabilité.",
    cover: "/services/pave-uni/cover.jpg",
    gallery: ["/services/pave-uni/1.jpg", "/services/pave-uni/2.jpg"],
    includes: [
      "Préparation du sol et excavation",
      "Fondations compactées (MG-20/0)",
      "Pose du pavé, coupes & polymère",
    ],
    steps: ["Mesure & design", "Excavation & fondation", "Pose & finitions"],
    duration: "2–5 jours selon surface",
    pricingNote: "Sur estimation (plans 2D/3D en option)",
    zones: ZONES_DEFAULT,
  },
  {
    category: "amenagement",
    slug: "pose-de-tourbe",
    title: "Pose de tourbe",
    chips: ["Nivelage", "Sol vivant"],
    excerpt: "Préparation, nivelage, terre et tourbe fraîche posée serrée.",
    cover: "/services/pose-de-tourbe/cover.jpg",
    gallery: [
      "/services/pose-de-tourbe/1.jpg",
      "/services/pose-de-tourbe/2.jpg",
    ],
    includes: [
      "Nivelage et terre de qualité",
      "Pose serrée & roulée",
      "Première irrigation et conseils",
    ],
    steps: ["Préparation du sol", "Livraison & pose", "Arrosage & suivi"],
    duration: "1–2 jours pour une cour standard",
    pricingNote: "Sur estimation (selon surface & accès)",
    zones: ZONES_DEFAULT,
  },
  {
    category: "amenagement",
    slug: "amenagement-plates-bandes",
    title: "Aménagement de plates-bandes",
    chips: ["Design végétal", "Paillis", "Bordures"],
    excerpt:
      "Création ou refonte de massifs : palette végétale, paillis et bordures.",
    cover: "/services/amenagement-plates-bandes/cover.jpg",
    gallery: [
      "/services/amenagement-plates-bandes/1.jpg",
      "/services/amenagement-plates-bandes/2.jpg",
    ],
    includes: [
      "Conception (plantes adaptées & floraisons)",
      "Préparation du sol & plantation",
      "Paillis et finitions",
    ],
    steps: ["Design & approbation", "Préparation", "Plantation & paillis"],
    duration: "1–3 jours selon ampleur",
    pricingNote: "Sur estimation",
    zones: ZONES_DEFAULT,
  },
  {
    category: "amenagement",
    slug: "excavation",
    title: "Excavation",
    chips: ["Préparation de site", "Drainage"],
    excerpt:
      "Excavation de précision pour fondations paysagères, tranchées et nivelage.",
    cover: "/services/excavation/cover.jpg",
    gallery: ["/services/excavation/1.jpg"],
    includes: [
      "Traçage et protection des zones",
      "Excavation & disposition des sols",
      "Nivelage / compaction",
    ],
    steps: ["Repérage", "Excavation", "Nivelage & nettoyage"],
    duration: "Variable selon mandat",
    pricingNote: "Taux horaire & transport — sur estimation",
    zones: ZONES_DEFAULT,
  },

  // -----------------
  // DÉNEIGEMENT
  // -----------------
  {
    category: "deneigement",
    slug: "pelletage-trottoirs",
    title: "Pelletage des trottoirs",
    chips: ["À la tempête", "Saisonnier"],
    excerpt:
      "Pelletage manuel des trottoirs, accès et petits passages en toute sécurité.",
    cover: "/services/pelletage-trottoirs/cover.jpg",
    includes: [
      "Pelletage après chaque accumulation significative",
      "Déglaçage ponctuel (option)",
      "Photos de passage (option)",
    ],
    steps: [
      "Passage & pelletage",
      "Finition & sel (si choisi)",
      "Preuve de passage",
    ],
    duration: "Selon la chute de neige",
    pricingNote: "Forfait saisonnier — secteurs limités",
    zones: ZONES_DEFAULT,
  },
  {
    category: "deneigement",
    slug: "pelletage-escaliers",
    title: "Pelletage des escaliers",
    chips: ["Sécurité", "Sel"],
    excerpt: "On garde vos escaliers sécuritaires et praticables tout l'hiver.",
    cover: "/services/pelletage-escaliers/cover.jpg",
    includes: [
      "Pelletage marches & paliers",
      "Application de sel/abrasif (option)",
      "Gestion des accumulations",
    ],
    steps: ["Pelletage", "Finitions", "Abrasif (option)"],
    duration: "Selon configuration",
    pricingNote: "Forfait saisonnier — secteurs limités",
    zones: ZONES_DEFAULT,
  },
];

// ------------------------------------------------------------
// Helpers pratiques
// ------------------------------------------------------------
export const SERVICES_BY_CATEGORY: Record<Category, Service[]> =
  SECTION_ORDER.reduce(
    (acc, cat) => {
      acc[cat] = SERVICES.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<Category, Service[]>,
  );

export const servicePath = (s: Service) => `/services/${s.category}/${s.slug}`;
