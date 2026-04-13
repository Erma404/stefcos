import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

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
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <Link
                    to={`/boutique/${product.id}`}
                    onClick={() => setIsOpen(false)}
                    className="w-20 h-20 flex-shrink-0 bg-secondary rounded-sm overflow-hidden"
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium truncate">{product.name}</h4>
                    <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">
                      {product.subtitle}
                    </p>
                    <p className="font-sans text-sm font-semibold mt-1">{formatPrice(product.price)}</p>
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
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-muted-foreground">Sous-total</span>
              <span className="font-serif text-xl font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <button className="w-full bg-accent text-accent-foreground font-sans text-xs font-semibold tracking-widest uppercase py-4 hover:bg-accent/90 transition-colors">
              Commander
            </button>
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
