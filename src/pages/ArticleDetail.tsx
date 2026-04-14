import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles } from "@/data/articles";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const revealRef = useScrollReveal();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/journal" replace />;

  const related = articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);
  const fallbackRelated = related.length < 3
    ? [...related, ...articles.filter((a) => a.id !== article.id && !related.includes(a))].slice(0, 3)
    : related;

  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          width={1400}
          height={700}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/10" />
        <div className="relative container mx-auto px-6 lg:px-12 h-full flex flex-col justify-end pb-12">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6 w-fit"
          >
            <ArrowLeft size={12} /> Retour au journal
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-accent text-accent-foreground font-sans text-[10px] tracking-widest uppercase font-semibold px-3 py-1">
              {article.category}
            </span>
            <span className="font-sans text-xs text-primary-foreground/70 flex items-center gap-1">
              <Calendar size={10} /> {article.date}
            </span>
            <span className="font-sans text-xs text-primary-foreground/70 flex items-center gap-1">
              <Clock size={10} /> {article.readTime}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-primary-foreground max-w-3xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Body */}
      <article className="container mx-auto px-6 lg:px-12 py-16 md:py-20" ref={revealRef}>
        <div className="max-w-3xl mx-auto" data-reveal>
          {/* Lead paragraph */}
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 mb-10 border-l-2 border-accent pl-6">
            {article.excerpt}
          </p>

          {/* Content */}
          <div className="space-y-6">
            <p className="font-sans text-base leading-[1.8] text-foreground/80">
              {article.content}
            </p>
            <p className="font-sans text-base leading-[1.8] text-foreground/80">
              Chez STEFCOS, nous nous engageons à offrir des produits de qualité supérieure, formulés avec soin pour répondre aux besoins spécifiques des peaux noires et mixtes. Chaque formule est le fruit d'une recherche approfondie et d'une sélection rigoureuse des meilleurs ingrédients naturels, majoritairement sourcés au Togo et en Afrique de l'Ouest.
            </p>
            <p className="font-sans text-base leading-[1.8] text-foreground/80">
              Notre équipe d'experts en dermatologie cosmétique travaille sans relâche pour développer des soins innovants qui allient tradition africaine et science moderne. Nous croyons fermement que la beauté authentique passe par le respect de votre peau et de ses besoins uniques.
            </p>

            {/* Pull quote */}
            <blockquote className="my-12 py-8 border-y border-border text-center">
              <p className="font-serif text-2xl md:text-3xl font-light italic text-foreground/90 leading-relaxed">
                "La beauté authentique commence par le respect de sa peau"
              </p>
              <cite className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-4 block not-italic">
                — STEFCOS
              </cite>
            </blockquote>

            <p className="font-sans text-base leading-[1.8] text-foreground/80">
              En choisissant STEFCOS, vous optez pour une cosmétique responsable qui valorise le patrimoine naturel africain tout en offrant des résultats visibles et durables. Notre mission est de rendre accessible à tous des soins haut de gamme, pensés pour sublimer chaque type de peau dans le respect de sa nature profonde.
            </p>
          </div>

          {/* Share + CTA */}
          <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <Link
              to="/boutique"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-primary/90 transition-all duration-300"
            >
              Découvrir nos produits
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button
              onClick={() => navigator.share?.({ title: article.title, url: window.location.href }).catch(() => {})}
              className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
            >
              <Share2 size={14} /> Partager
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <section className="mt-24 pt-16 border-t border-border">
          <div className="text-center mb-12" data-reveal>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Continuer la lecture
            </p>
            <h2 className="font-serif text-2xl md:text-4xl font-light">Articles similaires</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {fallbackRelated.map((a, i) => (
              <Link
                to={`/journal/${a.slug}`}
                key={a.id}
                className="group"
                data-reveal
                data-reveal-delay={i * 120}
              >
                <div className="aspect-[3/2] overflow-hidden bg-secondary mb-5 img-zoom hover-glow">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold">
                    {a.category}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground">{a.date}</span>
                </div>
                <h3 className="font-serif text-lg font-medium group-hover:text-accent transition-colors leading-snug">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default ArticleDetail;
