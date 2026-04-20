import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Truck, Shield, RotateCcw, CreditCard, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import type { ProductVariant } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { buildWhatsAppProductUrl, buildWhatsAppConseilUrl, formatPrice } from "@/lib/whatsapp";
import OrderModal from "@/components/OrderModal";
import { usePageSeo } from "@/hooks/usePageSeo";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  usePageSeo(
    product ? `${product.name} — ${product.subtitle} | STEFCOS` : "Produit | STEFCOS",
    product?.description
  );
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const images = product?.gallery?.length ? product.gallery : product ? [product.image] : [];
  const [selectedImage, setSelectedImage] = useState(0);

  const hasVariants = (product?.variants?.length ?? 0) > 1;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const currentPrice = selectedVariant?.price ?? product?.price ?? 0;

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
  const crossSellProducts = product.crossSell
    ? products.filter((p) => product.crossSell!.includes(p.id))
    : [];

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
          {/* Image + Galerie */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square bg-secondary rounded-sm overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
                width={800}
                height={800}
              />
              {product.badge && (
                <span className="absolute top-6 left-6 bg-accent text-accent-foreground font-sans text-[10px] font-semibold tracking-widest uppercase px-4 py-2">
                  {product.badge}
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 flex-shrink-0 bg-secondary rounded-sm overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? "border-accent" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-2">{product.name}</h1>
            <p className="font-sans text-sm text-muted-foreground mb-4">{product.subtitle}</p>

            {/* Sélecteur de taille */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-4">
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                  {hasVariants ? "Choisir le format" : "Format"}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v) => (
                    <button
                      key={v.size}
                      onClick={() => setSelectedVariant(v)}
                      className={`font-sans text-xs font-semibold px-4 py-2 border rounded-sm transition-colors ${
                        selectedVariant?.size === v.size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      {v.size} — {formatPrice(v.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="font-serif text-3xl font-medium text-foreground mb-6">
              {formatPrice(currentPrice)}
            </p>

            <div className="border-t border-border pt-6 mb-6">
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-4">
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
                  addItem(product, quantity, selectedVariant);
                  setQuantity(1);
                }}
                className="flex-1 flex items-center justify-center gap-3 bg-accent text-accent-foreground font-sans text-xs font-semibold tracking-widest uppercase h-12 px-6 hover:bg-accent/90 transition-colors"
              >
                <ShoppingBag size={16} />
                Ajouter au panier
              </button>
            </div>

            {/* WhatsApp Direct Order */}
            <button
              onClick={() => setShowOrderModal(true)}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase h-12 px-6 hover:bg-[#1da851] transition-colors mb-4"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Commander sur WhatsApp
            </button>
            {showOrderModal && (
              <OrderModal
                items={[{ product, quantity }]}
                totalPrice={currentPrice * quantity}
                onClose={() => setShowOrderModal(false)}
                buildUrl={(prenom, zone, paiement, telephone) =>
                  buildWhatsAppProductUrl(product, quantity, prenom, zone, paiement, telephone, selectedVariant?.size)
                }
              />
            )}

            {/* Conseil */}
            <a
              href={buildWhatsAppConseilUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 font-sans text-xs text-muted-foreground hover:text-accent transition-colors mb-6"
            >
              <MessageCircle size={14} />
              Besoin de conseils ? Demandez à un expert
            </a>

            {/* Trust */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Truck, label: "Livraison rapide" },
                { icon: Shield, label: "Paiement sécurisé" },
                { icon: RotateCcw, label: "Retour facile" },
                { icon: CreditCard, label: "Paiement à la livraison" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-1.5 py-3 border border-border rounded-sm">
                  <item.icon size={16} className="text-accent" />
                  <span className="font-sans text-[10px] tracking-wider uppercase text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-sans text-[10px] text-muted-foreground text-center mt-4">
              Mobile Money (Flooz, T-Money) · Espèces à la livraison
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      {crossSellProducts.length > 0 && (
        <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border">
          <div className="text-center mb-10">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Complétez votre routine
            </p>
            <h2 className="font-serif text-3xl font-light">À Associer Avec</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {crossSellProducts.map((p) => (
              <div key={p.id} className="border border-border rounded-sm p-4 flex flex-col items-center gap-3 text-center hover:border-accent transition-colors group">
                <Link to={`/boutique/${p.id}`} className="w-full">
                  <div className="aspect-square overflow-hidden rounded-sm bg-secondary mb-2">
                    <img
                      src={p.cardImage || p.image}
                      alt={p.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-serif text-sm font-medium">{p.name}</p>
                  <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">{p.subtitle}</p>
                  <p className="font-sans text-sm font-semibold mt-1">
                    {p.variants ? `Dès ${formatPrice(p.price)}` : formatPrice(p.price)}
                  </p>
                </Link>
                <button
                  onClick={() => addItem(p, 1, p.variants?.[0])}
                  className="w-full font-sans text-[10px] font-semibold tracking-widest uppercase border border-accent text-accent py-2 hover:bg-accent hover:text-accent-foreground transition-colors rounded-sm"
                >
                  + Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

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
