import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles } from "@/data/articles";


const Journal = () => {
  const revealRef = useScrollReveal();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <Layout>
      <Helmet>
        <title>Journal Beauté - STEFCOS | Conseils Soins Peaux Noires & Mixtes</title>
        <meta name="description" content="Découvrez nos articles et conseils d'experts pour sublimer les peaux noires et mixtes. Routines beauté, ingrédients naturels africains et tendances cosmétiques." />
        <link rel="canonical" href="https://stefcos-radiance-hub.lovable.app/journal" />
      </Helmet>

      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24" ref={revealRef}>
        <div className="text-center mb-14" data-reveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Actualités & Conseils
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">Notre Journal</h1>
          <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
            Conseils d'experts, routines beauté et découvertes d'ingrédients pour sublimer votre peau au quotidien.
          </p>
        </div>

        {/* Featured Article */}
        <Link to={`/journal/${featured.slug}`} className="group block mb-16" data-reveal>
          <article className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] overflow-hidden bg-secondary img-zoom">
              <img
                src={featured.image}
                alt={featured.title}
                loading="eager"
                width={1024}
                height={768}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
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

        {/* All Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rest.map((article, i) => (
            <Link
              to={`/journal/${article.slug}`}
              key={article.id}
              className="group"
              data-reveal
              data-reveal-delay={i * 100}
            >
              <article>
                <div className="aspect-[3/2] overflow-hidden bg-secondary mb-5 img-zoom hover-glow">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    width={800}
                    height={533}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold">
                    {article.category}
                  </span>
                  <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={10} /> {article.date}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                  {article.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Journal;
