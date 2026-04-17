import { useState } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageSeo } from "@/hooks/usePageSeo";

const Boutique = () => {
  usePageSeo(
    "Boutique — Soins Cosmétiques Peaux Noires & Mixtes | STEFCOS Togo",
    "Découvrez toute la gamme STEFCOS : Glycéderm, Lait 72 Heures, Gommage, Savon naturel. Livraison à Lomé et partout au Togo."
  );
  const [activeCategory, setActiveCategory] = useState("Tous");
  const revealRef = useScrollReveal();

  const filtered = activeCategory === "Tous" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24" ref={revealRef}>
        <div className="text-center mb-14" data-reveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Collection Complète
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">Notre Boutique</h1>
        </div>

        <div className="flex justify-center gap-6 mb-14 flex-wrap" data-reveal data-reveal-delay="100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-xs tracking-widest uppercase pb-1 transition-all duration-300 hover:text-foreground ${
                activeCategory === cat
                  ? "text-foreground border-b-2 border-accent font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product, i) => (
            <div key={product.id} data-reveal data-reveal-delay={i * 80}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Boutique;
