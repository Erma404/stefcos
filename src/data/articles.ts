import heroBanner from "@/assets/hero-banner.jpg";
import philosophyImg from "@/assets/philosophy.jpg";
import productsCollection from "@/assets/products-collection.jpeg";

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface ArticleFaqItem {
  q: string;
  a: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  illustrationKey: string;
  date: string;
  dateISO: string;
  category: string;
  readTime: string;
  /** Corps structuré (H2 + paragraphe) — utilisé quand présent à la place du texte générique de remplissage. */
  sections?: ArticleSection[];
  /** Questions/réponses affichées en fin d'article + balisées en FAQPage JSON-LD. */
  faq?: ArticleFaqItem[];
}

const images = [heroBanner, philosophyImg, productsCollection];
const pick = (i: number) => images[i % images.length];

export const articles: Article[] = [
  {
    id: "16",
    slug: "acheter-cosmetiques-lome-livraison-faq",
    title: "Où acheter les cosmétiques STEFCOS à Lomé : commande, paiement et livraison",
    excerpt: "Les produits STEFCOS se commandent directement sur la boutique en ligne ou par WhatsApp, avec livraison à Lomé sous 24 à 48h, expédition possible dans tout le Togo, et paiement à la livraison ou par mobile money.",
    content: "Commander STEFCOS n'a jamais été aussi simple : boutique en ligne, WhatsApp officiel ou points de vente agréés à Lomé, avec des délais de livraison courts et plusieurs moyens de paiement adaptés au marché togolais.",
    image: pick(1),
    illustrationKey: "livraison-lome",
    date: "20 Juillet 2026",
    dateISO: "2026-07-20",
    category: "Marque",
    readTime: "4 min",
    sections: [
      {
        heading: "Commander en ligne en quelques clics",
        body: "Rendez-vous sur la boutique STEFCOS, sélectionnez vos produits favoris — Glycederm, Sido Clair, Sublim Éclat ou nos savons naturels — ajoutez-les au panier puis validez votre commande avec vos coordonnées de livraison. Une confirmation vous est envoyée immédiatement, par email ou WhatsApp selon vos préférences.",
      },
      {
        heading: "Les moyens de paiement disponibles",
        body: "À Lomé, le paiement à la livraison reste le mode le plus utilisé : vous réglez en espèces directement au livreur à réception du colis. Le mobile money est également accepté pour les clients qui préfèrent régler à l'avance, notamment pour les commandes passées depuis l'intérieur du pays.",
      },
      {
        heading: "Délais et zones de livraison",
        body: "Comptez généralement 24 à 48h pour une livraison dans Lomé et ses environs immédiats. Pour l'intérieur du Togo, les délais varient de 2 à 5 jours ouvrés selon la localité et les liaisons de transport disponibles. Pour toute zone non couverte automatiquement, notre équipe étudie une solution par message WhatsApp.",
      },
      {
        heading: "Suivi de commande et service client",
        body: "Chaque commande est confirmée par message avant expédition, avec un contact direct disponible pour toute question sur l'état de la livraison. Notre secrétariat commercial reste joignable par téléphone et WhatsApp pour vous accompagner du choix des produits jusqu'à la réception.",
      },
    ],
    faq: [
      { q: "Combien de temps pour être livré à Lomé ?", a: "Comptez généralement 24 à 48h pour une livraison à Lomé après confirmation de la commande. Pour l'intérieur du Togo, les délais varient de 2 à 5 jours selon la localité." },
      { q: "Peut-on payer à la livraison ?", a: "Oui, le paiement à la livraison est disponible à Lomé. Le mobile money est aussi accepté pour les commandes passées en dehors de la capitale." },
      { q: "Comment commander sans passer par le site internet ?", a: "Vous pouvez commander directement via le numéro WhatsApp officiel STEFCOS en envoyant la liste des produits souhaités ; notre équipe confirme la disponibilité et organise la livraison." },
      { q: "Livrez-vous en dehors du Togo ?", a: "Les livraisons sont actuellement concentrées sur le territoire togolais. Pour toute demande d'expédition internationale, contactez notre service client qui étudie les possibilités au cas par cas." },
    ],
  },
  {
    id: "17",
    slug: "contrefacon-cosmetiques-guide-authenticite",
    title: "Comment reconnaître un produit STEFCOS authentique et éviter la contrefaçon",
    excerpt: "Un produit STEFCOS authentique s'achète via nos canaux officiels, porte un packaging scellé et un numéro de lot lisible, et ne présente ni odeur chimique suspecte ni prix anormalement bas.",
    content: "La contrefaçon cosmétique est un vrai danger sur le marché ouest-africain. Voici les signes qui ne trompent pas pour vérifier qu'un produit STEFCOS est bien authentique avant de l'utiliser sur votre peau.",
    image: pick(2),
    illustrationKey: "authenticite",
    date: "10 Juillet 2026",
    dateISO: "2026-07-10",
    category: "Marque",
    readTime: "5 min",
    sections: [
      {
        heading: "Le fléau de la contrefaçon cosmétique en Afrique de l'Ouest",
        body: "Le succès des marques de cosmétiques togolaises attire malheureusement des revendeurs peu scrupuleux qui reconditionnent des produits bas de gamme sous des étiquettes copiées. Ces contrefaçons circulent surtout sur les marchés parallèles et certains réseaux sociaux non vérifiés, loin des canaux de vente officiels.",
      },
      {
        heading: "5 signes qui doivent vous alerter",
        body: "Un prix nettement inférieur à celui pratiqué sur nos canaux officiels sans promotion annoncée, un emballage flou ou truffé de fautes, l'absence de numéro de lot lisible, une odeur chimique inhabituelle, ou une texture qui se sépare ou tourne anormalement vite après ouverture : ce sont les signaux les plus fréquents d'un produit contrefait.",
      },
      {
        heading: "Comment vérifier un produit STEFCOS",
        body: "Achetez uniquement via la boutique officielle en ligne, le WhatsApp commande de la marque, ou nos points de vente agréés à Lomé. Comparez systématiquement le packaging reçu avec les visuels officiels du site, et vérifiez la présence d'un numéro de lot net et lisible sur l'emballage.",
      },
      {
        heading: "Que faire en cas de doute",
        body: "N'appliquez pas un produit dont l'authenticité vous semble incertaine. Contactez le service client STEFCOS avec une photo du produit, de son emballage et de son numéro de lot : notre équipe vérifie rapidement s'il s'agit bien d'un produit d'origine.",
      },
    ],
    faq: [
      { q: "Comment savoir si mon produit STEFCOS est un faux ?", a: "Vérifiez le numéro de lot imprimé sur l'emballage, la qualité du packaging (impression nette, opercule scellé) et la texture du produit à l'ouverture. En cas de doute, envoyez une photo au service client STEFCOS avant toute utilisation." },
      { q: "Où acheter des produits STEFCOS garantis authentiques ?", a: "Uniquement via la boutique officielle en ligne, le WhatsApp commande officiel de la marque, ou les points de vente agréés à Lomé. Évitez les revendeurs de marché sans traçabilité." },
      { q: "Un produit contrefait peut-il être dangereux ?", a: "Oui, les contrefaçons cosmétiques contiennent parfois du mercure, des corticoïdes non déclarés ou des conservateurs non conformes, avec des risques sérieux pour la peau et la santé générale à moyen terme." },
      { q: "Le prix bas est-il toujours un signe de contrefaçon ?", a: "Pas systématiquement, mais un prix nettement inférieur à celui pratiqué sur les canaux officiels STEFCOS, en dehors d'une promotion annoncée par la marque, doit éveiller la méfiance." },
    ],
  },
  {
    id: "18",
    slug: "soins-peau-grossesse-securite",
    title: "Grossesse et soins de la peau : quels produits utiliser en toute sécurité",
    excerpt: "Pendant la grossesse, évitez rétinoïdes, hydroquinone et huiles essentielles concentrées : misez plutôt sur des soins hydratants et apaisants à base de karité, vitamine E et acide hyaluronique.",
    content: "La grossesse transforme la peau en profondeur. Voici les actifs à bannir, ceux qui restent sûrs, et une routine simple pour traverser ces neuf mois en toute sérénité.",
    image: pick(0),
    illustrationKey: "grossesse",
    date: "25 Juin 2026",
    dateISO: "2026-06-25",
    category: "Conseils",
    readTime: "6 min",
    sections: [
      {
        heading: "Pourquoi la peau change-t-elle pendant la grossesse ?",
        body: "Les bouleversements hormonaux stimulent la production de mélanine, ce qui explique l'apparition fréquente du masque de grossesse (chloasma), souvent plus marqué et plus visible sur peau noire. La peau devient aussi plus sensible et plus sujette aux vergetures avec l'étirement rapide de certaines zones.",
      },
      {
        heading: "Les ingrédients à éviter formellement",
        body: "Le rétinol et les rétinoïdes, l'hydroquinone, l'acide salicylique à haute dose et les huiles essentielles concentrées sont déconseillés pendant la grossesse et l'allaitement, certains pouvant traverser la barrière cutanée et affecter le développement du bébé. Consultez toujours votre sage-femme ou votre médecin avant d'introduire un nouveau soin.",
      },
      {
        heading: "Les actifs sûrs et recommandés",
        body: "La vitamine C illumine le teint sans risque connu, l'acide hyaluronique hydrate en profondeur, et le beurre de karité pur reste l'un des ingrédients les plus sûrs pour nourrir la peau. La niacinamide à faible dose est généralement bien tolérée et aide à limiter les marques d'hyperpigmentation.",
      },
      {
        heading: "Une routine simple et rassurante",
        body: "Un nettoyant doux, un sérum hydratant à la vitamine C, une huile anti-vergetures appliquée en massage matin et soir sur le ventre et la poitrine, et une protection solaire quotidienne contre le masque de grossesse : ces quatre gestes suffisent à traverser la grossesse sereinement.",
      },
    ],
    faq: [
      { q: "Peut-on utiliser un produit éclaircissant enceinte ?", a: "Il faut éviter les produits contenant de l'hydroquinone ou du rétinol pendant la grossesse. Privilégiez des actifs doux comme la vitamine C ou l'acide azélaïque, et demandez toujours l'avis de votre sage-femme ou dermatologue avant d'introduire un nouveau soin." },
      { q: "Le masque de grossesse disparaît-il après l'accouchement ?", a: "Dans la majorité des cas, le chloasma s'atténue progressivement dans les mois suivant l'accouchement, surtout avec une protection solaire rigoureuse. Chez certaines femmes, notamment à peau noire, il peut persister et nécessiter des soins ciblés supplémentaires." },
      { q: "Le beurre de karité est-il sûr pendant la grossesse ?", a: "Oui, le beurre de karité pur est l'un des ingrédients les plus sûrs et recommandés pendant la grossesse pour nourrir la peau et prévenir les vergetures, sans risque hormonal ni contre-indication connue." },
      { q: "Faut-il changer sa routine dès le premier trimestre ?", a: "Oui, c'est le moment idéal pour retirer tout actif à risque (rétinol, hydroquinone) et le remplacer par des soins hydratants doux, avant que la peau ne devienne plus sensible aux deuxième et troisième trimestres." },
    ],
  },
  {
    id: "19",
    slug: "peau-grasse-pores-dilates-routine",
    title: "Peau grasse et pores dilatés : la routine matifiante qui fonctionne vraiment sur peau noire",
    excerpt: "Une peau grasse à pores dilatés a besoin d'un nettoyage doux, d'un exfoliant à l'acide salicylique et d'une hydratation légère non comédogène : l'assécher ne fait qu'aggraver la production de sébum.",
    content: "Pores dilatés et brillance en fin de journée sont le lot de nombreuses peaux noires. Voici pourquoi, et comment adapter sa routine sans tomber dans le piège du sur-nettoyage.",
    image: pick(1),
    illustrationKey: "peau-grasse",
    date: "10 Juin 2026",
    dateISO: "2026-06-10",
    category: "Routine Beauté",
    readTime: "5 min",
    sections: [
      {
        heading: "Pourquoi les peaux noires sont-elles plus sujettes à la peau grasse ?",
        body: "Les peaux noires possèdent en moyenne davantage de glandes sébacées actives et un épiderme plus dense, ce qui rend les pores visuellement plus marqués. Cette caractéristique n'est pas un défaut à corriger à tout prix, mais elle demande une routine adaptée pour rester confortable au quotidien.",
      },
      {
        heading: "L'erreur n°1 : sur-nettoyer sa peau",
        body: "Utiliser un nettoyant trop décapant ou se laver le visage plusieurs fois par jour pousse la peau à produire encore plus de sébum pour compenser l'agression. Ce cercle vicieux aggrave la brillance et la dilatation des pores au lieu de les réduire.",
      },
      {
        heading: "Les bons actifs matifiants",
        body: "L'acide salicylique désincruste les pores en profondeur, le zinc PCA régule la production de sébum, et la niacinamide affine visiblement le grain de peau. Notre savon clarifiant et notre gommage doux STEFCOS s'intègrent parfaitement dans une routine anti-brillance sans agresser la peau.",
      },
      {
        heading: "Routine matin et soir en 4 étapes",
        body: "Le matin : nettoyant doux, sérum à la niacinamide, hydratant fluide non comédogène et protection solaire matifiante. Le soir : double nettoyage léger puis exfoliation douce une à deux fois par semaine pour garder les pores nets sans fragiliser la barrière cutanée.",
      },
    ],
    faq: [
      { q: "Faut-il arrêter d'hydrater si on a la peau grasse ?", a: "Non, c'est l'erreur la plus fréquente : priver une peau grasse d'hydratation pousse les glandes sébacées à produire encore plus de sébum pour compenser. Il faut choisir une texture légère et non comédogène, jamais supprimer l'étape." },
      { q: "Peut-on réellement resserrer les pores dilatés ?", a: "Les pores ne se referment pas physiquement, mais des actifs comme la niacinamide et l'acide salicylique réduisent leur apparence en régulant le sébum et en désincrustant les impuretés qui les dilatent visuellement." },
      { q: "Quelle fréquence pour l'exfoliation sur peau grasse noire ?", a: "Une à deux fois par semaine maximum avec un gommage doux : un excès d'exfoliation fragilise la barrière cutanée et peut provoquer des marques d'hyperpigmentation sur peau noire." },
      { q: "Le savon noir africain est-il adapté à la peau grasse ?", a: "Oui, à condition qu'il soit correctement formulé et non frelaté : il nettoie en profondeur sans décaper si sa composition reste douce, contrairement aux savons trop alcalins vendus sans traçabilité." },
    ],
  },
  {
    id: "20",
    slug: "vergetures-peau-noire-solutions",
    title: "Vergetures sur peau noire : pourquoi elles apparaissent et comment les atténuer",
    excerpt: "Les vergetures apparaissent quand la peau s'étire plus vite qu'elle ne peut produire de collagène ; sur peau noire, elles restent souvent plus visibles et prennent une teinte plus foncée que la peau environnante.",
    content: "Grossesse, croissance, prise de poids : les vergetures touchent la grande majorité des femmes. Voici pourquoi elles marquent différemment la peau noire et comment les prendre en charge efficacement.",
    image: pick(2),
    illustrationKey: "vergetures",
    date: "20 Mai 2026",
    dateISO: "2026-05-20",
    category: "Conseils",
    readTime: "6 min",
    sections: [
      {
        heading: "Pourquoi la peau noire marque-t-elle différemment ?",
        body: "Comme pour toute cicatrice, la zone lésée par une vergeture entraîne une hyperpigmentation post-inflammatoire sur peau noire : la peau produit temporairement plus de mélanine autour de la lésion, ce qui accentue le contraste avec la peau environnante et rend les vergetures plus visibles.",
      },
      {
        heading: "Les causes principales des vergetures",
        body: "La grossesse, les poussées de croissance à l'adolescence, une prise ou une perte de poids rapide, ainsi que la musculation intensive figurent parmi les causes les plus fréquentes. Dans tous les cas, la peau s'étire plus vite que le derme ne peut produire de collagène pour l'accompagner.",
      },
      {
        heading: "Peut-on vraiment faire disparaître une vergeture ?",
        body: "Une vergeture mature, devenue blanche et atrophique, ne s'efface jamais totalement. En revanche, les vergetures récentes, encore rouges ou violettes, peuvent être nettement atténuées si elles sont prises en charge tôt avec des actifs stimulant le collagène comme le centella asiatica, l'huile de rose musquée ou la vitamine E.",
      },
      {
        heading: "Routine de prévention et de soin",
        body: "Appliquer une huile nourrissante riche dès le début d'une grossesse ou d'une poussée de croissance, masser quotidiennement en mouvements circulaires pour stimuler la microcirculation, et maintenir une hydratation intense type lait 72 Heures sont les meilleurs réflexes pour limiter leur apparition.",
      },
    ],
    faq: [
      { q: "Les vergetures partent-elles complètement ?", a: "Non, une vergeture mature (blanche, atrophique) ne disparaît jamais totalement, mais les vergetures récentes (rouges à violettes) peuvent être fortement atténuées si elles sont traitées tôt avec des soins nourrissants et raffermissants réguliers." },
      { q: "Quelle huile utiliser pour prévenir les vergetures pendant la grossesse ?", a: "Une huile riche en acides gras essentiels comme le beurre de karité pur ou une huile de baobab, appliquée matin et soir dès le premier trimestre en massages circulaires sur le ventre, la poitrine et les cuisses." },
      { q: "Pourquoi mes vergetures sont-elles plus foncées que ma peau ?", a: "Sur peau noire, la cicatrisation s'accompagne souvent d'une hyperpigmentation post-inflammatoire : la zone lésée produit temporairement plus de mélanine, ce qui accentue le contraste avec la peau environnante." },
      { q: "Le massage est-il vraiment utile contre les vergetures ?", a: "Oui : masser stimule la microcirculation et aide les actifs à pénétrer plus profondément, ce qui favorise la production de collagène et réduit la tension cutanée responsable de la formation des vergetures." },
    ],
  },
  {
    id: "21",
    slug: "eclaircir-peau-naturellement-sans-danger",
    title: "Éclaircir la peau naturellement : la méthode sans danger pour unifier son teint",
    excerpt: "Pour unifier son teint sans risque, misez sur des actifs progressifs comme la vitamine C, l'acide kojique et la niacinamide plutôt que sur l'hydroquinone à forte dose ou la cortisone, dangereuses sur le long terme.",
    content: "Unifier son teint est une demande légitime, mais certains produits vendus sans contrôle mettent la santé de la peau en danger. Voici la méthode progressive et sûre pour y parvenir.",
    image: pick(0),
    illustrationKey: "eclaircissement-naturel",
    date: "5 Mai 2026",
    dateISO: "2026-05-05",
    category: "Conseils",
    readTime: "7 min",
    sections: [
      {
        heading: "Pourquoi tant de peaux noires cherchent-elles à unifier leur teint ?",
        body: "La demande derrière l'éclaircissement n'est le plus souvent pas de changer de carnation, mais d'unifier un teint marqué par l'hyperpigmentation, les taches post-acné ou le mélasma. C'est une préoccupation esthétique légitime, à condition d'y répondre avec des actifs qui respectent la santé de la peau.",
      },
      {
        heading: "Les produits dangereux à bannir absolument",
        body: "L'hydroquinone à forte concentration sans encadrement médical, les dermocorticoïdes détournés de leur usage et les crèmes contenant du mercure figurent parmi les substances les plus risquées : elles peuvent provoquer une ochronose exogène (taches bleu-noir irréversibles), un amincissement durable de la peau, voire une toxicité systémique. Ces produits sont interdits à la vente libre pour de bonnes raisons.",
      },
      {
        heading: "Les actifs naturels et sûrs qui fonctionnent réellement",
        body: "La vitamine C, l'acide kojique, la niacinamide et l'arbutine agissent progressivement sur la surproduction de mélanine sans agresser la barrière cutanée. Associés au beurre de karité et à l'huile de baobab pour nourrir et protéger, ce sont les actifs qui composent nos gammes Bio Activ et Sublim Éclat.",
      },
      {
        heading: "Une routine progressive en 3 étapes",
        body: "Un nettoyage doux matin et soir pour ne pas fragiliser la peau, un sérum ciblé le soir avec les actifs éclaircissants, et une protection solaire SPF 30 minimum le jour, indispensable pour éviter que les zones traitées ne repigmentent plus foncées qu'avant.",
      },
    ],
    faq: [
      { q: "Combien de temps faut-il pour voir des résultats sur un teint unifié ?", a: "Comptez 4 à 8 semaines d'utilisation régulière avant de voir les premiers résultats visibles, et jusqu'à 3 mois pour une action en profondeur sur les taches. Les résultats durables demandent de la patience, contrairement aux produits agressifs qui promettent un effet immédiat au prix de la santé de la peau." },
      { q: "L'hydroquinone est-elle dangereuse ?", a: "À forte concentration et en usage prolongé sans avis médical, oui : elle peut provoquer une ochronose exogène (taches bleu-noir irréversibles) et fragiliser durablement la peau. STEFCOS n'utilise pas d'hydroquinone à dose non contrôlée dans ses formules." },
      { q: "Peut-on éclaircir la peau sans l'abîmer ?", a: "Oui, à condition d'utiliser des actifs doux comme la vitamine C, l'acide kojique ou la niacinamide, associés à une hydratation et une protection solaire quotidienne. C'est l'approche adoptée par les gammes Bio Activ et Sublim Éclat de STEFCOS." },
      { q: "Faut-il une protection solaire pendant un traitement éclaircissant ?", a: "Absolument indispensable : les actifs éclaircissants rendent la peau plus sensible au soleil, et sans SPF, les taches peuvent réapparaître plus foncées qu'avant le traitement." },
    ],
  },
  {
    id: "1",
    slug: "routine-peau-eclatante",
    title: "Les 5 gestes essentiels pour une peau éclatante au quotidien",
    excerpt: "Découvrez notre routine beauté complète pour sublimer votre teint naturellement et révéler l'éclat de votre peau.",
    content: "Une peau éclatante commence par une routine bien pensée. Nettoyage doux, exfoliation hebdomadaire, hydratation profonde, protection solaire et soin ciblé de nuit : voici les 5 piliers d'un teint lumineux. Chez STEFCOS, nous avons formulé chaque produit pour répondre aux besoins spécifiques des peaux noires et mixtes, en combinant des actifs naturels puissants avec une science dermatologique avancée.",
    image: pick(0),
    illustrationKey: "routine-matin",
    date: "12 Avril 2026",
    dateISO: "2026-04-12",
    category: "Routine Beauté",
    readTime: "5 min",
  },
  {
    id: "2",
    slug: "soins-peaux-noires",
    title: "Pourquoi choisir des soins spécifiquement adaptés aux peaux noires ?",
    excerpt: "Les peaux noires et mixtes ont des besoins uniques qui méritent une attention particulière et des formules dédiées.",
    content: "Les peaux noires produisent plus de mélanine et de sébum, ce qui les rend sujettes à l'hyperpigmentation et aux imperfections. Des soins adaptés permettent de traiter ces problématiques sans agresser la peau. STEFCOS utilise des ingrédients comme le beurre de karité, l'huile de baobab et la vitamine C pour unifier le teint tout en respectant la barrière cutanée.",
    image: pick(1),
    illustrationKey: "melanine",
    date: "5 Avril 2026",
    dateISO: "2026-04-05",
    category: "Conseils",
    readTime: "4 min",
  },
  {
    id: "3",
    slug: "gamme-bio-activ",
    title: "Notre nouvelle gamme Bio Activ : l'innovation cosmétique au naturel",
    excerpt: "STEFCOS lance sa gamme la plus innovante, alliant science dermatologique et richesse des ingrédients naturels africains.",
    content: "La gamme Bio Activ représente l'aboutissement de deux années de recherche. Enrichie en extraits de plantes africaines et en acides de fruits naturels, elle offre une action éclaircissante progressive et sans danger. Chaque produit a été testé dermatologiquement pour garantir efficacité et tolérance optimale.",
    image: pick(2),
    illustrationKey: "nouveaute",
    date: "28 Mars 2026",
    dateISO: "2026-03-28",
    category: "Nouveautés",
    readTime: "6 min",
  },
  {
    id: "4",
    slug: "hyperpigmentation-solutions",
    title: "Hyperpigmentation : comprendre et traiter les taches brunes efficacement",
    excerpt: "Guide complet pour comprendre les causes de l'hyperpigmentation et découvrir les solutions adaptées aux peaux foncées.",
    content: "L'hyperpigmentation est l'une des préoccupations les plus courantes des peaux noires. Causée par une surproduction de mélanine, elle peut être déclenchée par le soleil, l'acné ou les blessures. Les actifs comme l'acide kojique, la niacinamide et l'arbutine sont vos meilleurs alliés. Notre gamme Sublim Éclat a été spécialement conçue pour cibler ces taches tout en respectant votre peau.",
    image: pick(0),
    illustrationKey: "hyperpigmentation",
    date: "20 Mars 2026",
    dateISO: "2026-03-20",
    category: "Conseils",
    readTime: "7 min",
  },
  {
    id: "5",
    slug: "ingredients-naturels-africains",
    title: "Les trésors cosmétiques de l'Afrique : 7 ingrédients naturels incontournables",
    excerpt: "Du beurre de karité à l'huile de baobab, découvrez les ingrédients africains qui révolutionnent la cosmétique.",
    content: "L'Afrique regorge d'ingrédients aux propriétés cosmétiques exceptionnelles. Le beurre de karité hydrate en profondeur, l'huile de moringa protège contre les radicaux libres, le neem purifie la peau. Chez STEFCOS, nous sourçons ces trésors localement au Togo pour créer des formules authentiques et performantes.",
    image: pick(1),
    illustrationKey: "ingredients",
    date: "12 Mars 2026",
    dateISO: "2026-03-12",
    category: "Ingrédients",
    readTime: "5 min",
  },
  {
    id: "6",
    slug: "protection-solaire-peaux-foncees",
    title: "Protection solaire : pourquoi les peaux foncées en ont aussi besoin",
    excerpt: "Contrairement aux idées reçues, les peaux noires nécessitent aussi une protection solaire adaptée au quotidien.",
    content: "Bien que la mélanine offre une protection naturelle, elle ne suffit pas à prévenir les dommages UV. Les peaux noires sont exposées au vieillissement prématuré et à l'hyperpigmentation liée au soleil. Optez pour un SPF 30 minimum avec une formule non blanchissante. STEFCOS développe actuellement une gamme solaire spécialement formulée pour les teints foncés.",
    image: pick(2),
    illustrationKey: "solaire",
    date: "3 Mars 2026",
    dateISO: "2026-03-03",
    category: "Conseils",
    readTime: "4 min",
  },
  {
    id: "7",
    slug: "routine-soir-reparatrice",
    title: "Routine du soir : les étapes clés pour une peau régénérée au réveil",
    excerpt: "La nuit est le moment idéal pour la régénération cellulaire. Optimisez votre routine nocturne pour un teint frais.",
    content: "Pendant le sommeil, la peau se régénère jusqu'à trois fois plus vite. Profitez de ce moment pour appliquer des soins concentrés : sérum réparateur, crème de nuit nourrissante et huile visage. Notre lait 72 Heures offre une hydratation continue qui travaille pendant votre sommeil pour un teint reposé au matin.",
    image: pick(0),
    illustrationKey: "nuit",
    date: "22 Février 2026",
    dateISO: "2026-02-22",
    category: "Routine Beauté",
    readTime: "5 min",
  },
  {
    id: "8",
    slug: "savons-naturels-bienfaits",
    title: "Savons naturels : pourquoi abandonner les savons industriels pour votre peau",
    excerpt: "Les savons naturels offrent une alternative douce et efficace pour nettoyer la peau sans l'agresser.",
    content: "Les savons industriels contiennent souvent des tensioactifs agressifs qui perturbent le pH de la peau. Les savons naturels STEFCOS, enrichis en glycérine végétale et en huiles essentielles, nettoient en douceur tout en préservant le film hydrolipidique. Découvrez notre savon clarifiant qui unifie le teint dès les premières utilisations.",
    image: pick(1),
    illustrationKey: "savon",
    date: "14 Février 2026",
    dateISO: "2026-02-14",
    category: "Produits",
    readTime: "4 min",
  },
  {
    id: "9",
    slug: "hydratation-peaux-seches",
    title: "Peau sèche et déshydratée : le guide ultime pour retrouver confort et souplesse",
    excerpt: "Tiraillements, rugosités, inconfort… Apprenez à hydrater correctement votre peau sèche avec les bons gestes.",
    content: "La peau sèche manque de lipides tandis que la peau déshydratée manque d'eau. Les deux nécessitent des approches différentes. Notre gamme Very White associe des agents hydratants comme l'acide hyaluronique à des huiles nourrissantes pour restaurer la barrière cutanée et offrir un confort durable toute la journée.",
    image: pick(2),
    illustrationKey: "hydratation",
    date: "5 Février 2026",
    dateISO: "2026-02-05",
    category: "Conseils",
    readTime: "6 min",
  },
  {
    id: "10",
    slug: "cosmetique-togolaise-monde",
    title: "La cosmétique togolaise à la conquête du monde : le cas STEFCOS",
    excerpt: "Comment STEFCOS s'impose comme une référence de la beauté africaine depuis Lomé, capitale du Togo.",
    content: "Fondée à Lomé, STEFCOS a su allier savoir-faire traditionnel et innovation pour créer des produits qui rivalisent avec les grandes marques internationales. En misant sur des ingrédients locaux de qualité et une production rigoureuse, l'entreprise exporte désormais sa vision de la beauté africaine au-delà des frontières du Togo.",
    image: pick(0),
    illustrationKey: "togo",
    date: "27 Janvier 2026",
    dateISO: "2026-01-27",
    category: "Marque",
    readTime: "5 min",
  },
  {
    id: "11",
    slug: "acne-peaux-noires",
    title: "Acné et peaux noires : les erreurs à éviter et les solutions qui fonctionnent",
    excerpt: "L'acné sur peau noire laisse souvent des marques durables. Découvrez comment la traiter sans aggraver la situation.",
    content: "Sur les peaux noires, l'acné s'accompagne fréquemment de taches post-inflammatoires. Évitez les produits trop décapants qui stimulent la production de sébum. Privilégiez des actifs comme l'acide salicylique et le zinc. Notre gamme Sido Clair est formulée pour assainir la peau tout en prévenant les marques résiduelles.",
    image: pick(1),
    illustrationKey: "acne",
    date: "18 Janvier 2026",
    dateISO: "2026-01-18",
    category: "Conseils",
    readTime: "6 min",
  },
  {
    id: "12",
    slug: "tendances-beaute-2026",
    title: "Tendances beauté 2026 : ce qui va révolutionner votre routine cette année",
    excerpt: "Skinimalisme, beauté inclusive et actifs biotechnologiques : les tendances qui redéfinissent la beauté en 2026.",
    content: "2026 s'annonce comme l'année de la beauté consciente. Le skinimalisme — moins de produits mais mieux choisis — gagne du terrain. La beauté inclusive pousse les marques à élargir leurs gammes. Les actifs issus de la biotechnologie verte offrent des performances inédites. STEFCOS s'inscrit pleinement dans ces tendances avec des formules épurées et efficaces.",
    image: pick(2),
    illustrationKey: "tendances",
    date: "12 Janvier 2026",
    dateISO: "2026-01-12",
    category: "Tendances",
    readTime: "5 min",
  },
  {
    id: "13",
    slug: "beurre-karite-bienfaits",
    title: "Le beurre de karité du Togo : l'or jaune de la cosmétique africaine",
    excerpt: "Utilisé depuis des siècles, le beurre de karité togolais est reconnu mondialement pour ses vertus exceptionnelles.",
    content: "Le Togo est l'un des principaux producteurs de beurre de karité de qualité au monde. Riche en vitamines A, D, E et F, il nourrit, protège et répare la peau en profondeur. STEFCOS utilise du beurre de karité non raffiné, sourcé directement auprès de coopératives de femmes togolaises, pour garantir une qualité optimale et un impact social positif.",
    image: pick(0),
    illustrationKey: "karite",
    date: "8 Janvier 2026",
    dateISO: "2026-01-08",
    category: "Ingrédients",
    readTime: "5 min",
  },
  {
    id: "14",
    slug: "routine-homme-peau-noire",
    title: "Soins pour hommes : la routine minimale mais efficace pour la peau noire",
    excerpt: "Messieurs, votre peau aussi mérite de l'attention. Découvrez une routine simple en 3 étapes pour un teint impeccable.",
    content: "La peau masculine est plus épaisse et produit davantage de sébum. Ajoutez à cela le rasage régulier et vous obtenez une peau qui nécessite des soins ciblés. Trois gestes suffisent : nettoyer avec un savon doux, hydrater avec un soin léger non gras et protéger avec un SPF. Les produits STEFCOS conviennent aussi bien aux hommes qu'aux femmes.",
    image: pick(1),
    illustrationKey: "homme",
    date: "5 Janvier 2026",
    dateISO: "2026-01-05",
    category: "Routine Beauté",
    readTime: "4 min",
  },
  {
    id: "15",
    slug: "choisir-lait-corporel",
    title: "Comment bien choisir son lait corporel selon son type de peau",
    excerpt: "Peau sèche, grasse ou mixte ? Le choix du bon lait corporel est essentiel pour une hydratation adaptée et durable.",
    content: "Un lait corporel trop riche sur une peau grasse provoquera des imperfections, tandis qu'un lait trop léger ne suffira pas à nourrir une peau sèche. Identifiez d'abord votre type de peau, puis choisissez une texture adaptée. Notre gamme propose des formules variées — du lait fluide Glycéderm au lait riche 72 Heures — pour répondre à chaque besoin spécifique.",
    image: pick(2),
    illustrationKey: "lait-corporel",
    date: "3 Janvier 2026",
    dateISO: "2026-01-03",
    category: "Conseils",
    readTime: "5 min",
  },
];
