import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/whatsapp";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group">
      <Link to={`/boutique/${product.id}`} className="block">
        <div className="hover-lift hover-shine">
          <div className="relative aspect-square overflow-hidden bg-secondary rounded-sm img-zoom">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-accent text-accent-foreground font-sans text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5">
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-4 space-y-1">
            <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
              {product.category}
            </p>
            <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">{product.name}</h3>
            <p className="font-sans text-xs text-muted-foreground">{product.subtitle}</p>
            <p className="font-sans text-sm font-semibold text-foreground pt-1">{formatPrice(product.price)}</p>
          </div>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className={`mt-3 w-full flex items-center justify-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase py-2.5 rounded-sm transition-all duration-300 ${
          added
            ? "bg-foreground text-primary-foreground"
            : "bg-accent text-accent-foreground hover:bg-accent/90"
        }`}
      >
        {added ? (
          <>
            <Check className="w-3.5 h-3.5" />
            Ajouté
          </>
        ) : (
          <>
            <ShoppingBag className="w-3.5 h-3.5" />
            J'achète
          </>
        )}
      </button>
    </div>
  );
};

export default ProductCard;
