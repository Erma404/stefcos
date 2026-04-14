import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const INACTIVITY_DELAY = 45_000; // 45 seconds

const ExitIntentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { addItem } = useCart();

  const show = useCallback(() => {
    if (dismissed) return;
    setIsOpen(true);
  }, [dismissed]);

  // Exit intent (mouse leaves viewport top)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5) show();
    };
    document.addEventListener("mouseout", handler);
    return () => document.removeEventListener("mouseout", handler);
  }, [show]);

  // Inactivity timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(show, INACTIVITY_DELAY);
    };
    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [show]);

  const close = () => {
    setIsOpen(false);
    setDismissed(true);
  };

  const recommended = products.slice(0, 3);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-foreground/40 z-50 animate-fade-in" onClick={close} />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header image */}
        <div className="relative h-48 overflow-hidden bg-secondary">
          <img
            src={recommended[0].image}
            alt="STEFCOS"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-foreground/60" />
          <button
            onClick={close}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-background/80 hover:bg-background rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary-foreground/70 mb-1">
              Avant de partir...
            </p>
            <h3 className="font-serif text-2xl text-primary-foreground leading-tight">
              Ne manquez pas nos <span className="italic">pépites</span>
            </h3>
          </div>
        </div>

        {/* Promo */}
        <div className="px-6 py-5 border-b border-border text-center">
          <p className="font-sans text-sm text-foreground">
            Profitez de <span className="text-accent font-bold">10%</span> sur votre première commande
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Mentionnez le code <span className="font-semibold text-foreground underline underline-offset-2">BIENVENUE10</span> sur WhatsApp
          </p>
        </div>

        {/* Recommended products */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Recommandés pour vous
          </p>
          <div className="space-y-4">
            {recommended.map((product) => (
              <div key={product.id} className="flex gap-4 group">
                <Link to={`/boutique/${product.id}`} onClick={close} className="w-20 h-20 flex-shrink-0 bg-secondary overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </Link>
                <div className="flex-1 flex flex-col justify-center">
                  <Link to={`/boutique/${product.id}`} onClick={close}>
                    <h4 className="font-sans text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {product.name}
                    </h4>
                  </Link>
                  <p className="font-sans text-sm text-accent font-semibold mt-0.5">
                    {product.price.toLocaleString()} FCFA
                  </p>
                  <button
                    onClick={() => addItem(product)}
                    className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors mt-1 text-left"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 py-5 border-t border-border">
          <Link
            to="/boutique"
            onClick={close}
            className="group flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase px-6 py-4 hover:bg-primary/90 transition-all duration-300"
          >
            Continuer mes achats
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ExitIntentSidebar;
