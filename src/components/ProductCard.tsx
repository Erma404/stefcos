import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  return (
    <Link to={`/boutique/${product.id}`} className="group block">
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
  );
};

export default ProductCard;
