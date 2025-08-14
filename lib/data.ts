export type Service = {
  slug: string;
  title: string;
  chips: string[];
  excerpt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "tonte",
    title: "Tonte de pelouse",
    chips: ["Hebdomadaire", "Bordures", "Ramassage"],
    excerpt: "Détendez-vous, on s'occupe de la tonte de votre pelouse.",
  },
  {
    slug: "plates-bandes",
    title: "Contrôles",
    chips: ["Mauvaises herbes", "Insectes"],
    excerpt:
      "Fini le désherbage. Confiez-nous l'entretien de vos plates-bandes.",
  },
  {
    slug: "ouverture-de-terrain",
    title: "Ouverture de terrain",
    chips: ["Printemps", "Râtissage"],
    excerpt:
      "Service complet d'ouverture et de fermeture de terrain. Profitez de votre temps, on s'occupe de tout.",
  },
  {
    slug: "fermeture-de-terrain",
    title: "Fermeture de terrain",
    chips: ["Hivernisation"],
    excerpt:
      "Service complet d'ouverture et de fermeture de terrain. Profitez de votre temps, on s'occupe de tout.",
  },
  {
    slug: "taillage-de-haie",
    title: "Taillage de haie",
    chips: ["Finition propre", "Cèdres"],
    excerpt:
      "Laissez-nous prendre soin de vos haies. Profitez de votre jardin en toute tranquillité, en sachant qu'ils sont entre de bonnes mains.",
  },
];

export type Project = {
  slug: string;
  title: string;
  img: string;
  summary: string;
  video?: string; // optional mp4 path
  poster?: string; // optional poster image
};

export const PROJECTS: Project[] = [
  {
    slug: "plateau_de_la_gare",
    title: "Plateau de la Gare - Mirabel",
    img: "/images/GARE_1.jpg",
    summary: "Espace d'habitation chaleureuse, moderne.",
    video: "/media/hero.mp4",
    poster: "/images/GARE_1.jpg",
  },
  {
    slug: "maison_de_ville",
    title: "Maison de ville - Mascouche",
    img: "/images/MAISON.JPEG",
    summary: "Jardinage propre, gazon parfait pour les enfants actifs.",
  },
  {
    slug: "appartement",
    title: "Appartement - Terrebonne",
    img: "/images/APPARTEMENT.JPG",
    summary: "Appartement avec extérieur convivial.",
  },
  {
    slug: "patio-cuisine-rosemère",
    title: "Cours extérieur avec paillis - Terrebonne",
    img: "/images/COURS.JPG",
    summary: "Espace extérieur complet pour recevoir la famille.",
  },
];
