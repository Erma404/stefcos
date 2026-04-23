import { useState } from "react";
import { X, MapPin, User, CreditCard, Phone } from "lucide-react";
import { formatPrice } from "@/lib/whatsapp";
import type { Product } from "@/data/products";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ZONES = [
  "Lomé Centre", "Agoè", "Bè", "Adidogomé", "Tokoin",
  "Baguida", "Légos Beach", "Hédzranawoe", "Kégué", "Autre zone",
];

type OrderItem = { product: Product; quantity: number };

interface OrderModalProps {
  items: OrderItem[];
  totalPrice: number;
  onClose: () => void;
  buildUrl: (prenom: string, zone: string, paiement: string, telephone: string) => string;
}

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbyTWQ8YPX4Hh93yO7WfVtdAzPLOo5JudfnGh-5ijVv2ZsOYTuTJvTSFPD7WIn8fd4II2A/exec";

const OrderModal = ({ items, totalPrice, onClose, buildUrl }: OrderModalProps) => {
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [zone, setZone] = useState("");
  const [paiement, setPaiement] = useState<"avant" | "livraison">("livraison");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!prenom.trim()) { setError("Veuillez entrer votre prénom."); return; }
    if (!telephone.trim()) { setError("Veuillez entrer votre numéro WhatsApp."); return; }
    if (!zone.trim()) { setError("Veuillez indiquer votre quartier."); return; }

    const paiementLabel = paiement === "avant" ? "Avant livraison (TMoney)" : "À la livraison";

    // Envoi vers Google Sheets CRM
    fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type:      "order",
        prenom:    prenom.trim(),
        telephone: telephone.trim(),
        quartier:  zone.trim(),
        paiement:  paiementLabel,
        produits:  items.map(({ product, quantity }) => `${product.name} ×${quantity}`).join(", "),
        total:     `${totalPrice} FCFA`,
        statut:    "Nouvelle commande",
      }),
    }).catch(() => {});

    const url = buildUrl(prenom.trim(), zone.trim(), paiementLabel, telephone.trim());
    window.open(url, "_blank");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-[60]" onClick={onClose} />
      <div className="fixed inset-0 z-[61] flex items-center justify-center px-4">
        <div className="bg-background w-full max-w-md rounded-sm shadow-2xl animate-fade-up">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <h2 className="font-serif text-xl font-medium">Finaliser ma commande</h2>
            <button onClick={onClose} className="p-1 hover:text-accent transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Récap commande */}
          <div className="px-6 py-4 bg-secondary/40 border-b border-border">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center py-1">
                <span className="font-sans text-sm text-foreground">
                  {product.name} <span className="text-muted-foreground">x{quantity}</span>
                </span>
                <span className="font-sans text-sm font-semibold">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 mt-1 border-t border-border">
              <span className="font-sans text-sm font-semibold">Total</span>
              <span className="font-serif text-lg font-semibold">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="px-6 py-5 space-y-4">
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Complétez ces informations pour que notre équipe prépare votre livraison rapidement.
            </p>

            {/* Prénom */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                <User size={13} /> Votre prénom
              </label>
              <input
                type="text"
                placeholder="ex : Akosua"
                value={prenom}
                onChange={(e) => { setPrenom(e.target.value); setError(""); }}
                className="w-full border border-border rounded-sm px-4 py-3 font-sans text-sm bg-background focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Téléphone */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                <Phone size={13} /> Votre numéro WhatsApp
              </label>
              <input
                type="tel"
                placeholder="ex : +228 90 00 00 00"
                value={telephone}
                onChange={(e) => { setTelephone(e.target.value); setError(""); }}
                className="w-full border border-border rounded-sm px-4 py-3 font-sans text-sm bg-background focus:outline-none focus:border-accent transition-colors"
              />
              <p className="font-sans text-[10px] text-muted-foreground">Nous vous contactons uniquement pour votre commande et suivi.</p>
            </div>

            {/* Zone */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                <MapPin size={13} /> Votre quartier / zone
              </label>
              <select
                value={zone}
                onChange={(e) => { setZone(e.target.value); setError(""); }}
                className="w-full border border-border rounded-sm px-4 py-3 font-sans text-sm bg-background focus:outline-none focus:border-accent transition-colors appearance-none"
              >
                <option value="">Sélectionnez votre quartier</option>
                {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>

            {/* Mode paiement */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                <CreditCard size={13} /> Mode de paiement
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaiement("livraison")}
                  className={`py-3 px-4 rounded-sm border font-sans text-xs font-semibold text-center transition-all ${
                    paiement === "livraison"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  💵 À la livraison
                  <span className="block font-normal text-[10px] mt-0.5 opacity-70">Espèces ou TMoney</span>
                </button>
                <button
                  onClick={() => setPaiement("avant")}
                  className={`py-3 px-4 rounded-sm border font-sans text-xs font-semibold text-center transition-all ${
                    paiement === "avant"
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  📱 Avant livraison
                  <span className="block font-normal text-[10px] mt-0.5 opacity-70">Via TMoney / Flooz</span>
                </button>
              </div>
            </div>

            {error && (
              <p className="font-sans text-xs text-destructive">{error}</p>
            )}
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-sans text-xs font-semibold tracking-widest uppercase py-4 hover:bg-[#1da851] transition-colors rounded-sm"
            >
              <WhatsAppIcon />
              Envoyer ma commande
            </button>
            <p className="font-sans text-[10px] text-muted-foreground text-center mt-3">
              Votre commande sera envoyée via WhatsApp — notre équipe confirme sous 5 min.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default OrderModal;
