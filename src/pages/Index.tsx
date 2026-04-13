import { Link } from "react-router-dom";
import { ArrowRight, Truck, Award, Headphones, Gift } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroBanner from "@/assets/hero-banner.jpg";
import philosophyImg from "@/assets/philosophy.jpg";

const Index = () => {
  const bestsellers = products.filter((p) => p.badge === "Bestseller" || p.badge === "Premium").slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === "Nouveau").concat(products.slice(0, 3));

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img
          src={heroBanner}
          alt="STEFCOS - Beauté naturelle"
          className="absolute inset-0 w-full h-full object-cover"
          width={1024}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="relative container mx-auto px-6 lg:px-12 h-full flex items-center">
          <div className="max-w-xl animate-fade-up">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary-foreground/80 mb-4">
              STEFCOS TOGO
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.1] text-primary-foreground mb-6">
              Éclat
              <br />
              <span className="italic font-light">Naturel</span>
            </h1>
            <p className="font-sans text-sm md:text-base leading-relaxed text-primary-foreground/80 mb-8 max-w-md">
              Des soins cosmétiques d'exception, formulés pour sublimer la beauté des peaux noires et mixtes.
            </p>
            <Link
              to="/boutique"
              className="inline-flex items-center gap-3 bg-accent text-accent-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-accent/90 transition-colors"
            >
              Découvrir
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-primary py-4 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-serif text-sm tracking-widest text-primary-foreground/40 mx-8">
              BEAUTÉ NATURELLE • QUALITÉ PREMIUM • PEAUX NOIRES & MIXTES • FABRIQUÉ AU TOGO •
            </span>
          ))}
        </div>
      </div>

      {/* Bestsellers */}
      <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Les Incontournables
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light">Nos Bestsellers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/boutique"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
          >
            Voir toute la collection
            <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-secondary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 items-center gap-12 py-20 md:py-0">
            <div className="md:py-28">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Notre Philosophie
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight mb-6">
                La Beauté Qui
                <br />
                <span className="italic">Vient de l'Intérieur</span>
              </h2>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-8 max-w-md">
                Chez STEFCOS, nous croyons que chaque peau mérite des soins d'exception. Nos formules allient expertise scientifique et richesse des ingrédients naturels africains.
              </p>
              <Link
                to="/philosophie"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-primary/90 transition-colors"
              >
                En savoir plus
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="relative h-[500px] md:h-[600px]">
              <img
                src={philosophyImg}
                alt="Notre philosophie"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Explorer
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light">Par Catégorie</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Soins Corps", count: 4, img: products[0].image },
            { name: "Traitements", count: 3, img: products[2].image },
            { name: "Savons", count: 2, img: products[5].image },
          ].map((cat) => (
            <Link
              key={cat.name}
              to="/boutique"
              className="group relative aspect-[3/4] overflow-hidden bg-secondary"
            >
              <img
                src={cat.img}
                alt={cat.name}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-serif text-2xl text-primary-foreground mb-1">{cat.name}</h3>
                <p className="font-sans text-xs text-primary-foreground/70">{cat.count} produits</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-cream">
        <div className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="text-center mb-14">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Dernières Nouveautés
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Nouveautés</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Livraison Rapide", desc: "Partout au Togo" },
            { icon: Award, title: "Qualité Premium", desc: "Ingrédients sélectionnés" },
            { icon: Headphones, title: "Support 24/7", desc: "À votre écoute" },
            { icon: Gift, title: "Offres Exclusives", desc: "Réductions régulières" },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <item.icon size={28} className="mx-auto mb-3 text-accent" />
              <h4 className="font-sans text-sm font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="font-sans text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
