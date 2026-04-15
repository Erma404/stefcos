import testimonial1 from "@/assets/testimonial-1.jpeg";
import testimonial2 from "@/assets/testimonial-2.jpeg";
import testimonial3 from "@/assets/testimonial-3.jpeg";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  text: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ama K.",
    location: "Lomé, Togo",
    product: "72 Heures",
    rating: 5,
    text: "Après 3 semaines d'utilisation, ma peau est devenue incroyablement douce et lumineuse. Le teint est uniforme, les taches ont nettement diminué. Je recommande à 100% !",
    image: testimonial1,
  },
  {
    id: "2",
    name: "Adjoa M.",
    location: "Accra, Ghana",
    product: "Sublim Éclat",
    rating: 5,
    text: "J'ai essayé beaucoup de produits avant STEFCOS. La lotion à l'huile de carotte a transformé ma peau en un mois. Mon entourage me demande mon secret !",
    image: testimonial2,
  },
  {
    id: "3",
    name: "Fatou D.",
    location: "Cotonou, Bénin",
    product: "Very White Prestige",
    rating: 5,
    text: "Le soin à la grenade est un vrai bijou. Ma peau est radieuse et protégée. Le rapport qualité-prix est excellent pour un produit aussi premium.",
    image: testimonial3,
  },
];
