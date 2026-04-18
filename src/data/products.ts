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
    description: "Notre lait phare, formulé aux acides de fruits AHA pour accélérer le renouvellement cellulaire et unifier le teint en profondeur. Il estompe progressivement les taches brunes, les inégalités et l'hyperpigmentation post-inflammatoire. Texture fondante, absorption rapide, sans effet collant. Résultats visibles dès 72 heures. Idéal pour les peaux noires et métissées. Appliquer matin et soir sur peau propre et sèche.",
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
    description: "Lotion corporelle luxuriante enrichie à l'huile de carotte et au bêta-carotène — puissants antioxydants qui illuminent et protègent la peau des agressions quotidiennes. Sa formule nourrissante hydrate intensément, raffermit et confère à la peau un éclat doré naturel. Idéale pour les peaux ternes, sèches ou manquant de luminosité. Appliquer généreusement après la douche sur peau encore légèrement humide pour maximiser l'absorption.",
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
    description: "Traitement ciblé concentré en actifs naturels de haute efficacité pour corriger taches brunes, hyperpigmentation et marques post-acné. Sa formule spray innovante permet une application précise et une pénétration optimale dans les couches profondes de l'épiderme. Inhibe la production de mélanine en excès, régénère et uniformise le teint durablement. Résultats visibles en 2 à 4 semaines. À utiliser en cure intensive matin et soir sur les zones à traiter.",
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
    description: "Lait éclaircissant enrichi à l'huile d'avocat, reconnue pour ses propriétés nourrissantes et régénérantes exceptionnelles. Sa formule douce estompe les taches, harmonise le teint et laisse la peau incroyablement souple. Convient aux peaux sensibles et réactives. Sans agressivité, il s'intègre à la routine quotidienne matin et soir. Résultats progressifs sur 3 à 4 semaines pour un teint naturellement unifié.",
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
    description: "Savon gommant à double action : il élimine en douceur les cellules mortes accumulées et clarifie le teint en profondeur. Ses micro-grains naturels désincrustent les pores, lissent la peau et favorisent le renouvellement cellulaire. Prépare la peau à mieux absorber les soins hydratants ou éclaircissants appliqués après. Usage visage & corps. À utiliser 2 à 3 fois par semaine sur peau humide.",
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
    description: "Le complément incontournable du Lait 72 Heures. Formulé aux acides de fruits AHA et à l'extrait de Végéwhite — actif végétal cliniquement prouvé pour unifier le teint — ce savon clarifiant agit dès le lavage pour exfolier doucement et stimuler le renouvellement cellulaire. Usage visage & corps. En association avec le Lait 72 Heures, il optimise l'action éclaircissante pour un résultat visible en 72 heures.",
  },
  {
    id: "glycederm",
    name: "Glycederm",
    subtitle: "Le Véritable Savon de Marseille",
    price: 2000,
    image: "/products/glycederm/2.jpeg",
    cardImage: "/products/glycederm/2.jpeg",
    gallery: ["/products/glycederm/2.jpeg", "/products/glycederm/3.jpeg", "/products/glycederm/1.jpeg", "/products/glycederm/4.jpeg"],
    category: "Savons",
    description: "Le véritable savon de Marseille enrichi en glycérine pure. Testé dermatologiquement, hypoallergénique, riche en glycérine. Nettoie en douceur, hydrate et respecte le microbiome cutané. Convient à tous types de peau.",
  },
  {
    id: "savon-glycederm-enfant",
    name: "Savon Glycederm Enfant",
    subtitle: "Savon Surgras au Beurre de Karité",
    price: 2000,
    image: "/products/savon-glycederm-enfant/2.png",
    cardImage: "/products/savon-glycederm-enfant/2.png",
    gallery: ["/products/savon-glycederm-enfant/2.png", "/products/savon-glycederm-enfant/4.png", "/products/savon-glycederm-enfant/1.png", "/products/savon-glycederm-enfant/3.png"],
    category: "Enfants",
    badge: "Nouveauté",
    description: "Savon surgras spécialement formulé pour les peaux délicates des enfants. Enrichi au beurre de karité, il nettoie tout en douceur, nourrit et protège la barrière cutanée. Sans agressivité, convient à tous types de peau dès le plus jeune âge.",
  },
  {
    id: "lait-glycederm-enfant",
    name: "Lait Glycederm Enfant",
    subtitle: "Lait Hydratant Corps & Visage",
    price: 2500,
    image: "/products/lait-glycederm-enfant/2.png",
    cardImage: "/products/lait-glycederm-enfant/2.png",
    gallery: ["/products/lait-glycederm-enfant/2.png", "/products/lait-glycederm-enfant/4.png", "/products/lait-glycederm-enfant/1.png", "/products/lait-glycederm-enfant/3.png"],
    category: "Enfants",
    description: "Lait hydratant douceur pour le corps et le visage des enfants. Enrichi en actifs nourrissants, il hydrate et apaise les peaux sensibles tout au long de la journée. Texture légère, absorption rapide, parfum délicat.",
  },
  {
    id: "dovena",
    name: "Dovena",
    subtitle: "Shampooing Nutritif à la Mangue",
    price: 3200,
    image: "/products/dovena/2.png",
    cardImage: "/products/dovena/2.png",
    gallery: ["/products/dovena/4.png", "/products/dovena/1.png", "/products/dovena/2.png", "/products/dovena/3.png"],
    category: "Soins Cheveux",
    badge: "Nouveau",
    description: "Shampooing nutritif enrichi au beurre de mangue et aux protéines végétales. Formule douce qui nettoie en profondeur tout en apportant une hydratation intense aux cheveux secs, crépus et frisés. Cheveux souples, brillants et démêlés dès le premier lavage.",
  },
];

export const categories = ["Tous", "Soins Corps", "Traitements", "Savons", "Soins Cheveux", "Enfants"];
