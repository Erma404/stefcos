import { useState } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Boutique = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filtered = activeCategory === "Tous" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Collection Complète
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">Notre Boutique</h1>
        </div>

        <div className="flex justify-center gap-6 mb-14 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-xs tracking-widest uppercase pb-1 transition-all ${
                activeCategory === cat
                  ? "text-foreground border-b-2 border-accent font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Boutique;
