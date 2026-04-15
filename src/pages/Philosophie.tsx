import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import philosophyImg from "@/assets/philosophy.jpg";
import heroBanner from "@/assets/hero-banner.jpg";
import { Leaf, Heart, Shield, Sparkles, FlaskConical, Users, Globe, Award, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const values = [
  {
    icon: Leaf,
    title: "Ingrédients Naturels",
    description: "Nous sélectionnons les meilleurs actifs naturels africains — karité, avocat, huile de carotte, Végéwhite — pour des formules efficaces et respectueuses de la peau.",
  },
  {
    icon: Heart,
    title: "Beauté Inclusive",
    description: "Chaque produit est conçu spécifiquement pour répondre aux besoins uniques des peaux noires et mixtes, souvent mal servies par les grandes marques internationales.",
  },
  {
    icon: Shield,
    title: "Qualité Certifiée",
    description: "Nos produits sont fabriqués selon les normes les plus strictes de qualité et de sécurité dermatologique. Testés, formulés, validés au Togo.",
  },
  {
    icon: Sparkles,
    title: "Innovation Continue",
    description: "Notre laboratoire R&D à Lomé innove constamment pour offrir des soins toujours plus performants, adaptés aux spécificités des peaux africaines.",
  },
];

const ingredients = [
  {
    name: "Huile de Carotte",
    benefit: "Éclat & Unification du teint",
    description: "Riche en bêta-carotène et vitamine A, l'huile de carotte est l'actif phare de notre gamme Sublim Éclat. Elle stimule la production de mélanine naturelle pour un teint doré et unifié, tout en nourrissant en profondeur les peaux sèches et mates. Idéale pour les peaux noires qui cherchent à raviver leur éclat naturel.",
    img: "/products/sublim-eclat/1.png",
  },
  {
    name: "AHA — Acides de Fruits",
    benefit: "Exfoliation & Clarification",
    description: "Les acides de fruits alpha-hydroxylés (AHA) constituent le cœur de notre gamme 72 Heures. En éliminant en douceur les cellules mortes, ils accélèrent le renouvellement cellulaire et lissent les irrégularités de teint. Résultat visible dès 72 heures sur les peaux noires et métissées : peau plus lisse, plus lumineuse, taches atténuées.",
    img: "/products/lait-72h/2.png",
  },
  {
    name: "Végéwhite & Extraits de Plantes",
    benefit: "Éclaircissement & Sécurité",
    description: "Alternative végétale à l'hydroquinone, le Végéwhite est un actif éclaircissant issu de la biotechnologie végétale. Sans danger pour la santé, il inhibe la surproduction de mélanine responsable des taches et du teint inégal. Présent dans notre Savon Éclaircissant 72H, il agit progressivement pour révéler la beauté naturelle des peaux africaines.",
    img: "/products/savon-72h/2.png",
  },
  {
    name: "Glycérine Pure & Aloe Vera",
    benefit: "Hydratation profonde & Douceur",
    description: "La glycérine végétale pure est un humectant puissant qui capte l'humidité de l'air pour la maintenir au cœur de la peau. Associée à l'aloe vera apaisant, elle constitue la base de notre gamme Glycederm — spécialement formulée pour les peaux délicates des enfants et les peaux sensibles. Zéro agressivité, 100 % douceur.",
    img: "/products/glycederm/1.png",
  },
];

const faqs = [
  {
    question: "Les produits STEFCOS sont-ils adaptés aux peaux très foncées ?",
    answer: "Oui, absolument. Tous nos produits sont formulés spécifiquement pour les peaux noires et très foncées. Nos actifs éclaircissants agissent de manière progressive et douce, sans agresser la mélanine naturelle. Nous tenons compte de la richesse en mélanine des peaux africaines pour proposer des soins qui subliment sans dénaturer.",
  },
  {
    question: "Vos produits contiennent-ils de l'hydroquinone ?",
    answer: "Non. STEFCOS n'utilise pas d'hydroquinone dans ses formulations. Nous privilégions des actifs alternatifs sûrs et certifiés comme le Végéwhite, l'acide kojique végétal et les AHA d'origine naturelle. Notre priorité est l'efficacité sans compromis sur la santé de votre peau.",
  },
  {
    question: "Combien de temps avant de voir des résultats visibles ?",
    answer: "Les premiers résultats sont souvent visibles dès 72 heures pour l'éclat et la texture (gamme 72 Heures). Pour l'unification du teint et l'atténuation des taches, comptez 3 à 4 semaines d'utilisation régulière. La régularité est la clé : nos formules sont conçues pour s'améliorer dans le temps.",
  },
  {
    question: "Est-ce que STEFCOS convient aux peaux sensibles et aux enfants ?",
    answer: "Notre gamme Glycederm Enfant est spécialement formulée pour les peaux délicates des enfants, avec des formules hypoallergéniques testées dermatologiquement. Pour les adultes à peau sensible, nous recommandons de commencer par les savons Glycederm et d'introduire progressivement les soins actifs.",
  },
  {
    question: "Où sont fabriqués vos produits ?",
    answer: "Tous nos produits sont fabriqués à Lomé, au Togo, dans notre laboratoire de la Zone Industrielle (Carrefour Ramatou). STEFCOS est une marque 100 % togolaise, fière de son ancrage africain et de ses standards de production conformes aux normes internationales de cosmétologie.",
  },
  {
    question: "Comment puis-je choisir le bon produit pour ma peau ?",
    answer: "Nous vous conseillons gratuitement via WhatsApp. Nos experts beauté analysent votre type de peau, vos préoccupations (taches, sécheresse, éclat, acné) et vous recommandent la routine STEFCOS la plus adaptée. Contactez-nous directement pour un diagnostic personnalisé.",
  },
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-base md:text-lg font-medium leading-snug">{question}</span>
        {open ? <ChevronUp size={18} className="flex-shrink-0 text-accent mt-0.5" /> : <ChevronDown size={18} className="flex-shrink-0 text-muted-foreground mt-0.5" />}
      </button>
      {open && (
        <p className="font-sans text-sm leading-relaxed text-muted-foreground pb-5">{answer}</p>
      )}
    </div>
  );
};

