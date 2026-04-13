import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-semibold tracking-wider mb-4">STEFCOS</h3>
            <p className="font-sans text-sm leading-relaxed opacity-80">
              Fabrication et commercialisation de produits cosmétiques de qualité, adaptés aux besoins de la peau noire et mixte.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold tracking-widest uppercase mb-6 opacity-60">Navigation</h4>
            <ul className="space-y-3">
              {["Accueil", "Boutique", "Philosophie", "Journal", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Accueil" ? "/" : `/${item.toLowerCase()}`}
                    className="font-sans text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold tracking-widest uppercase mb-6 opacity-60">Catégories</h4>
            <ul className="space-y-3">
              {["Soins Corps", "Traitements", "Savons", "Nouveautés"].map((item) => (
                <li key={item}>
                  <span className="font-sans text-sm opacity-80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold tracking-widest uppercase mb-6 opacity-60">Contact</h4>
            <div className="space-y-3 font-sans text-sm opacity-80">
              <p>Zone industrielle, Carrefour Ramatou</p>
              <p>Zone Portuaire - 07 BP 7300</p>
              <p>Lomé - Togo</p>
              <p className="pt-2">(+228) 79 79 23 25</p>
              <p>(+228) 90 54 22 75</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs opacity-50">
            © {new Date().getFullYear()} STEFCOS TOGO SARL. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {["Facebook", "Instagram", "WhatsApp"].map((social) => (
              <a key={social} href="#" className="font-sans text-xs opacity-50 hover:opacity-100 transition-opacity">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
