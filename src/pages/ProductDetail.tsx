import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 lg:px-12 py-32 text-center">
          <h1 className="font-serif text-3xl mb-4">Produit introuvable</h1>
          <Link to="/boutique" className="font-sans text-sm text-accent underline">
            Retour à la boutique
          </Link>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 lg:px-12 pt-8">
        <nav className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/boutique" className="hover:text-foreground transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="container mx-auto px-6 lg:px-12 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square bg-secondary rounded-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              width={800}
              height={800}
            />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-accent text-accent-foreground font-sans text-[10px] font-semibold tracking-widest uppercase px-4 py-2">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">{product.name}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-6">{product.subtitle}</p>

            <p className="font-serif text-3xl font-medium text-foreground mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="border-t border-border pt-6 mb-6">
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-sans text-sm font-medium border-x border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => {
                  addItem(product, quantity);
                  setQuantity(1);
                }}
                className="flex-1 flex items-center justify-center gap-3 bg-accent text-accent-foreground font-sans text-xs font-semibold tracking-widest uppercase h-12 px-6 hover:bg-accent/90 transition-colors"
              >
                <ShoppingBag size={16} />
                Ajouter au panier
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Livraison rapide" },
                { icon: Shield, label: "Paiement sécurisé" },
                { icon: RotateCcw, label: "Retour facile" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-1.5 py-3 border border-border rounded-sm">
                  <item.icon size={16} className="text-accent" />
                  <span className="font-sans text-[10px] tracking-wider uppercase text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border">
          <div className="text-center mb-12">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Vous aimerez aussi
            </p>
            <h2 className="font-serif text-3xl font-light">Produits Similaires</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
