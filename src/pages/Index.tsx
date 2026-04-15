import { Link } from "react-router-dom";
import { ArrowRight, Truck, Award, Headphones, Gift, Star, MessageCircle, CreditCard, Shield, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ArticleIllustration from "@/components/ArticleIllustration";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { testimonials } from "@/data/testimonials";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { buildWhatsAppGenericUrl, buildWhatsAppConseilUrl } from "@/lib/whatsapp";
import heroBanner from "@/assets/hero-banner.jpg";
import philosophyImg from "@/assets/philosophy.jpg";
import conseilsImg from "@/assets/conseils-stefcos.jpeg";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Index = () => {
  const revealRef = useScrollReveal();
  const bestsellers = products.filter((p) => p.badge === "Bestseller" || p.badge === "Premium").slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === "Nouveau" || p.badge === "Nouveauté").concat(products.slice(0, 2));
  const latestArticles = articles.slice(0, 3);

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
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/boutique"
                className="group inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-accent/90 hover:gap-5 transition-all duration-300"
              >
                Découvrir
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={buildWhatsAppGenericUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-[#1da851] transition-all duration-300"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Commander
              </a>
            </div>
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

      <div ref={revealRef}>
        {/* Reassurance Banner */}
        <section className="bg-[#25D366]/10 border-y border-[#25D366]/20">
          <div className="container mx-auto px-6 lg:px-12 py-5">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
              {[
                { icon: CreditCard, text: "Paiement à la livraison possible" },
                { icon: Phone, text: "Commandez facilement via WhatsApp" },
                { icon: Truck, text: "Livraison rapide partout au Togo" },
                { icon: Shield, text: "Mobile Money accepté" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon size={16} className="text-[#25D366] flex-shrink-0" />
                  <span className="font-sans text-xs font-medium text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="text-center mb-14" data-reveal>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Les Incontournables
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Nos Bestsellers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {bestsellers.map((product, i) => (
              <div key={product.id} data-reveal data-reveal-delay={i * 100}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12" data-reveal>
            <Link
              to="/boutique"
              className="group inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              Voir toute la collection
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Gamme Enfants Spotlight */}
        <section className="bg-[#fdf6ee]">
          <div className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative overflow-hidden rounded-sm img-zoom" data-reveal="left">
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="aspect-square bg-secondary overflow-hidden rounded-sm">
                      <img
                        src={`/products/glycederm-kid/${n}.png`}
                        alt={`Glycederm Enfant ${n}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div data-reveal="right">
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent font-semibold mb-3">
                  Nouveauté · Gamme Enfants
                </p>
                <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight mb-6">
                  Douceur & Soin<br />
                  <span className="italic">pour les Tout-Petits</span>
                </h2>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-4">
                  La gamme Glycederm Enfant est formulée spécifiquement pour les peaux délicates des enfants. Sans agressivité, sans compromis sur la qualité.
                </p>
                <ul className="font-sans text-sm text-muted-foreground space-y-2 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    Formule ultra-douce, testée dermatologiquement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    Hydratation longue durée pour peaux sensibles
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    Sans parabènes · Sans colorants artificiels
                  </li>
                </ul>
                <Link
                  to="/boutique/glycederm-kid"
                  className="group inline-flex items-center gap-3 bg-accent text-accent-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-accent/90 hover:gap-5 transition-all duration-300"
                >
                  Découvrir la gamme
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-secondary">
          <div className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
            <div className="text-center mb-14" data-reveal>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Elles Témoignent
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-light">Nos Clientes Parlent</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className="bg-background p-8 rounded-sm relative"
                  data-reveal
                  data-reveal-delay={i * 120}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-6 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="font-sans text-[10px] text-muted-foreground">{t.location} • {t.product}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After + Conseil CTA */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square overflow-hidden rounded-sm img-zoom" data-reveal="left">
              <img
                src={conseilsImg}
                alt="Conseils STEFCOS"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                <p className="font-sans text-xs font-semibold text-primary-foreground tracking-wider uppercase">
                  Résultats visibles dès les premières semaines
                </p>
              </div>
            </div>
            <div data-reveal="right">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Besoin de Conseils ?
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight mb-6">
                Un Expert Vous<br />
                <span className="italic">Accompagne</span>
              </h2>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-4">
                Chaque peau est unique. Nos experts vous conseillent gratuitement pour trouver la routine idéale adaptée à votre type de peau.
              </p>
              <ul className="font-sans text-sm text-muted-foreground space-y-2 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  Diagnostic peau personnalisé
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  Recommandations produits sur-mesure
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  Suivi et accompagnement gratuit
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={buildWhatsAppConseilUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-[#1da851] transition-all duration-300"
                >
                  <MessageCircle size={16} />
                  Demander Conseil
                </a>
                <a
                  href={buildWhatsAppGenericUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-border font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-secondary transition-all duration-300"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Commander
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Banner */}
        <section className="bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 items-center gap-12 py-20 md:py-0">
              <div className="md:py-28" data-reveal="left">
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
                  className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-primary/90 hover:gap-5 transition-all duration-300"
                >
                  En savoir plus
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="relative h-[500px] md:h-[600px] img-zoom" data-reveal="right">
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
          <div className="text-center mb-14" data-reveal>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Explorer
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Par Catégorie</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Soins Corps", img: "/products/sublim-eclat/1.png" },
              { name: "Traitements", img: "/products/bio-activ/1.png" },
              { name: "Savons", img: "/products/glycederm/1.png" },
              { name: "Enfants", img: "/products/glycederm-kid/1.png" },
            ].map((cat, i) => {
              const count = products.filter((p) => p.category === cat.name).length;
              return (
                <Link
                  key={cat.name}
                  to="/boutique"
                  className="group relative aspect-[3/4] overflow-hidden bg-secondary img-zoom hover-glow"
                  data-reveal
                  data-reveal-delay={i * 100}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent transition-opacity duration-500 group-hover:from-foreground/80" />
                  <div className="absolute bottom-6 left-6 transition-transform duration-500 group-hover:translate-y-[-4px]">
                    <h3 className="font-serif text-xl text-primary-foreground mb-1">{cat.name}</h3>
                    <p className="font-sans text-xs text-primary-foreground/70">{count} produit{count > 1 ? "s" : ""}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Payment Info Banner */}
        <section className="bg-cream" data-reveal>
          <div className="container mx-auto px-6 lg:px-12 py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">Comment Commander ?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                {[
                  { step: "1", title: "Choisissez", desc: "Parcourez notre catalogue et sélectionnez vos produits" },
                  { step: "2", title: "Commandez", desc: "Cliquez sur WhatsApp, votre panier est envoyé automatiquement" },
                  { step: "3", title: "Recevez", desc: "Payez à la livraison ou par Mobile Money" },
                ].map((s) => (
                  <div key={s.step} className="text-center">
                    <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-serif text-lg font-medium mx-auto mb-3">
                      {s.step}
                    </div>
                    <h3 className="font-sans text-sm font-semibold mb-1">{s.title}</h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={buildWhatsAppGenericUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-[#1da851] transition-all duration-300"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Commander Maintenant
                </a>
              </div>
              <p className="font-sans text-[10px] text-muted-foreground mt-4">
                💳 Paiement à la livraison • 📱 Mobile Money (Flooz, T-Money) • 💵 Espèces
              </p>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
            <div className="text-center mb-14" data-reveal>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Dernières Nouveautés
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-light">Nouveautés</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {newArrivals.slice(0, 4).map((product, i) => (
                <div key={product.id} data-reveal data-reveal-delay={i * 100}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journal / Blog Section */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="text-center mb-14" data-reveal>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Notre Journal
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Conseils & Actualités</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {latestArticles.map((article, i) => (
              <Link
                to={`/journal/${article.slug}`}
                key={article.id}
                className="group"
                data-reveal
                data-reveal-delay={i * 120}
              >
                <div className="aspect-[3/2] overflow-hidden bg-secondary mb-5 rounded-sm">
                  <ArticleIllustration
                    illustrationKey={article.illustrationKey}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold">
                    {article.category}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                  {article.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12" data-reveal>
            <Link
              to="/journal"
              className="group inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              Voir tous les articles
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
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
            ].map((item, i) => (
              <div
                key={item.title}
                className="text-center group cursor-default"
                data-reveal="scale"
                data-reveal-delay={i * 80}
              >
                <item.icon size={28} className="mx-auto mb-3 text-accent transition-transform duration-300 group-hover:scale-110" />
                <h4 className="font-sans text-sm font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="font-sans text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
