import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles } from "@/data/articles";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const revealRef = useScrollReveal();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/journal" replace />;

  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <Layout>
      <article className="container mx-auto px-6 lg:px-12 py-16 md:py-24" ref={revealRef}>
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={12} /> Retour au journal
        </Link>

        <div className="max-w-3xl mx-auto" data-reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold">
              {article.category}
            </span>
            <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
              <Calendar size={10} /> {article.date}
            </span>
            <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={10} /> {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-light leading-tight mb-8">
            {article.title}
          </h1>

          <div className="aspect-[16/9] overflow-hidden bg-secondary mb-10">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              width={1200}
              height={675}
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="font-sans text-base leading-relaxed text-muted-foreground mb-6 text-lg">
              {article.excerpt}
            </p>
            <p className="font-sans text-base leading-relaxed text-foreground/80">
              {article.content}
            </p>
            <p className="font-sans text-base leading-relaxed text-foreground/80 mt-4">
              Chez STEFCOS, nous nous engageons à offrir des produits de qualité supérieure, formulés avec soin pour répondre aux besoins spécifiques des peaux noires et mixtes. Chaque formule est le fruit d'une recherche approfondie et d'une sélection rigoureuse des meilleurs ingrédients naturels, majoritairement sourcés au Togo et en Afrique de l'Ouest.
            </p>
            <p className="font-sans text-base leading-relaxed text-foreground/80 mt-4">
              Notre équipe d'experts en dermatologie cosmétique travaille sans relâche pour développer des soins innovants qui allient tradition africaine et science moderne. Nous croyons fermement que la beauté authentique passe par le respect de votre peau et de ses besoins uniques.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              to="/boutique"
              className="group inline-flex items-center gap-3 bg-accent text-accent-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-accent/90 transition-all duration-300"
            >
              Découvrir nos produits
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <section className="mt-20 pt-16 border-t border-border">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-center mb-10" data-reveal>
            Articles similaires
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((a, i) => (
              <Link
                to={`/journal/${a.slug}`}
                key={a.id}
                className="group"
                data-reveal
                data-reveal-delay={i * 120}
              >
                <div className="aspect-[3/2] overflow-hidden bg-secondary mb-4 img-zoom">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold">
                  {a.category}
                </span>
                <h3 className="font-serif text-lg font-medium mt-2 group-hover:text-accent transition-colors leading-snug">
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
