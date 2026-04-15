import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { label: "Boutique", path: "/boutique" },
  { label: "Philosophie", path: "/philosophie" },
  { label: "Journal", path: "/journal" },
  { label: "Contact", path: "/contact" },
];

const promoImages = [
  "/products/sublim-eclat/3.png",
  "/products/lait-72h/3.png",
  "/products/sido-clair/1.png",
  "/products/bio-activ/4.png",
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen: openCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Barre promo */}
      <div className="bg-foreground text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center gap-3 h-9">
            <div className="flex items-center gap-1.5">
              {promoImages.slice(0, 3).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-primary-foreground/30"
                />
              ))}
            </div>
            <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-primary-foreground/90 text-center">
              −5% dès 2 exemplaires · −10% dès 3 exemplaires identiques
            </p>
            <Link
              to="/boutique"
              className="hidden sm:block font-sans text-[10px] font-bold tracking-widest uppercase text-accent border-b border-accent/60 pb-px hover:border-accent transition-colors whitespace-nowrap"
            >
              En profiter →
            </Link>
          </div>
        </div>
      </div>

      {/* Nav principale */}
      <div className="bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-foreground">
              STEFCOS
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-sans font-medium tracking-widest uppercase transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => openCart(true)}
                className="relative p-2 text-foreground hover:text-accent transition-colors"
                aria-label="Panier"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-sans font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="flex flex-col py-6 px-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-sans font-medium tracking-widest uppercase py-2 transition-colors ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
