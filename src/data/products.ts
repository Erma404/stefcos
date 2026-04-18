export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  cardImage?: string;
  gallery?: string[];
  category: string;
  badge?: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "72heures",
    name: "72 Heures",
    subtitle: "Lait Éclaircissant",
    price: 4500,
    image: "/products/lait-72h/2.png",
    cardImage: "/products/lait-72h/3.png",
    gallery: ["/products/lait-72h/2.png", "/products/lait-72h/1.png", "/products/lait-72h/3.png", "/products/lait-72h/4.png"],
    category: "Soins Corps",
    badge: "Bestseller",
    description: "Lait de beauté éclaircissant aux acides de fruits pour un teint lumineux et uniforme.",
  },
  {
    id: "sublim-eclat",
    name: "Sublim Éclat",
    subtitle: "Lotion à l'Huile de Carotte",
    price: 3800,
    image: "/products/sublim-eclat/1.png",
    cardImage: "/products/sublim-eclat/3.png",
    gallery: ["/products/sublim-eclat/1.png", "/products/sublim-eclat/2.png", "/products/sublim-eclat/3.png", "/products/sublim-eclat/4.png"],
    category: "Soins Corps",
    description: "Lotion corporelle enrichie à l'huile de carotte pour une peau éclatante et nourrie.",
  },
  {
    id: "bio-activ",
    name: "Bio Activ",
    subtitle: "Traitement Anti-taches",
    price: 5200,
    image: "/products/bio-activ/1.png",
    cardImage: "/products/bio-activ/4.png",
    gallery: ["/products/bio-activ/1.png", "/products/bio-activ/2.png", "/products/bio-activ/3.png", "/products/bio-activ/4.png"],
    category: "Traitements",
    badge: "Nouveau",
    description: "Spray traitant concentré en actifs naturels pour corriger les imperfections cutanées.",
  },
  {
    id: "sido-clair",
    name: "Sido Clair",
    subtitle: "Lait Éclaircissant à l'Avocat",
    price: 4200,
    image: "/products/sido-clair/3.png",
    cardImage: "/products/sido-clair/1.png",
    gallery: ["/products/sido-clair/3.png", "/products/sido-clair/1.png", "/products/sido-clair/2.png", "/products/sido-clair/4.png"],
    category: "Soins Corps",
    description: "Lait éclaircissant doux à l'avocat pour une peau douce et un teint harmonieux.",
  },
  {
    id: "savon-gommant",
    name: "Savon Gommant",
    subtitle: "Exfoliant & Clarifiant",
    price: 1500,
    image: "/products/gommage-72h/2.png",
    cardImage: "/products/gommage-72h/3.png",
    gallery: ["/products/gommage-72h/2.png", "/products/gommage-72h/1.png", "/products/gommage-72h/3.png", "/products/gommage-72h/4.png"],
    category: "Savons",
    description: "Savon gommant exfoliant pour éliminer les cellules mortes et révéler l'éclat naturel.",
  },
  {
    id: "savon-eclaircissant-72h",
    name: "Savon Éclaircissant 72H",
    subtitle: "Savon AHA Au Végéwhite",
    price: 1500,
    image: "/products/savon-72h/2.png",
    cardImage: "/products/savon-72h/4.png",
    gallery: ["/products/savon-72h/2.png", "/products/savon-72h/1.png", "/products/savon-72h/3.png", "/products/savon-72h/4.png"],
    category: "Savons",
    badge: "Bestseller",
    description: "Savon éclaircissant aux acides de fruits AHA et extrait de Végéwhite. Usage visage & corps pour un teint unifié en 72 heures.",
  },
  {
    id: "glycederm",
    name: "Glycederm",
    subtitle: "Savon Glycériné",
    price: 2000,
    image: "/products/glycederm/1.png",
    cardImage: "/products/glycederm/3.png",
    gallery: ["/products/glycederm/1.png", "/products/glycederm/2.png", "/products/glycederm/3.png"],
    category: "Savons",
    description: "Savon à la glycérine pure pour un nettoyage doux et une hydratation optimale.",
  },
  {
    id: "glycederm-kid",
    name: "Glycederm Enfant",
    subtitle: "Gamme Douceur pour Enfants",
    price: 2500,
    image: "/products/glycederm-kid/1.png",
    cardImage: "/products/glycederm-kid/4.png",
    gallery: ["/products/glycederm-kid/1.png", "/products/glycederm-kid/2.png", "/products/glycederm-kid/3.png", "/products/glycederm-kid/4.png"],
    category: "Enfants",
    badge: "Nouveauté",
    description: "Gamme spécialement formulée pour les peaux délicates des enfants. Douceur et hydratation sans compromis.",
  },
  {
    id: "dovena",
    name: "Dovena",
    subtitle: "Shampooing Nutritif à la Mangue",
    price: 3200,
    image: "/products/dovena/4.png",
    cardImage: "/products/dovena/2.png",
    gallery: ["/products/dovena/4.png", "/products/dovena/1.png", "/products/dovena/2.png", "/products/dovena/3.png"],
    category: "Soins Cheveux",
    badge: "Nouveau",
    description: "Shampooing nutritif enrichi au beurre de mangue et aux protéines végétales. Formule douce qui nettoie en profondeur tout en apportant une hydratation intense aux cheveux secs, crépus et frisés. Cheveux souples, brillants et démêlés dès le premier lavage.",
  },
];

export const categories = ["Tous", "Soins Corps", "Traitements", "Savons", "Soins Cheveux", "Enfants"];