const Philosophie = () => {
  const revealRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={heroBanner} alt="Cosmétiques peaux noires STEFCOS Togo — Notre philosophie" className="absolute inset-0 w-full h-full object-cover" width={1024} height={1024} />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative container mx-auto px-6 lg:px-12 h-full flex items-center justify-center text-center">
          <div className="animate-fade-up max-w-2xl">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary-foreground/70 mb-4">
              Cosmétiques Naturels · Peaux Noires & Mixtes · Fabriqué au Togo
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-primary-foreground mb-4">
              Notre Philosophie
            </h1>
            <p className="font-sans text-sm text-primary-foreground/80 max-w-md mx-auto">
              Des soins cosmétiques formulés avec rigueur scientifique pour révéler l'éclat naturel des peaux africaines.
            </p>
          </div>
        </div>
      </section>

      <div ref={revealRef}>

        {/* Chiffres clés */}
        <section className="bg-foreground text-primary-foreground">
          <div className="container mx-auto px-6 lg:px-12 py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Award,      stat: "10+",    label: "Années d'expertise cosmétique" },
                { icon: FlaskConical, stat: "8",    label: "Gammes formulées pour peaux africaines" },
                { icon: Users,      stat: "50 000+", label: "Clientes satisfaites en Afrique de l'Ouest" },
                { icon: Globe,      stat: "5+",     label: "Pays de distribution" },
              ].map((item, i) => (
                <div key={i} data-reveal="scale" data-reveal-delay={i * 80}>
                  <item.icon size={24} className="mx-auto mb-3 text-accent" />
                  <p className="font-serif text-3xl md:text-4xl font-light mb-1">{item.stat}</p>
                  <p className="font-sans text-[10px] tracking-wider uppercase text-primary-foreground/60 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-reveal="left">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Notre Mission
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light leading-tight mb-6">
                Des soins cosmétiques conçus
                <br />
                <span className="italic">pour les peaux noires</span>
              </h2>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-4">
                STEFCOS TOGO SARL est née d'un constat : les peaux noires et métissées représentent des millions de personnes en Afrique et dans le monde, mais restent largement ignorées par les grandes marques cosmétiques internationales. Nos formules répondent aux problématiques spécifiques de l'hyperpigmentation, de la sécheresse cutanée et de l'éclat naturel propres aux carnations foncées.
              </p>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-4">
                Notre laboratoire, situé au cœur de Lomé dans la Zone Industrielle de Togo, combine expertise scientifique et savoir-faire traditionnel africain. Chaque formule est développée avec une rigueur dermatologique totale pour garantir efficacité, tolérance et sécurité à long terme.
              </p>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                Nous sourceons nos actifs naturels en priorité auprès de producteurs locaux togolais et d'Afrique de l'Ouest — beurre de karité, huiles végétales, extraits de plantes — pour allier performance et impact social positif.
              </p>
            </div>
            <div className="aspect-[4/5] overflow-hidden img-zoom" data-reveal="right">
              <img
                src={philosophyImg}
                alt="Laboratoire STEFCOS Lomé Togo — Formulation cosmétique peaux noires"
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16" data-reveal>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Notre Parcours
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">
                De Lomé au monde entier —<br />
                <span className="italic">l'histoire d'une cosmétique africaine ambitieuse</span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-10">
              {[
                {
                  period: "Les Origines",
                  title: "Une marque née d'une conviction",
                  text: "STEFCOS est fondée à Lomé avec une mission claire : créer des cosmétiques de qualité premium spécifiquement adaptés aux peaux noires et métissées. Là où les marques internationales proposent des produits génériques peu adaptés, STEFCOS choisit de formuler des soins pensés depuis le continent africain, pour les peaux africaines.",
                },
                {
                  period: "Le Développement",
                  title: "Recherche & innovation au service de la peau noire",
                  text: "Investissement dans un laboratoire R&D à Lomé, recrutement de dermatolologues et de formulateurs spécialisés dans les cosmétiques pour peaux de couleur. Développement des gammes 72 Heures aux AHA, Sublim Éclat à l'huile de carotte et Sido Clair aux extraits végétaux — des soins éclaircissants naturels sans hydroquinone.",
                },
                {
                  period: "Aujourd'hui",
                  title: "Une référence en cosmétique africaine",
                  text: "STEFCOS est aujourd'hui distribuée dans plusieurs pays d'Afrique de l'Ouest. Reconnue pour la qualité de ses formulations et son ancrage local, la marque continue d'innover avec de nouvelles gammes — dont la Glycederm Enfant, dédiée aux peaux délicates des tout-petits. Notre ambition : devenir la référence mondiale des soins cosmétiques pour peaux noires et métissées.",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-start" data-reveal data-reveal-delay={i * 120}>
                  <div className="flex-shrink-0 w-1 bg-accent rounded-full self-stretch hidden md:block" />
                  <div>
                    <p className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold mb-1">{step.period}</p>
                    <h3 className="font-serif text-xl font-medium mb-3">{step.title}</h3>
                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
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
        </section>

        {/* Ingrédients Stars */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16" data-reveal>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                La Science de nos Formules
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">
                Nos Ingrédients Stars
              </h2>
              <p className="font-sans text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
                Chaque actif est sélectionné pour son efficacité prouvée sur les peaux noires et mixtes, sa tolérance cutanée et sa traçabilité.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {ingredients.map((ing, i) => (
                <div
                  key={ing.name}
                  className="bg-background rounded-sm overflow-hidden flex gap-0"
                  data-reveal
                  data-reveal-delay={i * 100}
                >
                  <div className="w-28 flex-shrink-0">
                    <img
                      src={ing.img}
                      alt={`${ing.name} — actif cosmétique peau noire`}
                      loading="lazy"
                      className="w-full h-full object-contain bg-secondary"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-accent font-semibold mb-1">{ing.benefit}</p>
                    <h3 className="font-serif text-lg font-medium mb-2">{ing.name}</h3>
                    <p className="font-sans text-xs leading-relaxed text-muted-foreground">{ing.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi STEFCOS */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="text-center mb-16" data-reveal>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Notre Différence
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light">
              Pourquoi choisir STEFCOS ?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Formulé pour les peaux noires",
                text: "Contrairement aux marques généralistes, STEFCOS développe chaque formule en tenant compte des caractéristiques biologiques spécifiques des peaux noires : taux de mélanine élevé, tendance à l'hyperpigmentation, besoins en hydratation profonde et sensibilité aux réactions post-inflammatoires.",
              },
              {
                num: "02",
                title: "Sans actifs controversés",
                text: "Nos soins éclaircissants sont formulés sans hydroquinone, sans mercure, sans corticoïdes. Nous utilisons exclusivement des actifs certifiés sûrs : AHA naturels, Végéwhite, huile de carotte, extraits végétaux. Une cosmétique efficace qui respecte votre santé sur le long terme.",
              },
              {
                num: "03",
                title: "Fabriqué en Afrique, pour l'Afrique",
                text: "Nos produits sont fabriqués à Lomé, au Togo, avec une connaissance profonde du climat, des modes de vie et des besoins beauté des femmes africaines. En choisissant STEFCOS, vous soutenez une marque africaine indépendante et contribuez à l'économie locale togolaise.",
              },
            ].map((item, i) => (
              <div
                key={item.num}
                className="border border-border p-8 rounded-sm"
                data-reveal
                data-reveal-delay={i * 100}
              >
                <p className="font-serif text-4xl font-light text-accent/30 mb-4">{item.num}</p>
                <h3 className="font-serif text-xl font-medium mb-4">{item.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
            <div className="text-center mb-14" data-reveal>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Vos Questions
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">
                Questions Fréquentes sur nos Soins pour Peaux Noires
              </h2>
            </div>
            <div data-reveal>
              {faqs.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Promise / CTA */}
        <section className="container mx-auto px-6 lg:px-12 py-20 md:py-28 text-center max-w-3xl" data-reveal>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Notre Engagement
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light italic leading-relaxed mb-6">
            "Chaque peau est unique. Chaque soin STEFCOS est une promesse de beauté, d'éclat et de confiance."
          </h2>
          <p className="font-sans text-sm text-muted-foreground mb-10">— L'équipe STEFCOS, Lomé, Togo</p>
          <Link
            to="/boutique"
            className="group inline-flex items-center gap-3 bg-accent text-accent-foreground font-sans text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-accent/90 hover:gap-5 transition-all duration-300"
          >
            Découvrir nos produits
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </section>

      </div>
    </Layout>
  );
};

export default Philosophie;
