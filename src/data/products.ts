import product72heures from "@/assets/product-72heures.jpg";
import productSublimEclat from "@/assets/product-sublim-eclat.jpg";
import productBioActiv from "@/assets/product-bio-activ.jpg";
import productSidoClair from "@/assets/product-sido-clair.jpg";
import productVeryWhite from "@/assets/product-very-white.jpg";
import productSavon from "@/assets/product-savon.jpg";
import productBovena from "@/assets/product-bovena.jpg";
import productGlycederm from "@/assets/product-glycederm.jpg";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
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
    image: product72heures,
    category: "Soins Corps",
    badge: "Bestseller",
    description: "Lait de beauté éclaircissant aux acides de fruits pour un teint lumineux et uniforme.",
  },
  {
    id: "sublim-eclat",
    name: "Sublim Éclat",
    subtitle: "Lotion à l'Huile de Carotte",
    price: 3800,
    image: productSublimEclat,
    category: "Soins Corps",
    description: "Lotion corporelle enrichie à l'huile de carotte pour une peau éclatante et nourrie.",
  },
  {
    id: "bio-activ",
    name: "Bio Activ",
    subtitle: "Traitement Anti-taches",
    price: 5200,
    image: productBioActiv,
    category: "Traitements",
    badge: "Nouveau",
    description: "Spray traitant concentré en actifs naturels pour corriger les imperfections cutanées.",
  },
  {
    id: "sido-clair",
    name: "Sido Clair",
    subtitle: "Lait Éclaircissant à l'Avocat",
    price: 4200,
    image: productSidoClair,
    category: "Soins Corps",
    description: "Lait éclaircissant doux à l'avocat pour une peau douce et un teint harmonieux.",
  },
  {
    id: "very-white",
    name: "Very White Prestige",
    subtitle: "Soin à la Grenade",
    price: 5800,
    image: productVeryWhite,
    category: "Traitements",
    badge: "Premium",
    description: "Soin prestige à l'extrait de grenade pour une peau radieuse et protégée.",
  },
  {
    id: "savon-gommant",
    name: "Savon Gommant",
    subtitle: "Exfoliant & Clarifiant",
    price: 1500,
    image: productSavon,
    category: "Savons",
    description: "Savon gommant exfoliant pour éliminer les cellules mortes et révéler l'éclat naturel.",
  },
  {
    id: "bovena",
    name: "Bovena",
    subtitle: "Spray Soin Cutané",
    price: 3500,
    image: productBovena,
    category: "Traitements",
    description: "Spray traitant multifonction pour le soin quotidien de la peau.",
  },
  {
    id: "glycederm",
    name: "Glycederm",
    subtitle: "Savon Glycériné",
    price: 2000,
    image: productGlycederm,
    category: "Savons",
    description: "Savon à la glycérine pure pour un nettoyage doux et une hydratation optimale.",
  },
];

export const categories = ["Tous", "Soins Corps", "Traitements", "Savons"];
