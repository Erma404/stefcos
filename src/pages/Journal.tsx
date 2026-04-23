import { useState, useEffect } from "react";
import { usePageSeo } from "@/hooks/usePageSeo";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ArticleIllustration from "@/components/ArticleIllustration";
import { ArrowRight, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles } from "@/data/articles";

const ARTICLES_PER_PAGE = 6; // 1 featured + 5 en grille

const Journal = () => {
  usePageSeo(
    "Journal Beauté — Conseils Soins Peaux Noires & Mixtes | STEFCOS",
    "Conseils beauté, routines de soins, ingrédients naturels africains. Le journal STEFCOS pour prendre soin de votre peau noire ou mixte au quotidien.",
    "/journal"
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Journal Beauté STEFCOS",
      "description": "Conseils beauté et routines de soins pour peaux noires et mixtes par STEFCOS Togo.",
      "url": "https://www.stefcos.com/journal",
      "publisher": {
        "@type": "Organization",
        "name": "STEFCOS TOGO SARL",
        "url": "https://www.stefcos.com",
      },
      "blogPost": articles.slice(0, 10).map(a => ({
        "@type": "BlogPosting",
        "headline": a.title,
        "description": a.excerpt,
        "url": `https://www.stefcos.com/journal/${a.slug}`,
        "author": { "@type": "Organization", "name": "STEFCOS" },
      })),
    };
    let el = document.getElementById("schema-blog") as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = "schema-blog";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { el?.remove(); };
  }, []);
  const revealRef = useScrollReveal(page);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIdx   = (page - 1) * ARTICLES_PER_PAGE;
  const pageItems  = articles.slice(startIdx, startIdx + ARTICLES_PER_PAGE);
  const featured   = pageItems[0];
  const rest       = pageItems.slice(1);

  const goTo = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24" ref={revealRef}>

        {/* Header */}
        <div className="text-center mb-14" data-reveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Actualités & Conseils
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">Notre Journal</h1>
          <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
            Conseils d'experts, routines beauté et découvertes d'ingrédients pour sublimer votre peau au quotidien.
          </p>
          {/* Compteur de page */}
          <p className="font-sans text-[10px] text-muted-foreground mt-2 tracking-widest uppercase">
            Page {page} / {totalPages} · {articles.length} articles
          </p>
        </div>

        {/* Article à la une */}
        <Link to={`/journal/${featured.slug}`} className="group block mb-16" data-reveal>
          <article className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] overflow-hidden bg-secondary rounded-sm">
              <ArticleIllustration
                illustrationKey={featured.illustrationKey}
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold">
                  {featured.category}
                </span>
                <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={10} /> {featured.date}
                </span>
                <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={10} /> {featured.readTime}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-light leading-tight group-hover:text-accent transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-foreground group-hover:text-accent transition-colors duration-300">
                Lire l'article <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        </Link>

        {/* Grille des articles */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {rest.map((article, i) => (
              <Link
                to={`/journal/${article.slug}`}
                key={article.id}
                className="group"
                data-reveal
                data-reveal-delay={i * 100}
              >
                <article>
                  <div className="aspect-[3/2] overflow-hidden bg-secondary mb-5 rounded-sm">
                    <ArticleIllustration
                      illustrationKey={article.illustrationKey}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
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
                  <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2" data-reveal>
            {/* Précédent */}
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 font-sans text-xs font-semibold tracking-widest uppercase border border-border rounded-sm hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} /> Préc.
            </button>

            {/* Numéros de pages */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isCurrent = p === page;
                const isNearby  = Math.abs(p - page) <= 1;
                const isEdge    = p === 1 || p === totalPages;

                if (!isNearby && !isEdge) {
                  // Ellipsis — n'afficher qu'une fois par côté
                  if (p === 2 || p === totalPages - 1) {
                    return (
                      <span key={p} className="font-sans text-xs text-muted-foreground px-1">…</span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={p}
                    onClick={() => goTo(p)}
                    className={`w-9 h-9 flex items-center justify-center font-sans text-xs font-semibold rounded-sm transition-colors ${
                      isCurrent
                        ? "bg-foreground text-background"
                        : "border border-border hover:border-accent hover:text-accent"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            {/* Suivant */}
            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 font-sans text-xs font-semibold tracking-widest uppercase border border-border rounded-sm hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Suiv. <ChevronRight size={14} />
            </button>
          </div>
        )}

      </section>
    </Layout>
  );
};

export default Journal;
