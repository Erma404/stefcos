import Layout from "@/components/Layout";
import philosophyImg from "@/assets/philosophy.jpg";
import heroBanner from "@/assets/hero-banner.jpg";
import { Leaf, Heart, Shield, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  {
    icon: Leaf,
    title: "Ingrédients Naturels",
    description: "Nous sélectionnons les meilleurs actifs naturels africains — karité, avocat, grenade — pour des formules efficaces et respectueuses.",
  },
  {
    icon: Heart,
    title: "Beauté Inclusive",
    description: "Chaque produit est conçu spécifiquement pour répondre aux besoins uniques des peaux noires et mixtes.",
  },
  {
    icon: Shield,
    title: "Qualité Certifiée",
    description: "Nos produits sont fabriqués selon les normes les plus strictes de qualité et de sécurité dermatologique.",
  },
  {
    icon: Sparkles,
    title: "Innovation Continue",
    description: "Notre laboratoire innove constamment pour offrir des soins toujours plus performants et adaptés.",
  },
];

const Philosophie = () => {
  const revealRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={heroBanner} alt="Notre philosophie" className="absolute inset-0 w-full h-full object-cover" width={1024} height={1024} />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative container mx-auto px-6 lg:px-12 h-full flex items-center justify-center text-center">
          <div className="animate-fade-up">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary-foreground/70 mb-4">
              Notre Vision
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-primary-foreground">
              Notre Philosophie
            </h1>
          </div>
        </div>
      </section>

      <div ref={revealRef}>
        {/* Mission */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-reveal="left">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Notre Mission
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight mb-6">
                Sublimer la beauté
                <br />
                <span className="italic">authentique</span>
              </h2>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-4">
                STEFCOS TOGO SARL est née de la conviction que la beauté authentique mérite des soins d'exception. Depuis notre création, nous nous engageons à formuler des produits cosmétiques qui célèbrent et subliment la richesse des peaux noires et mixtes.
              </p>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                Notre laboratoire, situé au cœur de Lomé, combine expertise scientifique et savoir-faire traditionnel pour créer des formules uniques, alliant efficacité et douceur.
              </p>
            </div>
            <div className="aspect-[4/5] overflow-hidden img-zoom" data-reveal="right">
              <img
                src={philosophyImg}
                alt="Notre équipe"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16" data-reveal>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Ce Qui Nous Anime
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">Nos Valeurs</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className="text-center group cursor-default"
                  data-reveal="scale"
                  data-reveal-delay={i * 100}
                >
                  <value.icon size={32} className="mx-auto mb-4 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  <h3 className="font-serif text-xl font-medium mb-3">{value.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28 text-center max-w-3xl" data-reveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Notre Engagement
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light italic leading-relaxed mb-6">
            "Chaque peau est unique. Chaque soin STEFCOS est une promesse de beauté, d'éclat et de confiance."
          </h2>
          <p className="font-sans text-sm text-muted-foreground">— L'équipe STEFCOS</p>
        </section>
      </div>
    </Layout>
  );
};

export default Philosophie;
