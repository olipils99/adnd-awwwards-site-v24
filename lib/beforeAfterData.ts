// lib/beforeAfterData.ts
export interface BeforeAfterImage {
  before: string;
  after: string;
  title?: string;
  description?: string;
}

export const BEFORE_AFTER_IMAGES: BeforeAfterImage[] = [
  {
    before: "/services/avant-apres/IMG_0488.jpg",
    after: "/services/avant-apres/IMG_0487.jpg",
    title: "Transformation de pelouse",
    description: "Rénovation complète d'une pelouse dégradée avec préparation du sol et ensemencement professionnel"
  },
  {
    before: "/services/avant-apres/IMG_6984.JPG",
    after: "/services/avant-apres/IMG_6983.JPG",
    title: "Aménagement paysager",
    description: "Création d'un espace vert moderne avec plantation d'arbustes et installation de paillis"
  },
  {
    before: "/services/avant-apres/IMG_9468.jpg",
    after: "/services/avant-apres/IMG_9453.jpg",
    title: "Entretien de plates-bandes",
    description: "Nettoyage et réorganisation complète des massifs floraux pour un rendu professionnel"
  },
  {
    before: "/services/avant-apres/IMG_9471.jpg",
    after: "/services/avant-apres/IMG_9470.jpg",
    title: "Rénovation d'espace vert",
    description: "Transformation d'un terrain négligé en espace vert soigné et entretenu"
  }
];