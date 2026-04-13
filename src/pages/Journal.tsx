import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import philosophyImg from "@/assets/philosophy.jpg";
import heroBanner from "@/assets/hero-banner.jpg";
import productsCollection from "@/assets/products-collection.jpeg";

const articles = [
  {
    id: "1",
    title: "Les 5 gestes essentiels pour une peau éclatante",
    excerpt: "Découvrez notre routine beauté quotidienne pour sublimer votre teint naturellement.",
    image: heroBanner,
    date: "12 Avril 2026",
    category: "Routine Beauté",
  },
  {
    id: "2",
    title: "Pourquoi choisir des soins adaptés aux peaux noires ?",
    excerpt: "Les peaux noires et mixtes ont des besoins spécifiques qui méritent une attention particulière.",
    image: philosophyImg,
    date: "5 Avril 2026",
    category: "Conseils",
  },
  {
    id: "3",
    title: "Notre nouvelle gamme Bio Activ : l'innovation au naturel",
    excerpt: "STEFCOS lance sa gamme la plus innovante, alliant science et nature pour des résultats visibles.",
    image: productsCollection,
    date: "28 Mars 2026",
    category: "Nouveautés",
  },
];

const Journal = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Actualités & Conseils
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">Notre Journal</h1>
        </div>

        {/* Featured Article */}
        <Link to="#" className="group block mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold">
                  {articles[0].category}
                </span>
                <span className="font-sans text-xs text-muted-foreground">{articles[0].date}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-light leading-tight group-hover:text-accent transition-colors">
                {articles[0].title}
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{articles[0].excerpt}</p>
              <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase text-foreground">
                Lire l'article <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </Link>

        {/* Other Articles */}
        <div className="grid md:grid-cols-2 gap-10">
          {articles.slice(1).map((article) => (
            <Link to="#" key={article.id} className="group">
              <div className="aspect-[3/2] overflow-hidden bg-secondary mb-5">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold">
                  {article.category}
                </span>
                <span className="font-sans text-xs text-muted-foreground">{article.date}</span>
              </div>
              <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Journal;
