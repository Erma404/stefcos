import { X, Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { useCart, getItemDiscount } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { buildWhatsAppCartUrl, formatPrice } from "@/lib/whatsapp";
import { products } from "@/data/products";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, totalItems, totalPrice, originalPrice, totalDiscount } = useCart();

  const cartProductIds = new Set(items.map((i) => i.product.id));
  const crossSell = products.filter((p) => !cartProductIds.has(p.id)).slice(0, 2);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl animate-slide-in flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} />
            <h2 className="font-serif text-xl font-medium">Panier ({totalItems})</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:text-accent transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Promo reminder */}
        {items.length > 0 && (
          <div className="bg-accent/10 border-b border-accent/20 px-6 py-2.5 flex items-center gap-2">
            <Tag size={13} className="text-accent flex-shrink-0" />
            <p className="font-sans text-[10px] text-foreground leading-snug">
              <span className="font-semibold">−5%</span> dès 2 exemplaires ·{" "}
              <span className="font-semibold">−10%</span> dès 3 exemplaires d'un même produit
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
              <p className="font-serif text-lg text-muted-foreground mb-2">Votre panier est vide</p>
              <p className="font-sans text-xs text-muted-foreground mb-6">
                Découvrez nos produits et ajoutez-les à votre panier
              </p>
              <Link
                to="/boutique"
                onClick={() => setIsOpen(false)}
                className="font-sans text-xs tracking-widest uppercase font-semibold text-accent border-b border-accent pb-1"
              >
                Voir la boutique
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map(({ product, quantity }) => {
                const discountRate = getItemDiscount(quantity);
                const lineOriginal = product.price * quantity;
                const lineDiscounted = lineOriginal * (1 - discountRate);
                const nextThreshold = quantity === 1 ? 2 : quantity === 2 ? 3 : null;
                const nextDiscount = nextThreshold === 2 ? 5 : nextThreshold === 3 ? 10 : null;

                return (
                  <div key={product.id} className="space-y-2">
                    <div className="flex gap-4">
                      <Link
                        to={`/boutique/${product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="w-20 h-20 flex-shrink-0 bg-secondary rounded-sm overflow-hidden"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-medium truncate">{product.name}</h4>
                          {discountRate > 0 && (
                            <span className="flex-shrink-0 bg-accent text-accent-foreground font-sans text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                              -{discountRate * 100}%
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">
                          {product.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="font-sans text-sm font-semibold">{formatPrice(lineDiscounted)}</p>
                          {discountRate > 0 && (
                            <p className="font-sans text-xs text-muted-foreground line-through">{formatPrice(lineOriginal)}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-border rounded-sm hover:bg-secondary transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-sans text-sm font-medium w-5 text-center">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-border rounded-sm hover:bg-secondary transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Nudge vers la prochaine remise */}
                    {nextThreshold && nextDiscount && (
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-full text-left bg-accent/10 border border-accent/30 rounded-sm px-3 py-1.5 font-sans text-[10px] text-accent font-semibold hover:bg-accent/20 transition-colors"
                      >
                        ✦ Ajoutez 1 exemplaire de plus → économisez {nextDiscount}% sur cet article
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Cross-sell */}
              {crossSell.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
                    Vous aimerez aussi
                  </p>
                  <div className="space-y-3">
                    {crossSell.map((product) => (
                      <div key={product.id} className="flex gap-3 items-center">
                        <Link
                          to={`/boutique/${product.id}`}
                          onClick={() => setIsOpen(false)}
                          className="w-14 h-14 flex-shrink-0 bg-secondary rounded-sm overflow-hidden"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm font-medium truncate">{product.name}</p>
                          <p className="font-sans text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                        </div>
                        <button
                          onClick={() => addItem(product)}
                          className="flex-shrink-0 font-sans text-[10px] font-semibold tracking-widest uppercase border border-border px-2.5 py-1.5 rounded-sm hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
                        >
                          + Ajouter
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-3">
            {totalDiscount > 0 && (
              <div className="flex justify-between items-center text-accent">
                <span className="font-sans text-xs font-semibold">Vous économisez</span>
                <span className="font-sans text-sm font-bold">−{formatPrice(totalDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-muted-foreground">
                Total
                {totalDiscount > 0 && (
                  <span className="line-through ml-2 text-xs">{formatPrice(originalPrice)}</span>
                )}
              </span>
              <span className="font-serif text-xl font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <a
              href={buildWhatsAppCartUrl(items, totalPrice)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase py-4 hover:bg-[#1da851] transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Commander via WhatsApp
            </a>
            <p className="font-sans text-[10px] text-muted-foreground text-center">
              💳 Paiement à la livraison • 📱 Mobile Money accepté
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
